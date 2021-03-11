import * as types from "./types";

// const findProductIndexInCart = (cart, productId) =>
//   cart.findIndex((cart) => cart.id === productId);

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
  return { cart: [productToAdd, ...cartItems] };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_TO_CART:
      const updatedCart = addProductToCart(state.cart, action.product);
      return {
        ...state,
        ...updatedCart,
      };

    default:
      break;
  }
};
