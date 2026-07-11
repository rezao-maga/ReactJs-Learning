import { formatMoney } from "../../utils/money.js";
import { DeliveryOption } from "./DeliveryOption.jsx";
import { useState } from "react";
import axios from "axios";

export function CartItemDetails({ loadCart, cartItem, deliveryOptions }) {
  const [label, setLabel] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (label) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setLabel(false);
    } else {
      setLabel(true);
    }
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  function quantityLabel(event) {
    setQuantity(event.target.value);
  }

  return (
    <>
      <div className="cart-item-details-grid">
        <img className="product-image" src={`/${cartItem.product.image}`} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:
              {label ? (
                <input
                  type="text"
                  value={quantity}
                  onChange={quantityLabel}
                  className="quantity-textbox"
                />
              ) : (
                <span className="quantity-label">{cartItem.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateQuantity}
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

        <DeliveryOption
          loadCart={loadCart}
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
        />
      </div>
    </>
  );
}
