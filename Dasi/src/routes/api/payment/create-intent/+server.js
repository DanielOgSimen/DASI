/* import express from 'express';
import Stripe from 'stripe';

const app = express();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(stripeSecretKey);

app.use(express.json());

app.post('/api/payment/create-intent', async (req, res) => {
    try {
        const { paymentMethodId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        res.status(400).json({ error: "Daniel tissa i buksa"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); */