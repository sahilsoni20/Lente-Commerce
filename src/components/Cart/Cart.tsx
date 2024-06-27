import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { Container, Button, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import Animation from "../../assets/Animation.gif";

type CartProps = {
  cart?: CartType | undefined;
  handleUpdateCartQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  handleRemoveFromCart: (lineItemId: string) => Promise<void>;
  handleCartEmpty: () => Promise<void>;
};

const theme = createTheme({
  palette: {
    primary: { main: "#2196f3" },
    secondary: { main: "#212121" },
  },
});

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
        <img src={Animation} alt="loading..." />
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
      <Link to="/" color="primary" style={{margin: '5px'}}>
        start adding some.
      </Link>
    </Typography>
  );

  const renderCart = (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
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
            component={Link}
            to="/Checkout"
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            aria-label="Check Out"
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
