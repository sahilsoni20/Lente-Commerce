import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { Container, Button, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { loadStripe } from "@stripe/stripe-js";

type CartProps = {
  cart?: CartType | undefined;
  handleUpdateCartQuantity: (
    lineItemId: string,
    quantity: number
  ) => Promise<void>;
  handleRemoveFromCart: (lineItemId: string) => Promise<void>;
  handleCartEmpty: () => Promise<void>;
};

const theme = createTheme({
  palette: {
    primary: { main: "#2196f3" },
    secondary: { main: "#212121" },
  },
});

const stripePromise = loadStripe("pk_test_51PWG7KFJT29WYeemKcR7W2MCE0lF7iuEel1SJsY0T2hWl0e15KboEz2pF4IMEBQU60GQvOkcZzSPYcrlcpAYepAN00ah6MtRHn");

export const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleCartEmpty,
}: CartProps) => {
  console.log("cart item", cart);

  if (!cart) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  const renderEmptyCart = (
    <Typography
      variant="subtitle1"
      component="h2"
      textAlign="center"
      mt="250px"
    >
      You have no items in your cart
      <Link to="/" color="primary" style={{ margin: "5px" }}>
        start adding some.
      </Link>
    </Typography>
  );

  const makePayment = async () => {
    const stripe = await stripePromise;
    const body = {
      products: cart.line_items, // Corrected from product to products
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("/checkout", {
      method: "POST",
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
  };

  const renderCart = (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} marginTop={5}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={lineItem.id}>
            <CartItem
              lineItem={lineItem}
              onUpdateQuery={handleUpdateCartQuantity}
              onRemoveCart={handleRemoveFromCart}
              onEmptyCart={handleCartEmpty}
            />
          </Grid>
        ))}
      </Grid>
      <Container
        sx={{
          mt: 10,
          mb: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            width: "100%",
          }}
        >
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
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
            onClick={handleCartEmpty}
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
