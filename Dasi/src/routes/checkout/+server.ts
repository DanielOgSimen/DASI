import { stripe } from "../stripe"; // Importerer Stripe-biblioteket
import type { RequestHandler } from "@sveltejs/kit"; // Importerer RequestHandler-typen fra SvelteKit
import type { CartItem } from "../api/cart"; // Importerer CartItem-typen fra cart API
import { env } from "$env/dynamic/private"; // Importerer miljøvariabler

// Definerer en POST-forespørselshåndterer
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json(); // Henter JSON-data fra forespørselen
  const cartItems: CartItem[] = data.items; // Setter verdiene fra forespørselen til cartItems som har lik struktor med navn osv

  // Oppretter linjeelementer for å omdirigere brukere
  const lineItems = cartItems.map((item) => { // setter cart items til item så vi kan bruke det i map og referere til innholdet i cart items
    return {
      price_data: {
        currency: "USD", // Setter valutaen til USD
        product_data: {
          name: item.name, // Setter produktnavnet
          images: [], // Setter produktbilder (tom liste)
        },
        unit_amount: item.price * 100, // Setter enhetsprisen (i cent)
        recurring: {
          interval: "month" as "day" | "week" | "month" | "year", // Angir at abonnementet er månedlig
        },
      },
      quantity: item.amount, // Setter mengden av produktet
    };
  });

  // Oppretter en Stripe-utsjekkingsøkt
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems, // Legger til linjeelementene
    shipping_address_collection: {
      allowed_countries: ["NO"], // Tillater frakt til Norge
    },
    mode: "subscription", // Angir at det er et abonnement
    success_url: `${env.BASE}/success`, // URL for vellykket betaling
    cancel_url: `${env.BASE}/cancel`, // URL for avbrutt betaling
    phone_number_collection: {
      enabled: true, // Aktiverer innsamling av telefonnummer
    },
  });

  // Returnerer en respons med URL-en til Stripe-utsjekkingsøkten
  return new Response(
    JSON.stringify({
      url: session.url,
    }),
    {
      status: 200, // Setter HTTP-statuskoden til 200 (OK)
      headers: {
        "Content-Type": "application/json", // Angir innholdstypen som JSON
      },
    },
  );
};