import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import * as types from "./types";

export const CartContext = createContext();

const initialState = {
  cart: [],
  cartSubTotal: 0,
  checkout: false,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  // console.log(state, "state");

  const addProductToCart = (product) =>
    dispatch({ type: types.ADD_PRODUCT_TO_CART, product });

  const removeProductFromCart = (product) =>
    dispatch({ type: types.REMOVE_PRODUCT_FROM_CART, product });

  const increaseCartItem = (productId) =>
    dispatch({ type: types.INCREASE_CART_ITEM, productId });

  const decreaseCartItem = (productId) =>
    dispatch({ type: types.DECREASE_CART_ITEM, productId });

  const contextHandlers = {
    addProductToCart,
    removeProductFromCart,
    increaseCartItem,
    decreaseCartItem,
    ...state,
  };

  return (
    <CartContext.Provider value={contextHandlers}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
