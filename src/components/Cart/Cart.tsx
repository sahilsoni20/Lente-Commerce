import React, { useEffect } from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CartItem } from './CartItem';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '../../Lib/Store';

const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#212121' },
  },
});

const stripePromise = loadStripe('pk_test_51PWG7KFJT29WYeemKcR7W2MCE0lF7iuEel1SJsY0T2hWl0e15KboEz2pF4IMEBQU60GQvOkcZzSPYcrlcpAYepAN00ah6MtRHn');

export const Cart: React.FC = () => {
  const { cart, loading, fetchCart, updateItemQuantity, removeItem, emptyCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (!cart) {
    return null; // Handle loading state if cart is still undefined
  }

  const renderEmptyCart = (
    <Typography variant="subtitle1" component="h2" textAlign="center" mt="250px">
      You have no items in your cart
      <Link to="/" color="primary" style={{ margin: '5px' }}>
        start adding some.
      </Link>
    </Typography>
  );

  const makePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Failed to load Stripe.');
      return;
    }

    const body = {
      products: cart.line_items,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
      const session = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  const renderCart = (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} marginTop={5}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={lineItem.id}>
            <CartItem
              lineItem={lineItem}
              onUpdateQuery={updateItemQuantity}
              onRemoveCart={removeItem}
            />
          </Grid>
        ))}
      </Grid>
      <Container
        sx={{
          mt: 10,
          mb: 5,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            width: '100%',
          }}
        >
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            aria-label="Empty Cart"
            sx={{
              mb: 2,
              mr: 2,
            }}
            onClick={emptyCart}
          >
            Empty Cart
          </Button>
          <Button
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            aria-label="Check Out"
            onClick={makePayment}
            sx={{
              mb: 2,
              mr: 2,
            }}
          >
            Check Out
          </Button>
        </Container>
      </Container>
    </ThemeProvider>
  );

  return (
    <Container>
      <Typography variant="h3" component="h1" textAlign="center" my={3}>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart : renderCart}
    </Container>
  );
};

