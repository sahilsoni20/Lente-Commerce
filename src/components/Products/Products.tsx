// src/components/Products/Products.tsx
import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { ProductItem } from './ProductItem';
import { useProductStore } from '../../Lib/Store';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation.json';

type ProductsProps = {
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
};

export const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const { product, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return <Lottie options={defaultOptions} height={400} width={600} />;
  }

  return (
    <Container sx={{ backgroundColor: 'white', marginBottom: 5 }}>
      <Typography variant="h3" component="h1" textAlign="center" my={3}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {product.map((product) => (
          <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
            <ProductItem product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
