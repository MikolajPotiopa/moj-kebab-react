const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Łączymy się z Supabase (używając klucza admina SERVICE_ROLE)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  // --- DODAJ TE LOGI DLA DEBUGOWANIA ---
  console.log("--- START WEBHOOKA ---");
  console.log("Nagłówek Signature:", event.headers['stripe-signature'] ? "JEST" : "BRAK");
  
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.log("BŁĄD: Brak klucza STRIPE_WEBHOOK_SECRET w zmiennych środowiskowych!");
  } else {
    console.log("Klucz zaczyna się od:", secret.substring(0, 10) + "...");
  }
  // -------------------------------------

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, secret);
  } catch (err) {
    console.log("BŁĄD WERYFIKACJI PODPISU:", err.message); // To nam powie co jest nie tak
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