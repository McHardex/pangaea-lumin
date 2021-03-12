import * as types from "./types";

const findProductIndexInCart = (cart, productId) =>
  cart.findIndex((cart) => cart.id === productId);

const checkProductExistsInCart = (cartItems, product) => {
  if (cartItems.length) {
    const productIsInCart = cartItems.find((cart) => cart.id === product.id);
    if (productIsInCart) return true;
    return false;
  }
  return false;
};

const addProductToCart = (cartItems, product) => {
  const productIsInTheCart = checkProductExistsInCart(cartItems, product);
  if (productIsInTheCart) return;
  const productToAdd = { ...product, quantity: 1 };
  return [productToAdd, ...cartItems];
};

const removeProductFromCart = (cartItems, productId) =>
  cartItems.filter((cart) => cart.id !== productId);

const decrementCartQuantity = (cart, cartId) => {
  const cartIndex = findProductIndexInCart(cart, cartId);
  const cartItem = cart[cartIndex];
  if (cartItem.quantity === 1) {
    const cartRemainder = removeProductFromCart(cart, cartId);
    return cartRemainder;
  }
  cart[cartIndex].quantity--;
  return cart;
};

const calculateCartSubTotal = (cart) =>
  cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

export const CartReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_TO_CART:
      const updatedCart = addProductToCart(state.cart, action.product);
      return {
        ...state,
        cart: updatedCart,
        cartSubTotal: calculateCartSubTotal(updatedCart),
        showCart: true,
      };
    case types.REMOVE_PRODUCT_FROM_CART:
      const filteredCart = removeProductFromCart(state.cart, action.productId);
      return {
        ...state,
        cart: filteredCart,
        cartSubTotal: calculateCartSubTotal(filteredCart),
      };
    case types.INCREASE_CART_ITEM:
      state.cart[findProductIndexInCart(state.cart, action.cartId)].quantity++;
      return {
        ...state,
        cart: [...state.cart],
        cartSubTotal: calculateCartSubTotal([...state.cart]),
      };
    case types.DECREASE_CART_ITEM:
      const cartItems = decrementCartQuantity(state.cart, action.cartId);
      return {
        ...state,
        cart: cartItems,
        cartSubTotal: calculateCartSubTotal(cartItems),
      };
    case types.HIDE_CART:
      return {
        ...state,
        showCart: false,
      };

    default:
      return state;
  }
};
