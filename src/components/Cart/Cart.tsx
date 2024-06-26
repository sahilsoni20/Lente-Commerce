import {Cart as CartType} from '@chec/commerce.js/types/cart'
import { Container, Button, Typography, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CartItem } from './CartItem'

type CartProps = {
    cart: CartType
    handleUpdateCartQuantity: (lineItemId: string, quantity: number) => Promise<void>
    handleRemoveFromCart: (lineItemId: string) => Promise<void>
    handleCartEmpty: () => Promise<void>
}

const theme = createTheme({
    palette: {
        primary: {main: '#2196f3'},
        secondary: {main: '#212121'}
    }
})

export const Cart = ({cart}:CartProps) => {
    const renderEmptyCart = (
        <T
    )

    return (
        <Container 
            style={{background: '#fafafa'}}
        >
            <Typography variant='h3' component='h1' textAlign='center' my={3}>
                Your Shopping Cart
            </Typography>
        </Container>
    )
}