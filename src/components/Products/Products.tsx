import Commerce from "@chec/commerce.js"
import { ProductProps } from "../../Types/Type"
import { useEffect, useState } from "react"

const commerce = new Commerce(process.env.COMMERCE_CHEC_PUBLIC_KEY!, true)

export const Products = () => {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        
    })

    return (
        <div>Hello from</div>
    )
}