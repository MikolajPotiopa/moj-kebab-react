const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;


  let stripeEvent;

  try {
    // WAŻNE: Netlify czasem przesyła body jako Base64. Musimy to obsłużyć:
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
    const orderId = session.metadata.order_id;
    if (!orderId) {
        console.error("BŁĄD: Brak klucza orderId w metadata!");
        return { statusCode: 400, body: "Brak danych koszyka" };
    }
    const { error } = await supabase
    .from('orders')
    .update({ status: 'nowe', payment_id: session.id })
    .eq('id', orderId);

    if (error) {
      console.error("BŁĄD SUPABASE:", error.message);
      return { statusCode: 500, body: error.message };
    }
    
    console.log("SUKCES: Zamówienie zapisane!");
  }
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};