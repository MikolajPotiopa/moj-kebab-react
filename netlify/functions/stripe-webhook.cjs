const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Łączymy się z Supabase (używając klucza admina SERVICE_ROLE)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    // Weryfikacja, czy to na pewno Stripe
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Obsługa zdarzenia: Płatność udana
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    // Wyciągamy nasze dane z metadata
    const cartItems = JSON.parse(session.metadata.cartItems);
    const totalPrice = session.metadata.total_amount;

    // Zapisujemy do bazy danych Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          items: cartItems,
          total_price: parseFloat(totalPrice),
          payment_id: session.id,
          status: 'nowe'
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return { statusCode: 500, body: 'Błąd bazy danych' };
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};