/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

import * as types from "./types";

export const CartContext = createContext();

const defaultState = {
  cart: [],
  cartSubTotal: 0,
  showCart: false,
  currencies: [],
  updatedProducts: [],
  removedCartIndex: null,
  currency: "USD",
};

const cartDataFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : defaultState;

const initialState = {
  ...cartDataFromLocalStorage,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addProductToCart = (product) =>
    dispatch({ type: types.ADD_PRODUCT_TO_CART, product });

  const removeProductFromCart = (productId) =>
    dispatch({ type: types.REMOVE_PRODUCT_FROM_CART, productId });

  const increaseCartItem = (cartId) =>
    dispatch({ type: types.INCREASE_CART_ITEM, cartId });

  const decreaseCartItem = (cartId) =>
    dispatch({ type: types.DECREASE_CART_ITEM, cartId });

  const handleShowCart = () => {
    dispatch({ type: types.SHOW_CART });
  };

  const hideCart = () => dispatch({ type: types.HIDE_CART });

  const addCurrenciesToCartContext = (currencies) => {
    dispatch({ type: types.GET_CURRENCIES, currencies });
  };

  const updateCartPrice = (products) => {
    dispatch({ type: types.UPDATE_CART_PRICE, products });
  };

  const handleCurrencyChange = (currency) => {
    dispatch({ type: types.CURRENCY_CHANGE, currency });
  };

  const contextHandlers = {
    addProductToCart,
    removeProductFromCart,
    increaseCartItem,
    decreaseCartItem,
    handleShowCart,
    hideCart,
    addCurrenciesToCartContext,
    updateCartPrice,
    handleCurrencyChange,
    ...state,
  };

  return (
    <CartContext.Provider value={contextHandlers}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
