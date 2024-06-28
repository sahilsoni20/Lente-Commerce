import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const STRIPE_TEST_KEY = "sk_test_51PWG7KFJT29WYeemhoOMpKX3G8gMmA3FZ6XiSOxxOJUJwjJ0LtCCnTt8h9H6RD6QeaHaZFa4ZLwxwR0wbYqV32Et008B3aeyuH";
const stripe = new Stripe(STRIPE_TEST_KEY, {
  apiVersion: '2024-06-20',
});

router.post("/checkout", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
        images: [product.image], // Corrected from image to images
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Corrected from cart to card
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Provide your success URL
      cancel_url: 'http://localhost:3000/cancel', // Provide your cancel URL
    });

    res.json({ id: session.id });
  } catch (error: unknown) {
    res.status(500).send(`Error creating checkout session: ${error.message}`);
  }
});

export default router;
