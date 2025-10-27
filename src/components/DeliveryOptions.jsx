import React from "react";
import { formatMoney } from "../utils/money";
import dayjs from "dayjs";

export const DeliveryOptions = ({ deliveryOptions, item }) => {
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
          return (
            <div key={deliveryOption.id} className="delivery-option">
              <input
                type="radio"
                checked={deliveryOption.id === item.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${deliveryOption.id}`}
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
