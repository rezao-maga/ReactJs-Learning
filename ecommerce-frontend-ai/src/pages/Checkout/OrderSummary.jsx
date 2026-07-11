import { DeliveryDate } from "./DeliveryDate.jsx";
import { CartItemDetails } from "./CartItemDetails.jsx";
export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />
              <CartItemDetails
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
                loadCart={loadCart}
              />
            </div>
          );
        })}
    </div>
  );
}
