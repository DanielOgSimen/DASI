import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(stripeSecretKey);

export async function post({ request }) {
    try {
        const { paymentMethodId } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
        });

        return {
            status: 200,
            body: { success: true, paymentIntent }
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 400,
                body: { error: error.message }
            };
        } else {
            return {
                status: 400,
                body: { error: "Unknown error occurred" }
            };
        }
    }
}