import styles from "./CartCard.module.css";

const CartCard = ({ cart }) => {
  return (
    <div className={styles.cartCard}>
      <div className={styles.titleWrapper}>
        <span>{cart.title}</span>
        <div>
          <button>-</button>
          <span>{cart.quantity}</span>
          <button>+</button>
        </div>
      </div>

      <div className={styles.price}>${cart.price}</div>

      <div className={styles.productImageWrapper}>
        <img src={cart.image_url} alt={cart.title} />
      </div>

      <button className={styles.removeCard}>close</button>
    </div>
  );
};

export default CartCard;
