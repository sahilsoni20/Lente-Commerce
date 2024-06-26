import "./Home.css";
import lens from "../../assets/lens.jpg";
import lens2 from "../../assets/lens2.png";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-wrapper">
        <h1>Lente</h1>
        <span>
          <Badge
            badgeContent={1}
            color="primary"
            style={{ cursor: "pointer", marginTop: "1.5rem" }}
          >
            <ShoppingCartOutlinedIcon fontSize="large" />
          </Badge>
        </span>
      </div>
      <div className="home-image">
        <div className="home-link">
          <h2>Check Lenses</h2>
          <button>Shop</button>
        </div>
        <img src={lens} alt="" />
        <img src={lens2} alt="" />
      </div>
    </div>
  );
};
