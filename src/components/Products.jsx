import React from "react";
import { formatMoney } from "../utils/money";
import axios from "axios";
import { useState } from "react";
export const Products = ({ prod, loadCart }) => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const addToCart = async () => {
    await axios.post("http://localhost:3000/api/cart-items", {
      productId: prod.id,
      quantity: selectedValue,
    });
    await loadCart();

    setIsBtnClicked(true);
    // Hide the element after 2 seconds (2000 milliseconds)
    setTimeout(() => {
      setIsBtnClicked(false);
    }, 1000);
  };
  return (
    <div key={prod.id} className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={prod.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{prod.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${prod.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {prod.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(prod.priceCents)}</div>

      <div
        className="product-quantity-container"
        value={selectedValue}
        onChange={(event) => {
          setSelectedValue(Number(event.target.value));
        }}
      >
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={isBtnClicked ? "addText" : "added-to-cart"}>
        <img src="images/icons/checkmark.png" width="20px" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};
