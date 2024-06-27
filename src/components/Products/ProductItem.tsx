import type { Product as ProductType } from "@chec/commerce.js/types/product";
import { AddShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";

type ProductsProps = {
  product: ProductType;
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
};

export const ProductItem = ({ product, onAddToCart }: ProductsProps) => {
  const handleAddTocart = () => {
    onAddToCart(product.id, 1)
  }

  return (
    <Card sx={{ height: 300 }}>
      <CardMedia
        image={product.image?.url}
        component="img"
        alt={product.name}
        title={product.name}
        sx={{
          objectFit: "cover",
          objectPosition: "center",
          height: "40%",
        }}
      />
      <CardContent>
        <CardContent
          sx={{
            padding: "0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{product.name}</Typography>
          <Typography>{product.price.formatted_with_symbol}</Typography>
        </CardContent>
        <Typography
          component="h3"
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
            display:'flex',
            justifyContent:'flex-end'
        }}
      >
        <IconButton 
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddTocart}
        >   
            <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};
