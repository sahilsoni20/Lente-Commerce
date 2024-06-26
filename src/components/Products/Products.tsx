import { Product as ProductType } from '@chec/commerce.js/types/product';
import { Container, Grid, Typography } from '@mui/material';
import { Product } from './Product';
import { commerce } from '../../lib/Commerce';
import { useEffect, useState } from 'react';
import Animation from '../../assets/Animation.gif'
import './loading.css'

export const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        setProducts(data);
      } catch (error) {
        console.error('There was an error fetching the products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className='loading'><img src={Animation} alt="loading..." /></div>;
  }

  return (
    <Container sx={{ backgroundColor: 'white', marginBottom: 5}}>
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
  );
};
