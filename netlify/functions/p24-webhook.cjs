const { P24 } = require('p24');
const { createClient } = require('@supabase/supabase-js');

const p24 = new P24(
  process.env.P24_MERCHANT_ID,
  process.env.P24_POS_ID,
  process.env.P24_API_KEY,
  process.env.P24_CRC,
  { sandbox: true }
);

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  // P24 wysyła dane w formacie URL-encoded
  const params = new URLSearchParams(event.body);
  const payload = Object.fromEntries(params);

  // Weryfikujemy płatność w P24
  try {
    const verified = await p24.verifyTransaction({
      sessionId: payload.sessionId,
      amount: payload.amount,
      currency: payload.currency,
      orderId: payload.orderId,
    });

    if (verified) {
      // Wyciągamy ID zamówienia z sessionId (format: order_ID_timestamp)
      const dbOrderId = payload.sessionId.split('_')[1];

      // Aktualizujemy Supabase
      await supabase
        .from('orders')
        .update({ status: 'nowe' })
        .eq('id', dbOrderId);

      return { statusCode: 200, body: "OK" };
    }
  } catch (err) {
    return { statusCode: 400, body: "Błąd weryfikacji" };
  }
};