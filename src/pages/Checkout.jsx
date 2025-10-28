import React from "react";
import { useState, useEffect } from "react";
import "./checkout/checkout-header.css";
import "./checkout/checkout.css";

import axios from "axios";

import { CheckoutHeader } from "../components/CheckoutHeader";
import { OrderSummary } from "../components/OrderSummary";
import { PaymentSummary } from "../components/PaymentSummary";

const Checkout = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime"
      )
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
      console.log(paymentSummary);
    });
  }, [cart]);

  let totalItemsCart = 0;
  cart.filter((q) => (totalItemsCart = totalItemsCart + q.quantity));

  return (
    <>
      <CheckoutHeader totalItemsCart={totalItemsCart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />

          {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}
        </div>
      </div>
    </>
  );
};

export default Checkout;
