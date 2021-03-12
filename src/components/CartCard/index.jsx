import { useContext } from "react";
import { CartContext } from "components/contextAPI/CartContext";
import { X, Minus, Plus } from "react-feather";

import styles from "./CartCard.module.css";

const CartCard = ({ cart }) => {
  const {
    removeProductFromCart,
    increaseCartItem,
    decreaseCartItem,
    currency,
  } = useContext(CartContext);
  return (
    <div className={styles.cartCard}>
      <div className={styles.titleWrapper}>
        <span>{cart.title}</span>
        <div>
          <button onClick={() => decreaseCartItem(cart.id)}>
            <Minus size={10} />
          </button>
          <span>{cart.quantity}</span>
          <button onClick={() => increaseCartItem(cart.id)} type="button">
            <Plus size={10} />
          </button>
        </div>
      </div>

      <div className={styles.price}>
        {currency === "USD"
          ? `$${cart.quantity * cart.price}`
          : `${cart.quantity * cart.price} ${currency}`}
      </div>

      <div className={styles.productImageWrapper}>
        <img src={cart.image_url} alt={cart.title} />
      </div>

      <button
        className={styles.removeCard}
        onClick={() => removeProductFromCart(cart.id)}
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default CartCard;
