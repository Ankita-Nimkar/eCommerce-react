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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
    axios.get("http://localhost:3000/api/cart-items").then((response) => {
      setCart(response.data);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} products={products} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders cart={cart} />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
