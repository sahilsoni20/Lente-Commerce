import { Product as ProductType } from '@chec/commerce.js/types/product';
import { Container, Grid, Typography } from '@mui/material';
import { ProductItem } from './ProductItem';
import { commerce } from '../../lib/Commerce';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation.json';

type ProductsProps = {
  products: ProductType[];
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
};

export const Products = ({ onAddToCart }: ProductsProps) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        setProductList(data);
      } catch (error) {
        console.error('There was an error fetching the products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    
      return <Lottie options={defaultOptions} height={400} width={600} />;
  }

  return (
    <Container sx={{ backgroundColor: 'white', marginBottom: 5 }}>
      <Typography variant="h3" component="h1" textAlign="center" my={3}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {productList.map((product) => (
          <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
            <ProductItem product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
