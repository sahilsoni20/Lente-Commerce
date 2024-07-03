import "./Home.css";
import lens from "../../assets/lens.jpg";
import lens2 from "../../assets/lens2.png";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { Products } from "../Products/Products";
import { Product as ProductType } from '@chec/commerce.js/types/product';
import { useEffect, useState } from "react";
import { commerce } from "../../Lib/Commerce";
import { Cart as CartType } from '@chec/commerce.js/types/cart';

export const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartType | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        setProducts(data);
      } catch (error) {
        console.error("There is a problem fetching data from Product: ", error);
      }
    };

    fetchProducts();

    const fetchCart = async () => {
      try {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
      } catch (error) {
        console.error("There is a problem fetching cart data: ", error);
      }
    };

    fetchCart();
  }, []);

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      console.error("There is an error while pushing the data into cart: ", error);
    }
  };

  return (
    <>
      <div className="home-page">
        <div className="home-wrapper">
          <h1>Lente</h1>
          <span>
            <Link to="/cart">
              <Badge
                badgeContent={cart?.total_items || 0}
                color="primary"
                style={{ cursor: "pointer", marginTop: "1.5rem" }}
              >
                <ShoppingCartOutlinedIcon fontSize="large" sx={{color: 'white'}}/>
              </Badge>
            </Link>
          </span>
        </div>
        <div className="home-image">
          <div className="home-link">
            <h2>Check Lenses</h2>
            <a href="#products-section">
              <button>Shop Now</button>
            </a>
          </div>
          <img src={lens} alt="" />
          <img src={lens2} alt="" />
        </div>
      </div>
      <div id="products-section">
        <Products product={products} onAddToCart={handleAddToCart} />
      </div>
    </>
  );
};
