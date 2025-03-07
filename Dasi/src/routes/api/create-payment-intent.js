import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const stripe = new Stripe("sk_test_51QytqhIoIw0g3p2UxY74AxSB7aoviDcgPuzavuRTRnGgPxMv55RkSUM093z1b7VwcatHi6zYAUelcry4ATbCrVvC00chIQHIE1");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint for å opprette et Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    // 1️⃣ Opprett betaling i Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Pris i øre (50 kr)
      currency: "nok",
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    } else {
      res.json({ error: "Unknown error occurred" });
    }
  }
});

// Start serveren
app.listen(3000, () => console.log("Server kjører på http://localhost:3000"));