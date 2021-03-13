/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartCard from "components/CartCard";
import CartFooter from "components/CartFooter";
import { CartContext } from "contextAPI/CartContext";
import Modal from "components/Modal";
import Select from "react-select";
import Button from "components/Button";
import Loader from "components/Loader";

import { CSSTransition } from "react-transition-group";

import { ChevronLeft } from "react-feather";
import { ShoppingCart } from "react-feather";
import { ReactComponent as EmptyCart } from "assets/images/undraw_empty_cart.svg";

import styles from "./Cart.module.css";
import "./transition.css";

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
    showCart,
    removedCartIndex,
  } = useContext(CartContext);

  const [updatingPrice, setUpdatingPrice] = useState(false);
  const [priceUpdateFailed, setPriceUpdateFailed] = useState(false);

  const handleChange = async (e) => {
    setUpdatingPrice(true);
    const response = await fetchProducts(e.value);
    if (!response.data.errors) {
      updateCartPrice(response.data.data ? response.data.data.products : []);
      handleCurrencyChange(e.value);
      setPriceUpdateFailed(false);
      setUpdatingPrice(false);
    } else {
      handleCurrencyChange("");
      setUpdatingPrice(false);
      setPriceUpdateFailed(true);
    }
  };

  useEffect(() => {
    if (cart.length) {
      if (removedCartIndex !== null && cart[removedCartIndex]) {
        cart[removedCartIndex].itemRef.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        if (cart[cart.length - 1].itemRef) {
          cart[cart.length - 1].itemRef.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    }
  }, [cart.length]);

  return (
    <CSSTransition
      in={showCart}
      timeout={300}
      classNames="modalTransition"
      unmountOnExit={true}
    >
      <Modal>
        {updatingPrice && (
          <Loader
            size={40}
            loading={updatingPrice}
            loaderMessage="Updating cart prices..."
            variant="secondary"
            background="#f2f3f0"
          />
        )}
        <div className={styles.cartWrapper}>
          <div className={styles.cartHeader}>
            <button onClick={() => hideCart()}>
              <ChevronLeft />
            </button>
            <h3>Your Cart</h3>
            <div className={styles.cartCount}>
              <span>{cart.length}</span>
              <ShoppingCart size={15} />
            </div>
          </div>
          {cart.length ? (
            <>
              <div className={styles.curencyDropdown}>
                <Select
                  options={currencies}
                  defaultInputValue={currency}
                  defaultValue={currency}
                  onChange={handleChange}
                />
              </div>
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
            </>
          ) : (
            <div className={styles.emptyCart}>
              <EmptyCart width="100%" height="80%" title="" />
              <Button
                btnText="VIEW ALL PRODUCTS"
                handleClick={() => hideCart()}
              />
            </div>
          )}
          <div className={styles.cartFooterWrapper}>
            <CartFooter total={cartSubTotal} currency={currency} />
          </div>
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default Cart;
