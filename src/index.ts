import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import Stripe from "stripe";

// Load environment variables from .env file
config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2024-06-20; custom_checkout_beta=v1" as any,
});

const app: Express = express();
app.use(express.json());

app.post("/checkout", async (req: Request, res: Response) => {
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
  } catch (error: unknown) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5713;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
