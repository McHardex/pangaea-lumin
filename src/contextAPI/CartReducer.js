import * as types from "./types";
import {
  addProductToCart,
  calculateCartSubTotal,
  removeProductFromCart,
  findProductIndexInCart,
  decrementCartQuantity,
  updateCartItemsPrice,
} from "utils";

const showCart = (isCartOpen) => {
  if (isCartOpen) return;
  return true;
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_TO_CART:
      const updatedCart = addProductToCart(
        state.cart,
        action.product,
        state.updatedProducts
      );
      return {
        ...state,
        cart: [...updatedCart],
        cartSubTotal: calculateCartSubTotal({
          ...state,
          cart: [...updatedCart],
          showCart: true,
        }),
        showCart: showCart(state.showCart),
        removedCartIndex: null,
      };
    case types.REMOVE_PRODUCT_FROM_CART:
      const filteredCart = removeProductFromCart(state.cart, action.productId);
      console.log(filteredCart, "ccc");
      const removedCartIndex = findProductIndexInCart(
        state.cart,
        action.productId
      );
      return {
        ...state,
        cart: filteredCart,
        removedCartIndex,
        cartSubTotal: calculateCartSubTotal({
          ...state,
          cart: filteredCart,
          removedCartIndex,
        }),
      };
    case types.INCREASE_CART_ITEM:
      state.cart[findProductIndexInCart(state.cart, action.cartId)].quantity++;
      return {
        ...state,
        cart: [...state.cart],
        cartSubTotal: calculateCartSubTotal(state),
      };
    case types.DECREASE_CART_ITEM:
      const cartItems = decrementCartQuantity(state.cart, action.cartId);
      return {
        ...state,
        cart: [...cartItems.cart],
        removedCartIndex: cartItems.removedIndex,
        cartSubTotal: calculateCartSubTotal({
          ...state,
          cart: [...cartItems.cart],
          removedCartIndex: cartItems.removedIndex,
        }),
      };
    case types.GET_CURRENCIES:
      const modifiedCurrencyList = action.currencies.map((currency) => ({
        label: currency,
        value: currency,
      }));

      return {
        ...state,
        currencies: modifiedCurrencyList,
      };
    case types.UPDATE_CART_PRICE:
      const updatedCartWithPrice = updateCartItemsPrice(
        state.cart,
        action.products
      );
      return {
        ...state,
        cart: [...updatedCartWithPrice],
        updatedProducts: [...action.products],
        cartSubTotal: calculateCartSubTotal(state),
      };
    case types.CURRENCY_CHANGE:
      return {
        ...state,
        currency: action.currency,
        cartSubTotal: calculateCartSubTotal({
          ...state,
          currency: action.currency,
        }),
      };
    case types.SHOW_CART:
      return {
        ...state,
        showCart: true,
      };
    case types.HIDE_CART:
      return {
        ...state,
        showCart: false,
        removedCartIndex: null,
        cartSubTotal: calculateCartSubTotal({
          ...state,
          showCart: false,
          removedCartIndex: null,
        }),
      };

    default:
      return state;
  }
};
