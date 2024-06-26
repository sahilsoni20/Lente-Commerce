import type { Product as ProductType } from '@chec/commerce.js/types/product'
import { AddShoppingCart } from '@mui/icons-material'
import { Typography } from '@mui/material'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material'

type ProductsProps = {
    product: ProductType
    onAddToCart: (productId: string, quantity: number) => Promise<void>
}

export const Product = ({product, onAddToCart}: ProductsProps) => {
    return (
        <Card sx={{height: 350}}>
            <CardMedia 
                image={product.image?.url}
                component="img"
                alt={product.name}
                title={product.name}
                sx={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    height: '50%',
                }}
            />
            <CardContent>
                <CardContent
                    sx={{
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                />
                <Typography>
                    {product.name}
                </Typography>
                <Typography/>
            </CardContent>
        </Card>
    )
}