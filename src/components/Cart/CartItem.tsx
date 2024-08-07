import { LineItem } from "@chec/commerce.js/types/line-item";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import createTheme from @mui/material/styles
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";

type CartItemProps = {
  lineItem: LineItem;
  onUpdateQuery: (lineItemId: string, quantity: number) => Promise<void>;
  onRemoveCart: (lineItemId: string) => Promise<void>;
};

const theme = createTheme({ // Use createTheme from @mui/material/styles
  palette: {
    primary: { main: "#2196f3" },
    secondary: { main: "#E53935" },
  },
});

export const CartItem: React.FC<CartItemProps> = ({
  lineItem,
  onUpdateQuery,
  onRemoveCart,
}) => {
  const handleUpdateCartQuantity = (lineItemId: string, quantity: number) => {
    onUpdateQuery(lineItemId, quantity);
  };

  const handleRemoveFromCart = () => {
    onRemoveCart(lineItem.id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardMedia image={lineItem.image?.url} sx={{ height: 150 }} />
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="h2">
            {lineItem.name}
          </Typography>
          <Typography>{lineItem.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Button
              aria-label="decrease"
              type="button"
              size="small"
              color="primary"
              onClick={() =>
                handleUpdateCartQuantity(lineItem.id, lineItem.quantity - 1)
              }
            >
              -
            </Button>
            <Typography component="h3">
              &nbsp;{lineItem.quantity}&nbsp;
            </Typography>
            <Button
              aria-label={`Increase quantity of ${lineItem.name}`}
              type="button"
              size="small"
              color="primary"
              onClick={() =>
                handleUpdateCartQuantity(lineItem.id, lineItem.quantity + 1)
              }
            >
              +
            </Button>
          </Container>
          <Button
            aria-label={`Remove ${lineItem.name}`}
            variant="contained"
            type="button"
            color="secondary"
            onClick={handleRemoveFromCart}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};
