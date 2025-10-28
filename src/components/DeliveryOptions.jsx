import React from "react";
import { formatMoney } from "../utils/money";
import dayjs from "dayjs";
import axios from "axios";
export const DeliveryOptions = ({ deliveryOptions, item, loadCart }) => {
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((deliveryOption) => {
          let deliveryPrice = "Free shipping";
          if (deliveryOption.priceCents > 0) {
            deliveryPrice = `${formatMoney(
              deliveryOption.priceCents
            )}-shipping`;
          }

          const updateDeliveryOption = async () => {
            await axios.put(
              `http://localhost:3000/api/cart-items/${item.productId}`,
              {
                deliveryOptionId: deliveryOption.id,
              }
            );
            await loadCart();
          };

          return (
            <div
              key={deliveryOption.id}
              className="delivery-option"
              onClick={updateDeliveryOption}
            >
              <input
                type="radio"
                checked={deliveryOption.id === item.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${item.id}`}
                onChange={() => {}}
              />

              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd , MMMM D"
                  )}
                </div>
                <div className="delivery-option-price">{deliveryPrice}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
