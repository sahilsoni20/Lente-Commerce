import { useCustomCheckout } from "@stripe/react-stripe-js"

export const Checkout = () => {
    const checkout = useCustomCheckout()
    console.log(checkout)
    return (
        <pre>
            {JSON.stringify(checkout.lineItems, null, 2)}
        </pre>
    )
}