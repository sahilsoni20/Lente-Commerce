// import express, { Express, Request, Response } from "express";
// import Stripe from "stripe";
// import dotenv from "dotenv";
// import helmet from "helmet";

// dotenv.config(); // Load environment variables from .env file

// const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY as string;

// // Initialize Stripe with your secret key
// const stripe = new Stripe(STRIPE_API_KEY, {
//   apiVersion: "2024-06-20",
// });

// const app: Express = express();
// app.use(express.json());

// // Define the Commerce.js CDN domain
// const commerceJsImageDomain = "https://cdn.chec.io"; // Replace with actual Commerce.js CDN domain if different

// // Setup helmet with CSP
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "https://js.stripe.com"],
//       imgSrc: ["'self'", "https://q.stripe.com", "https://m.stripe.network", "https://m.stripe.com", "https://b.stripecdn.com", commerceJsImageDomain, "data:"],
//       // Add other directives as needed
//     },
//   })
// );

// app.post("/checkout", async (req: Request, res: Response) => {
//   try {
//     const { products } = req.body;
//     if (!products || products.length === 0) {
//       res.status(400).json({ error: "No products provided" });
//       return;
//     }

//     const lineItems = products.map((product: any) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.name,
//         },
//         unit_amount: product.price.raw * 100, // Assuming price.raw is in dollars
//       },
//       quantity: product.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/success",
//       cancel_url: "http://localhost:5173/cancel",
//     });
//     res.json({ id: session.id });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error creating checkout session:", error.message);
//       res.status(500).json({ error: error.message });
//     } else {
//       console.error("Unknown error creating checkout session:", error);
//       res.status(500).json({ error: "An unknown error occurred" });
//     }
//   }
// });

// const PORT = 5713;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import * as Stripe from 'stripe'
import * as express from 'express'
import * as cors from 'cors'

const stripe = new Stripe('sk_test_51PWG7KFJT29WYeemhoOMpKX3G8gMmA3FZ6XiSOxxOJUJwjJ0LtCCnTt8h9H6RD6QeaHaZFa4ZLwxwR0wbYqV32Et008B3aeyuH')

const app = express();
app.use(cors({origin: true}))

app.post('/webhook', async (req, res) => {
  const endpointSecret = ''
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body.rawBody, sig, endpointSecret)
  } catch (error) {
    res.status(400).end();
    return
  }
  const intent:any = event.data.object

  switch(event.type) {
    case'payment_intent.succeeded'
  }
})

export const payments = function.https.onRequest(app)
