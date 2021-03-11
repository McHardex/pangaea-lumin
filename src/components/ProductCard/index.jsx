import { useContext } from "react";
import AddToCart from "components/AddToCart";
import styles from "./ProductCard.module.css";
import { CartContext } from "components/contextAPI/CartContext";

const ProductCard = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  return (
    <div className={styles.productCard} id={product.id}>
      <img src={product.image_url} alt={product.title} />

      <div className={styles.textWrapper}>
        <p>{product.title}</p>
        <p>{`From $${product.price}`}</p>
      </div>

      <AddToCart handleClick={() => addProductToCart(product)} />
    </div>
  );
};

export default ProductCard;
