import { useContext } from "react";
import CartCount from "components/CartCount";
import ProductCard from "components/ProductCard";
import { CartContext } from "contextAPI/CartContext";

import styles from "./Product.module.css";

const Product = ({ products }) => {
  const { cart, handleShowCart } = useContext(CartContext);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productHeader}>
        <h1>All Products</h1>
        <button type="button" onClick={() => handleShowCart()}>
          <CartCount cart={cart} />
        </button>
      </div>
      <div className={styles.product}>
        {products &&
          products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
