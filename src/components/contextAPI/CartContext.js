/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, useState } from "react";
import { CartReducer } from "./CartReducer";
import * as types from "./types";

export const CartContext = createContext();

const initialState = {
  cart: [],
  cartSubTotal: 0,
  checkout: false,
  showCart: false,
  currencies: [],
  updatedProducts: [],
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const [currency, setCurrency] = useState("USD");

  const addProductToCart = (product) =>
    dispatch({ type: types.ADD_PRODUCT_TO_CART, product });

  const removeProductFromCart = (productId) =>
    dispatch({ type: types.REMOVE_PRODUCT_FROM_CART, productId });

  const increaseCartItem = (cartId) =>
    dispatch({ type: types.INCREASE_CART_ITEM, cartId });

  const decreaseCartItem = (cartId) =>
    dispatch({ type: types.DECREASE_CART_ITEM, cartId });

  const hideCart = () => dispatch({ type: types.HIDE_CART });

  const addCurrenciesToCartContext = (currencies) => {
    dispatch({ type: types.GET_CURRENCIES, currencies });
  };

  const updateCartPrice = (products) => {
    dispatch({ type: types.UPDATE_CART_PRICE, products });
  };

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
  };

  const contextHandlers = {
    addProductToCart,
    removeProductFromCart,
    increaseCartItem,
    decreaseCartItem,
    hideCart,
    addCurrenciesToCartContext,
    updateCartPrice,
    handleCurrencyChange,
    currency,
    ...state,
  };

  return (
    <CartContext.Provider value={contextHandlers}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
