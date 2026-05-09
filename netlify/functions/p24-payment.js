import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  try {
    const { cart, email } = JSON.parse(event.body);

    // 1. Obliczanie ceny (Twoja sprawdzona logika)
    const productIds = cart.map(item => item.id);
    const { data: dbProducts } = await supabase.from('products').select('*').in('id', productIds);
    const total_cents = cart.reduce((sum, item) => {
      const p = dbProducts.find(db => db.id === item.id);
      let price = p.price_standard;
      if (item.size === 'Średni') price = p.price_medium;
      if (item.size === 'Duże' || item.size === 'Mega') price = p.price_large;
      return sum + (Math.round(price * 100) * item.qty);
    }, 0);

    // 2. Zapis w Supabase
    const { data: order } = await supabase.from('orders').insert([{ items: cart, total_price: total_cents / 100, status: 'oczekuje_na_platnosc' }]).select().single();

    // 3. KONFIGURACJA P24 (Czyste API)
    const merchantId = Number(process.env.P24_MERCHANT_ID);
    const apiKey = process.env.P24_API_KEY;
    const crc = process.env.P24_CRC;
    const sessionId = `order_${order.id}_${Date.now()}`;
    const baseUrl = `https://${event.headers.host}`;

    // Generowanie podpisu (SHA384) wg dokumentacji P24
    const signSource = JSON.stringify({
      sessionId, merchantId, amount: total_cents, currency: "PLN", crc
    });
    const signature = crypto.createHash('sha384').update(signSource).digest('hex');

    const p24Payload = {
      merchantId, posId: merchantId, sessionId,
      amount: total_cents, currency: "PLN",
      description: `Zamówienie nr ${order.id}`,
      email, client: email,
      urlReturn: `${baseUrl}/success`,
      urlStatus: `${baseUrl}/.netlify/functions/p24-webhook`,
      sign: signature
    };

    // Rejestracja transakcji w Sandbox
    const response = await fetch('https://sandbox.przelewy24.pl/api/v1/transaction/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${merchantId}:${apiKey}`).toString('base64')
      },
      body: JSON.stringify(p24Payload)
    });

    const resData = await response.json();

    if (resData.data && resData.data.token) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ url: `https://sandbox.przelewy24.pl/trnRequest/${resData.data.token}` })
      };
    } else {
      throw new Error("Błąd P24: " + JSON.stringify(resData));
    }

  } catch (err) {
    console.error("Błąd krytyczny:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};