import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import * as types from "./types";

export const CartContext = createContext();

const initialState = {
  cart: [],
  cartSubTotal: 0,
  checkout: false,
  showCart: false,
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

  const hideCart = () => dispatch({ type: types.HIDE_CART });

  const contextHandlers = {
    addProductToCart,
    removeProductFromCart,
    increaseCartItem,
    decreaseCartItem,
    hideCart,
    ...state,
  };

  return (
    <CartContext.Provider value={contextHandlers}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
