import { useContext } from "react";
import CartCard from "components/CartCard";
import CartFooter from "components/CartFooter";
import { CartContext } from "components/contextAPI/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <div className={styles.cartWrapper}>
      {cart.length > 0 &&
        cart.map((cart) => (
          <div className={styles.cartCardWrapper}>
            <CartCard cart={cart} />
          </div>
        ))}
      <CartFooter />
    </div>
  );
};

export default Cart;
