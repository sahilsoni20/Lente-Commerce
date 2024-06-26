import Commerce from "@chec/commerce.js"
import { ProductProps } from "../../Types/Type"
import { useEffect, useState } from "react"
import animation from '../../assets/Animation - 1719291876800.gif'

const COMMERCE_CHEC_PUBLIC_KEY='pk_test_575827a12ced2078111841605721c9affc1182f5d2fac'

const commerce = new Commerce(COMMERCE_CHEC_PUBLIC_KEY!, true)

export const Products = () => {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const {data} = await commerce.products.list()
                setProducts(data as ProductProps[])
            } catch (error) {
                console.error("Error while fetching product from commerce.js:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts();
    },[])

    if(loading) return <div className="loading"><img src={animation} alt="" /></div>

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    {product.image && <img src={product.image.url} alt={product.name}/>}
                    <h1>{product.name}</h1>
                    <p>{product.price.formatted_with_symbol}</p>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
            ))}
        </div>
    )
}