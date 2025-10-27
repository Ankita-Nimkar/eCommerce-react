import React from "react";
import { useState, useEffect } from "react";
import "./orders.css";
import axios from "axios";
import Header from "../components/Header";
import { formatMoney } from "../utils/money";
import dayjs from "dayjs";
const Orders = ({ cart }) => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders?expand=products")
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  return (
    <div>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders &&
            orders.map((order) => {
              return (
                <div key={order.id} className="order-container">
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{formatMoney(order.totalCostCents)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>

                  {order.products.map((orderProd) => {
                    console.log(orderProd);
                    return (
                      <div
                        key={orderProd.productId}
                        className="order-details-grid"
                      >
                        <div className="product-image-container">
                          <img src={orderProd.product.image} />
                        </div>
                        <div className="product-details">
                          <div className="product-name">
                            {orderProd.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:
                            {dayjs(order.estimatedDeliveryTimeMs).format(
                              "MMMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProd.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
