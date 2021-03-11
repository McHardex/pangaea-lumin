import { useContext } from "react";
import CartCard from "components/CartCard";
import CartFooter from "components/CartFooter";
import { CartContext } from "components/contextAPI/CartContext";
import Modal from "components/Modal";

import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, hideCart } = useContext(CartContext);
  return (
    <>
      <Modal>
        <div className={styles.cartWrapper}>
          <div className={styles.cartHeader}>
            <button onClick={() => hideCart()}>+</button>
            <h3>Your Cart</h3>
          </div>
          <div className={styles.cartBody}>
            {cart.length > 0 &&
              cart.map((cart) => (
                <div className={styles.cartCardWrapper}>
                  <CartCard cart={cart} />
                </div>
              ))}
          </div>
          <div className={styles.cartFooterWrapper}>
            <CartFooter />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
