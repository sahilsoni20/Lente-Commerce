import "./Home.css";
import lens from "../../assets/lens.jpg";
import lens2 from "../../assets/lens2.png";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { Products } from "../Products/Products";
import { useState } from "react";
import { Product } from '@chec/commerce.js/types/product'

export const Home = () => {
  const [products] = useState<Product[]>([] as Product[])
  return (
    <>
    <div className="home-page">
      <div className="home-wrapper">  
        <h1>Lente</h1>
        <span>
          <Link to="/cart">
            <Badge
              badgeContent={1}
              color="primary"
              style={{ cursor: "pointer", marginTop: "1.5rem" }}
            >
              <ShoppingCartOutlinedIcon fontSize="large" />
            </Badge>
          </Link>
        </span>
      </div>
      <div className="home-image">
        <div className="home-link">
          <h2>Check Lenses</h2>
          <a href="#products">
            {" "}
            <button>Shop</button>
          </a>
        </div>
        <img src={lens} alt="" />
        <img src={lens2} alt="" />
      </div>
    </div>
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Products products={products} />
    </>
  );
};
  