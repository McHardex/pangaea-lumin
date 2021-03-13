import { ShoppingCart } from "react-feather";
import styles from "./CartCount.module.css";

const CartCount = ({ cart }) => {
  return (
    <div className={styles.cartCount}>
      <span>{cart.length}</span>
      <ShoppingCart size={15} />
    </div>
  );
};

export default CartCount;
