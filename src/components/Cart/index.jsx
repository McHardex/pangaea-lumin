import { useContext, useState } from "react";
import CartCard from "components/CartCard";
import CartFooter from "components/CartFooter";
import { CartContext } from "components/contextAPI/CartContext";
import Modal from "components/Modal";
import Select from "react-select";

import axios from "axios";

import styles from "./Cart.module.css";

const productQuery = `
    query product($currency: Currency) {
      products {
        id
        title
        image_url
        price(currency: $currency)
      }
    }
`;

const fetchProducts = (currency) => {
  return axios.post(
    process.env.REACT_APP_APOLLO_CLIENT_URL,
    {
      query: productQuery,
      variables: { currency: currency },
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

const Cart = () => {
  const {
    cart,
    hideCart,
    cartSubTotal,
    currencies,
    updateCartPrice,
    handleCurrencyChange,
    currency,
  } = useContext(CartContext);

  const [priceUpdateFailed, setPriceUpdateFailed] = useState(false);

  return (
    <>
      <Modal>
        <div className={styles.cartWrapper}>
          <div className={styles.cartHeader}>
            <button onClick={() => hideCart()}>+</button>
            <h3>Your Cart</h3>
          </div>

          <Select
            options={currencies}
            defaultInputValue={currency}
            defaultValue={currency}
            onChange={async (e) => {
              const response = await fetchProducts(e.value);
              if (!response.data.errors) {
                updateCartPrice(
                  response.data.data ? response.data.data.products : []
                );
                handleCurrencyChange(e.value);
                setPriceUpdateFailed(false);
              } else {
                handleCurrencyChange("");
                setPriceUpdateFailed(true);
              }
            }}
          />
          {priceUpdateFailed && (
            <span className={styles.priceUpdateError}>
              Opps! An error occured, unable to update price. Try another
              currency.
            </span>
          )}

          <div className={styles.cartBody}>
            {cart.length > 0 &&
              cart.map((cart) => (
                <div className={styles.cartCardWrapper} key={cart.id}>
                  <CartCard cart={cart} />
                </div>
              ))}
          </div>
          <div className={styles.cartFooterWrapper}>
            <CartFooter total={cartSubTotal} currency={currency} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
