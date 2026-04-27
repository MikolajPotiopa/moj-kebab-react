const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Tylko prośby typu POST są dozwolone
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { cart } = JSON.parse(event.body);

    // Budujemy listę produktów dla Stripe
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: `${item.title} (${item.size})`,
          // Jeśli masz sosy, dodajemy je do opisu
          description: item.sauces ? `Sosy: ${item.sauces.join(', ')}` : '',
        },
        // Stripe chce ceny w groszach (np. 35 zł = 3500)
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.qty,
    }));

    // Tworzymy sesję płatności
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'], // Polskie metody płatności
      line_items,
      mode: 'payment',
      success_url: `${process.env.URL}/?success=true`, // Gdzie wrócić po zapłaceniu
      cancel_url: `${process.env.URL}/?canceled=true`, // Gdzie wrócić po rezygnacji
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};