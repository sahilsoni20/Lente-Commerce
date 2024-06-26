import "./index.css";
import { Home } from "./components/Home/Home";
import { Cart } from "./components/Cart/Cart";
import { Shipping } from "./components/Shipping/Shipping";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
    </Router>
  );
}

export default App;
