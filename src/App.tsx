import "./index.css";
import { Home } from "./components/Home/Home";
import { Cart } from "./components/Cart/Cart";
import { Shipping } from "./components/Shipping/Shipping";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cart as CartType } from "@chec/commerce.js/types/cart";
import { commerce } from "./lib/Commerce";

function App() {
  const [cart, setCart] = useState<CartType>();

  const fetchCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    } catch (error) {
      console.error("There is an error while fetching data from Cart: ", error);
    }
  };

  const handleUpdateCartQuantity = async (lineItemId: string, quantity: number): Promise<void> => {
    try {
      const { cart } = await commerce.cart.update(lineItemId, { quantity });
      setCart(cart);
    } catch (error) {
      console.error("There is an error in updating the data in Cart: ", error);
    }
  };

  const handleRemoveFromCart = async (lineItemId: string): Promise<void> => {
    try {
      const { cart } = await commerce.cart.remove(lineItemId);
      setCart(cart);
    } catch (error) {
      console.error("There is an error while removing the products from Cart: ", error);
    }
  };

  const handleEmptyCart = async (): Promise<void> => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.error('There was an error emptying the cart', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCartEmpty={handleEmptyCart}
            />
          }
        />
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
    </Router>
  );
}

export default App;
