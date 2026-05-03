const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log("--- NOWA PRÓBA WEBHOOKA ---");
  console.log("Nagłówek Signature:", sig ? "OBECNY" : "BRAK!");
  console.log("Webhook Secret (początek):", secret ? secret.substring(0, 10) : "BRAK KLUCZA W ENV!");

  let stripeEvent;

  try {

    const rawBody = event.isBase64Encoded 
      ? Buffer.from(event.body, 'base64').toString() 
      : event.body;

    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("BŁĄD WERYFIKACJI PODPISU:", err.message);
    return { 
      statusCode: 400, 
      body: `Webhook Error: ${err.message}` 
    };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const cartItems = JSON.parse(session.metadata.cart);
    const totalPrice = session.metadata.total_price;

    console.log("Próba zapisu do Supabase dla sesji:", session.id);

    const { error } = await supabase
      .from('orders')
      .insert([{
        items: cartItems,
        total_price: parseFloat(totalPrice),
        payment_id: session.id,
        status: 'nowe'
      }]);

    if (error) {
      console.error("BŁĄD SUPABASE:", error.message);
      return { statusCode: 500, body: error.message };
    }
    
    console.log("SUKCES: Zamówienie zapisane!");
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};