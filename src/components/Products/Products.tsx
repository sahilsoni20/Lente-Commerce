import Commerce from "@chec/commerce.js"
import { ProductProps } from "../../Types/Type"
import { useEffect, useState } from "react"
import Animation from '../../assets/Animation.gif'
import { Container, Grid, Typography } from '@mui/material'
import { Product } from "./Product"

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

    if(loading) return <div className="loading"><img src={Animation} alt="loading..." /></div>

    return (
        <Container
      sx={{
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="h3" component="h1" textAlign="center" my={3}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
    )
}