import express from 'express';

const router = express.Router()

const STRIPE_TEST_KEY="sk_test_51PWG7KFJT29WYeemhoOMpKX3G8gMmA3FZ6XiSOxxOJUJwjJ0LtCCnTt8h9H6RD6QeaHaZFa4ZLwxwR0wbYqV32Et008B3aeyuH"
const stripe = require("stripe")(STRIPE_TEST_KEY)

router.post("/create-checkout-session", async(req, res) => {
    const {products} = req.body
    const lineItems = products.map((product) => {
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
                image: [product.image]
            },
            unit_amount: Math.round(product.price*100),
        },
        quantity: product.quantity
    })
    const session = await stripe.checkout.session.create({
        payment_method_types:["cart"],
        line_items: lineItems,
        mode: 'payment',
        success_url: '',
        cancel_url: ''
    }),
    res.json({id:session.id})
})
