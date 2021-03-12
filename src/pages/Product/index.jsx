import ProductCard from "components/ProductCard";
import styles from "./Product.module.css";

const Product = ({ products }) => {
  return (
    <div className={styles.productContainer}>
      <h1>All Products</h1>
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
