const { P24 } = require('p24');
const { createClient } = require('@supabase/supabase-js');

const p24 = new P24(
  process.env.P24_MERCHANT_ID,
  process.env.P24_POS_ID,
  process.env.P24_API_KEY,
  process.env.P24_CRC,
  { sandbox: true } // Zmień na false przy przejściu na produkcję
);

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  const { cart, email } = JSON.parse(event.body);

  const productIds = cart.map(item => item.id);

    const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

    if (error) return { statusCode: 500, body: "Błąd bazy danych" };

    const line_items = cart.map(item => {

      const dbProduct = dbProducts.find(p => p.id === item.id);

      let finalPrice = dbProduct.price_standard;
      if (item.size === 'Średni') finalPrice = dbProduct.price_medium;
      if (item.size === 'Mega' || item.size === 'Duże') finalPrice = dbProduct.price_large;
      return{
      price_data: {
        currency: 'pln',
        product_data: {
          name: `${dbProduct.title} (${item.size})`,
          description: item.sauces ? `Sosy: ${item.sauces.join(', ')}` : '',
        },
        unit_amount: Math.round(finalPrice * 100), 
      },
      quantity: item.qty,
    }});
    const total_amount = line_items.reduce((sum, li) => sum + (li.price_data.unit_amount * li.quantity), 0) / 100;

  // 1. Zapisujemy zamówienie w Supabase (Metoda Order ID)
  const { data: order } = await supabase
    .from('orders')
    .insert([{ items: cart, total_price: total_amount, status: 'oczekuje_na_platnosc' }])
    .select().single();

  // 2. Rejestrujemy płatność w P24
  const sessionId = `order_${order.id}_${Date.now()}`;
  
  const result = await p24.createTransaction({
    sessionId: sessionId,
    amount: Math.round(total_amount * 100), // P24 też liczy w groszach!
    currency: 'PLN',
    description: `Zamówienie Golden Kebab nr ${order.id}`,
    email: email,
    urlReturn: `${process.env.URL}/success`, // Gdzie wrócić po płatności
    urlStatus: `${process.env.URL}/.netlify/functions/p24-webhook`, // Webhook
  });

  // 3. P24 zwraca token, z którego budujemy link
  return {
    statusCode: 200,
    body: JSON.stringify({ url: `https://sandbox.przelewy24.pl/trnRequest/${result.token}` })
  };
};