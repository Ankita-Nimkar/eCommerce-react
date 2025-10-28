import { React, useState, useRef } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../utils/money";
import { DeliveryOptions } from "../components/DeliveryOptions";
export const CartItemsDetail = ({
  selectedDeliveryOption,
  item,

  loadCart,
  deliveryOptions,
}) => {
  const [showUpdateQInput, setShowUpdateQInput] = useState(false);

  const inputRef = useRef(null);
  const deleteCartItem = async () => {
    await axios.delete(
      `http://localhost:3000/api/cart-items/${item.productId}`,
      {
        productId: item.id,
      }
    );
    await loadCart();
  };

  const updateCartItemQuantity = async () => {
    setShowUpdateQInput(!showUpdateQInput);
    console.log(inputRef?.current?.value);
    if (inputRef.current) {
      await axios.put(
        `http://localhost:3000/api/cart-items/${item.productId}`,
        {
          quantity: Number(inputRef.current.value),
        }
      );
    }

    await loadCart();
  };
  return (
    <>
      <div className="cart-item-container" key={item.id}>
        <div className="delivery-date">
          Delivery date:
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
                {showUpdateQInput && (
                  <input
                    className="update-quantity-update-input"
                    type="text"
                    ref={inputRef}
                  />
                )}
                {!showUpdateQInput && (
                  <span className="quantity-label">{item.quantity}</span>
                )}
              </span>

              <span
                className="update-quantity-link link-primary"
                onClick={updateCartItemQuantity}
              >
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
    </>
  );
};
