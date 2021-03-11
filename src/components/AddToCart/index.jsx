import styles from './AddToCart.module.css';

const AddToCart = ({ handleClick }) => {
  return (
    <button className={styles.addToCart} onClick={handleClick} type="button">
      Add to Cart
    </button>
  );
};

export default AddToCart;
