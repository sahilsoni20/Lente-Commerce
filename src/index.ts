import express, { Express, Response } from "express";
import { config } from "dotenv";
import Stripe from "stripe";

// Load environment variables from .env file
config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
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
      return_url: "http://localhost:5173/checkout",
    });
    res.json({ id: session.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

const PORT = 5713;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
