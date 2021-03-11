import Button from "components/Button";
import styles from "./CartFooter.module.css";

const CartFooter = () => {
  return (
    <>
      <hr />
      <div className={styles.cartTotal}>
        <label>Subtotal</label>
        <span>$61.00</span>
      </div>
      <div className={styles.btnMargin}>
        <Button
          btnText="MAKE THIS A SUBSCRIPTION (SAVE 20%)"
          width="100%"
          variant="secondary"
        />
      </div>
      <div className={styles.btnMargin}>
        <Button btnText="PROCEED TO CHECKOUT" width="100%" />
      </div>
    </>
  );
};

export default CartFooter;
