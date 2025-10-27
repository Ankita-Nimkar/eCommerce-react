import Header from "../components/Header";
import { useState, useEffect } from "react";
import "./homepage.css";

import axios from "axios";
import { Products } from "../components/Products";
const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      <Header cart={cart} loadCart={loadCart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((prod) => {
            return <Products key={prod.id} prod={prod} loadCart={loadCart} />;
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
