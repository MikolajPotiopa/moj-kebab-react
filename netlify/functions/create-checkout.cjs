const { createClient } = require('@supabase/supabase-js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {

  const { cart,email,contact } = JSON.parse(event.body);
    console.log(contact)
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


   if (contact !== "false") {
    line_items.push({
      price_data: {
        currency: 'pln',
        product_data: {
          name: 'Opłata za kontakt/dostawę',
        },
        unit_amount: 1000, // 10,00 PLN
      },
      quantity: 1,
    });
  }
  const total_amount = line_items.reduce((sum, li) => sum + (li.price_data.unit_amount * li.quantity), 0) / 100;
     


  const { data: newOrder, error: dbError } = await supabase
  .from('orders')
  .insert([{
    items: cart, 
    total_price: total_amount,
    status: 'oczekuje_na_platnosc',
    email:email,
    contact:contact
  }])
  .select()
  .single();
  if (dbError) throw new Error("Błąd bazy danych");


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'blik', 'p24'], // Polskie metody płatności
    line_items: line_items,
    mode: 'payment',
    metadata:{
      order_id: newOrder.id.toString()
    },
    success_url: `${process.env.SITE_URL}/succes`, // Gdzie wrócić po zapłaceniu
    cancel_url: `${process.env.SITE_URL}/`, // Gdzie wrócić po rezygnacji
  });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }), //idddddddddddddddd
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};