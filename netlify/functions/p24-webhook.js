import { P24 } from 'p24';
import { createClient } from '@supabase/supabase-js';

const p24 = new P24(
  process.env.P24_MERCHANT_ID,
  process.env.P24_POS_ID,
  process.env.P24_API_KEY,
  process.env.P24_CRC,
  { sandbox: true }
);

// Używamy Service Role Key, aby mieć uprawnienia do edycji zamówień w Supabase
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  // 1. Sprawdzenie metody (P24 zawsze wysyła POST)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // 2. Parsowanie danych od Przelewy24 (format x-www-form-urlencoded)
  const params = new URLSearchParams(event.body);
  const payload = Object.fromEntries(params);

  console.log("Webhook odebrany. SessionId:", payload.sessionId);

  try {
    // 3. Weryfikacja transakcji w P24
    // WAŻNE: Musimy przekonwertować amount i orderId na liczby (Number)
    const verified = await p24.verifyTransaction({
      sessionId: payload.sessionId,
      amount: Number(payload.amount),
      currency: payload.currency,
      orderId: Number(payload.orderId),
    });

    if (verified) {
      // 4. Wyciągamy ID zamówienia z sessionId (np. "order_123_timestamp")
      const dbOrderId = payload.sessionId.split('_')[1];

      // 5. Aktualizacja statusu w bazie danych Supabase
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'opłacone', // zmień na nazwę statusu, jaką masz w bazie
          p24_order_id: payload.orderId // opcjonalnie zapisz numer transakcji z P24
        })
        .eq('id', dbOrderId);

      if (error) {
        console.error("Błąd aktualizacji Supabase:", error);
        throw new Error("Błąd bazy danych");
      }

      console.log(`Zamówienie ${dbOrderId} zostało opłacone pomyślnie.`);

      // 6. Przelewy24 wymagają odpowiedzi "OK", aby przestać wysyłać powiadomienia
      return { 
        statusCode: 200, 
        body: "OK" 
      };
    } else {
      console.error("Weryfikacja transakcji nieudana.");
      return { statusCode: 400, body: "Błąd weryfikacji" };
    }

  } catch (err) {
    console.error("Błąd krytyczny Webhooka:", err.message);
    return { 
      statusCode: 400, 
      body: "Błąd przetwarzania powiadomienia" 
    };
  }
};