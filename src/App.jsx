import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Checkout from "./pages/Checkout";
import Orders from "./pages/orders";
import Tracking from "./pages/Tracking";
import axios from "axios";
function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/cart-items?expand=product"
    );

    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/orders" element={<Orders cart={cart} />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
