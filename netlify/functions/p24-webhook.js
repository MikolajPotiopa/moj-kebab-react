import { createClient } from '@supabase/supabase-js';

// Inicjalizacja Supabase poza handlerem (standard)
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {

    const p24Module = await import('p24');
    const P24Class = p24Module.default?.P24 || p24Module.P24 || p24Module.default || p24Module;

    const p24 = new P24Class(
      process.env.P24_MERCHANT_ID,
      process.env.P24_POS_ID,
      process.env.P24_API_KEY,
      process.env.P24_CRC,
      { sandbox: true }
    );
    // -------------------------------------------

    const params = new URLSearchParams(event.body);
    const payload = Object.fromEntries(params);

    console.log("Otrzymano powiadomienie dla sesji:", payload.sessionId);

    const verified = await p24.verifyTransaction({
      sessionId: payload.sessionId,
      amount: Number(payload.amount),
      currency: payload.currency,
      orderId: Number(payload.orderId),
    });

    if (verified) {
      const dbOrderId = payload.sessionId.split('_')[1];

      console.log("Weryfikacja udana. Aktualizacja zamówienia ID:", dbOrderId);

   
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'opłacone', 
          p24_order_id: payload.orderId 
        })
        .eq('id', dbOrderId);

      if (error) {
        console.error("Błąd aktualizacji bazy:", error.message);
        throw new Error("Błąd bazy danych");
      }

  
      return { 
        statusCode: 200, 
        body: "OK" 
      };
    } else {
      console.error("Weryfikacja P24 nie powiodła się.");
      return { statusCode: 400, body: "Błąd weryfikacji" };
    }

  } catch (err) {
    console.error("Błąd krytyczny webhooka:", err.message);

    return { 
      statusCode: 400, 
      body: "Błąd przetwarzania" 
    };
  }
};