import { useContext } from "react";
import Button from "components/Button";
import styles from "./ProductCard.module.css";
import { CartContext } from "contextAPI/CartContext";

const ProductCard = ({ product }) => {
  const { addProductToCart, handleShowCart } = useContext(
    CartContext
  );

  return (
    <div className={styles.productCard} id={product.id}>
      <img src={product.image_url} alt={product.title} />

      <p title={product.title}>{product.title}</p>
      <p>{`From $${product.price}`}</p>

      <Button
        handleClick={() => {
          addProductToCart(product);
          handleShowCart();
        }}
        btnText="Add to Cart"
        width="fit-content"
      />
    </div>
  );
};

export default ProductCard;
