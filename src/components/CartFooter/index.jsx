import Button from "components/Button";
import styles from "./CartFooter.module.css";

const CartFooter = ({ total }) => {
  return (
    <div>
      <hr />
      <div className={styles.cartTotal}>
        <label>Subtotal</label>
        <span>${total}</span>
      </div>
      <div className={styles.btnMargin}>
        <Button
          btnText="MAKE THIS A SUBSCRIPTION (SAVE 20%)"
          width="100%"
          variant="secondary"
          disabled
        />
      </div>
      <div className={styles.btnMargin}>
        <Button btnText="PROCEED TO CHECKOUT" width="100%" disabled />
      </div>
    </div>
  );
};

export default CartFooter;
