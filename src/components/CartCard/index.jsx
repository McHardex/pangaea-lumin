import { useContext } from "react";
import { CartContext } from "components/contextAPI/CartContext";

import styles from "./CartCard.module.css";

const CartCard = ({ cart }) => {
  const {
    removeProductFromCart,
    increaseCartItem,
    decreaseCartItem,
  } = useContext(CartContext);
  return (
    <div className={styles.cartCard}>
      <div className={styles.titleWrapper}>
        <span>{cart.title}</span>
        <div>
          <button onClick={() => decreaseCartItem(cart.id)}>-</button>
          <span>{cart.quantity}</span>
          <button onClick={() => increaseCartItem(cart.id)} type="button">
            +
          </button>
        </div>
      </div>

      <div className={styles.price}>${cart.quantity * cart.price}</div>

      <div className={styles.productImageWrapper}>
        <img src={cart.image_url} alt={cart.title} />
      </div>

      <button
        className={styles.removeCard}
        onClick={() => removeProductFromCart(cart.id)}
      >
        x
      </button>
    </div>
  );
};

export default CartCard;
