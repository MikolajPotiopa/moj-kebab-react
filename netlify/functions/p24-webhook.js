import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405 };

  try {
    const params = new URLSearchParams(event.body);
    const payload = Object.fromEntries(params);

    const merchantId = Number(process.env.P24_MERCHANT_ID);
    const apiKey = process.env.P24_API_KEY;
    const crc = process.env.P24_CRC;

    // Weryfikacja transakcji w P24 (Czyste API)
    const signSource = JSON.stringify({
      sessionId: payload.sessionId,
      orderId: Number(payload.orderId),
      amount: Number(payload.amount),
      currency: "PLN",
      crc
    });
    const signature = crypto.createHash('sha384').update(signSource).digest('hex');

    const verifyPayload = {
      merchantId, posId: merchantId, sessionId: payload.sessionId,
      amount: Number(payload.amount), currency: "PLN",
      orderId: Number(payload.orderId),
      sign: signature
    };

    const response = await fetch('https://sandbox.przelewy24.pl/api/v1/transaction/verify', {
      method: 'PUT', // Weryfikacja w P24 wymaga metody PUT
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${merchantId}:${apiKey}`).toString('base64')
      },
      body: JSON.stringify(verifyPayload)
    });

    const resData = await response.json();

    if (resData.data && resData.data.status === "success") {
      const dbOrderId = payload.sessionId.split('_')[1];
      await supabase.from('orders').update({ status: 'opłacone' }).eq('id', dbOrderId);
      return { statusCode: 200, body: "OK" };
    }
    
    return { statusCode: 400, body: "Błąd weryfikacji" };

  } catch (err) {
    return { statusCode: 400, body: err.message };
  }
};