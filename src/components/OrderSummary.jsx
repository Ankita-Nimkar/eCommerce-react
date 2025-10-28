import React from "react";
import dayjs from "dayjs";
import { DeliveryOptions } from "../components/DeliveryOptions";
import { formatMoney } from "../utils/money";
import axios from "axios";
export const OrderSummary = ({ deliveryOptions, cart, loadCart }) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((item) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === item.deliveryOptionId;
            }
          );

          const deleteCartItem = async () => {
            await axios.delete(
              `http://localhost:3000/api/cart-items/${item.productId}`,
              {
                productId: item.id,
              }
            );
            await loadCart();
          };

          return (
            <div className="cart-item-container" key={item.id}>
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd , MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={item.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">
                    {formatMoney(item.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  item={item}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
