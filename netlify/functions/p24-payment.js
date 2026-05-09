import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const handler = async (event) => {
  try {
    const p24Module = await import('p24');
    
    // LOGOWANIE DLA DEBUGOWANIA (zobaczysz to w logach Netlify)
    console.log("Typ modułu:", typeof p24Module);
    console.log("Klucze modułu:", Object.keys(p24Module));
    if (p24Module.default) {
      console.log("Klucze modułu.default:", Object.keys(p24Module.default));
    }

    // --- INTELIGENTNY DETEKTOR KONSTRUKTORA ---
    const findConstructor = (mod) => {
      if (!mod) return null;
      // 1. Czy sam moduł jest funkcją?
      if (typeof mod === 'function') return mod;
      // 2. Czy default jest funkcją?
      if (typeof mod.default === 'function') return mod.default;
      // 3. Czy P24 w module jest funkcją?
      if (typeof mod.P24 === 'function') return mod.P24;
      // 4. Czy P24 w default jest funkcją?
      if (mod.default && typeof mod.default.P24 === 'function') return mod.default.P24;
      
      // 5. Przeszukaj klucze modułu w poszukiwaniu jakiejkolwiek klasy/funkcji
      for (const key of Object.keys(mod)) {
        if (typeof mod[key] === 'function') return mod[key];
      }
      
      // 6. Przeszukaj klucze default
      if (mod.default) {
        for (const key of Object.keys(mod.default)) {
          if (typeof mod.default[key] === 'function') return mod.default[key];
        }
      }
      return null;
    };

    const P24Class = findConstructor(p24Module);

    if (!P24Class) {
      throw new Error("Nie znaleziono konstruktora P24 w zaimportowanym module!");
    }

    // Tworzymy instancję
    const p24 = new P24Class(
      process.env.P24_MERCHANT_ID,
      process.env.P24_POS_ID,
      process.env.P24_API_KEY,
      process.env.P24_CRC,
      { sandbox: true }
    );
    // ------------------------------------------

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
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ url: `https://sandbox.przelewy24.pl/trnRequest/${result.token}` })
    };

  } catch (err) {
    console.error("Błąd krytyczny płatności:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};