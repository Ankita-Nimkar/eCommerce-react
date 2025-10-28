import { ItemQuantityInput } from "./ItemQuantityInput";
import { CartItemsDetail } from "./CartItemsDetail";
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

          return (
            <CartItemsDetail
              key={item.id}
              selectedDeliveryOption={selectedDeliveryOption}
              loadCart={loadCart}
              item={item}
              deliveryOptions={deliveryOptions}
            />
          );
        })}
    </div>
  );
};
