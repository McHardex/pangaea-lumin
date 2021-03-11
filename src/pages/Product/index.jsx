import ProductCard from "components/ProductCard";
import styles from "./Product.module.css";

const Product = ({ products }) => {
  return (
    <div className={styles.product}>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
};

export default Product;
