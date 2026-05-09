import { createClient } from '@supabase/supabase-js';

// Inicjalizacja Supabase
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  // P24 wysyła powiadomienia tylko metodą POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 1. DYNAMICZNE ŁADOWANIE BIBLIOTEKI P24 (Ten sam mechanizm co w payment)
    const p24Module = await import('p24');
    
    const findConstructor = (mod) => {
      if (!mod) return null;
      if (typeof mod === 'function') return mod;
      if (typeof mod.default === 'function') return mod.default;
      if (typeof mod.P24 === 'function') return mod.P24;
      if (mod.default && typeof mod.default.P24 === 'function') return mod.default.P24;
      for (const key of Object.keys(mod)) {
        if (typeof mod[key] === 'function') return mod[key];
      }
      if (mod.default) {
        for (const key of Object.keys(mod.default)) {
          if (typeof mod.default[key] === 'function') return mod.default[key];
        }
      }
      return null;
    };

    const P24Class = findConstructor(p24Module);

    if (!P24Class) {
      throw new Error("Nie znaleziono konstruktora P24 w webhooku!");
    }

    const p24 = new P24Class(
      process.env.P24_MERCHANT_ID,
      process.env.P24_POS_ID,
      process.env.P24_API_KEY,
      process.env.P24_CRC,
      { sandbox: true }
    );
    // -------------------------------------------------------------

    // 2. Parsowanie danych od Przelewy24 (format x-www-form-urlencoded)
    const params = new URLSearchParams(event.body);
    const payload = Object.fromEntries(params);

    console.log("Otrzymano powiadomienie dla sesji:", payload.sessionId);

    // 3. Weryfikacja transakcji w P24
    const verified = await p24.verifyTransaction({
      sessionId: payload.sessionId,
      amount: Number(payload.amount),
      currency: payload.currency,
      orderId: Number(payload.orderId),
    });

    if (verified) {
      // Wyciągamy ID zamówienia z sessionId (format: order_ID_timestamp)
      const dbOrderId = payload.sessionId.split('_')[1];

      console.log("Weryfikacja udana. Aktualizacja zamówienia ID:", dbOrderId);

      // 4. Aktualizacja statusu w bazie Supabase
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'opłacone', // Upewnij się, że masz dokładnie taki status w bazie
          p24_order_id: payload.orderId 
        })
        .eq('id', dbOrderId);

      if (error) {
        console.error("Błąd bazy danych:", error.message);
        throw new Error("Błąd aktualizacji Supabase");
      }

      // P24 WYMAGA odpowiedzi "OK"
      return { 
        statusCode: 200, 
        body: "OK" 
      };
    } else {
      console.error("Weryfikacja P24 odrzucona.");
      return { statusCode: 400, body: "Błąd weryfikacji" };
    }

  } catch (err) {
    console.error("Błąd krytyczny webhooka:", err.message);
    return { 
      statusCode: 400, 
      body: "Błąd" 
    };
  }
};