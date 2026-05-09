import { createClient } from '@supabase/supabase-js';

// Supabase inicjujemy na górze
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  try {
    // --- KLUCZOWY MOMENT ---
    // Ładujemy bibliotekę dynamicznie, aby uniknąć błędów konstruktora
    const p24Module = await import('p24');
    
    // Fail-safe: wybieramy klasę P24 niezależnie od tego, gdzie ją schował kompilator
    const P24Class = p24Module.default?.P24 || p24Module.P24 || p24Module.default || p24Module;

    const p24 = new P24Class(
      process.env.P24_MERCHANT_ID,
      process.env.P24_POS_ID,
      process.env.P24_API_KEY,
      process.env.P24_CRC,
      { sandbox: true }
    );
    // -----------------------

    const { cart, email } = JSON.parse(event.body);
    const productIds = cart.map(item => item.id);

    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (dbError) throw new Error("Błąd bazy danych");

    const line_items = cart.map(item => {
      const dbProduct = dbProducts.find(p => p.id === item.id);
      let price = dbProduct.price_standard;
      if (item.size === 'Średni') price = dbProduct.price_medium;
      if (item.size === 'Duże' || item.size === 'Mega') price = dbProduct.price_large;
      return { amount: Math.round(price * 100), qty: item.qty };
    });

    const total_cents = line_items.reduce((sum, li) => sum + (li.amount * li.qty), 0);

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ items: cart, total_price: total_cents / 100, status: 'oczekuje_na_platnosc' }])
      .select().single();

    if (orderError) throw new Error("Błąd zapisu zamówienia");

    const result = await p24.createTransaction({
      sessionId: `order_${order.id}_${Date.now()}`,
      amount: total_cents,
      currency: 'PLN',
      description: `Zamówienie nr ${order.id}`,
      email: email,
      urlReturn: `${process.env.URL || 'https://' + event.headers.host}/success`,
      urlStatus: `${process.env.URL || 'https://' + event.headers.host}/.netlify/functions/p24-webhook`,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: `https://sandbox.przelewy24.pl/trnRequest/${result.token}` })
    };

  } catch (err) {
    console.error("Błąd:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};