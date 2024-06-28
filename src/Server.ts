import express, { Express, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY as string;

// Initialize Stripe with your secret key
const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2024-06-20",
});

const app: Express = express();
app.use(express.json());

app.post("/checkout", async ( res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Lens",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating checkout session:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("Unknown error creating checkout session:", error);
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

const PORT = 5713;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
