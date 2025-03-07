import Stripe from 'stripe';

// Ensure the secret key is defined
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST({ request }) {
    try {
        const { paymentMethodId } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
        });

        return new Response(JSON.stringify({ success: true, paymentIntent }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Ensure error is properly typed
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
}