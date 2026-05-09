import { P24 } from 'p24';
import { createClient } from '@supabase/supabase-js';

const p24 = new P24(
  process.env.P24_MERCHANT_ID,
  process.env.P24_POS_ID,
  process.env.P24_API_KEY,
  process.env.P24_CRC,
  { sandbox: true } 
);

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  try {
    // Sprawdzenie czy body istnieje
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "Brak danych w zapytaniu" }) };
    }

    const { cart, email } = JSON.parse(event.body);

    const productIds = cart.map(item => item.id);

    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (dbError) throw new Error("Błąd bazy danych Supabase");

    const line_items = cart.map(item => {
      const dbProduct = dbProducts.find(p => p.id === item.id);
      let finalPrice = dbProduct.price_standard;
      if (item.size === 'Średni') finalPrice = dbProduct.price_medium;
      if (item.size === 'Mega' || item.size === 'Duże') finalPrice = dbProduct.price_large;

      return {
        unit_amount: Math.round(finalPrice * 100), 
        quantity: item.qty,
      };
    });

    const total_amount_cents = line_items.reduce((sum, li) => sum + (li.unit_amount * li.quantity), 0);

    // 1. Zapisujemy zamówienie
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ 
        items: cart, 
        total_price: total_amount_cents / 100, 
        status: 'oczekuje_na_platnosc',
        email: email // warto zapisać maila przy zamówieniu
      }])
      .select().single();

    if (orderError) throw new Error("Nie udało się utworzyć zamówienia w bazie");

    // 2. Rejestrujemy płatność w P24
    const sessionId = `order_${order.id}_${Date.now()}`;
    
    // UŻYJ ADRESU ZMIENNEJ ŚRODOWISKOWEJ LUB WPISZ NA SZTYWNO JEŚLI process.env.URL NIE DZIAŁA
    const baseUrl = process.env.URL || "https://strona-kebab.netlify.app";

    const result = await p24.createTransaction({
      sessionId: sessionId,
      amount: total_amount_cents,
      currency: 'PLN',
      description: `Zamówienie Golden Kebab nr ${order.id}`,
      email: email,
      urlReturn: `${baseUrl}/success`, 
      urlStatus: `${baseUrl}/.netlify/functions/p24-webhook`, 
    });

    // 3. Sukces - zwracamy URL
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // ważne dla uniknięcia błędów CORS
      },
      body: JSON.stringify({ url: `https://sandbox.przelewy24.pl/trnRequest/${result.token}` })
    };

  } catch (err) {
    console.error("BŁĄD PŁATNOŚCI:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};