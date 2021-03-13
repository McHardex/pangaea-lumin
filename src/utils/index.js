const storeCartDataInLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

export const findProductIndexInCart = (cart, productId) =>
  cart.findIndex((cart) => cart.id === productId);

export const checkProductExistsInCart = (cartItems, product) => {
  if (cartItems.length) {
    const productIsInCart = cartItems.find((cart) => cart.id === product.id);
    if (productIsInCart) return true;
    return false;
  }
  return false;
};

export const addProductToCart = (cartItems, product, updatedProducts) => {
  const productIsInTheCart = checkProductExistsInCart(cartItems, product);
  if (productIsInTheCart) {
    const productIndexInCart = findProductIndexInCart(cartItems, product.id);
    cartItems[productIndexInCart].quantity++;
    return [...cartItems];
  } else {
    if (updatedProducts.length) {
      const updatedProductsToAdd = updatedProducts.find(
        (updatedProduct) => updatedProduct.id === product.id
      );
      const productToAdd = { ...updatedProductsToAdd, quantity: 1 };
      return cartItems.concat(productToAdd);
    } else {
      const productToAdd = { ...product, quantity: 1, itemRef: null };
      return cartItems.concat(productToAdd);
    }
  }
};

export const removeProductFromCart = (cartItems, productId) =>
  cartItems.filter((cart) => cart.id !== productId);

export const decrementCartQuantity = (cart, cartId) => {
  const cartIndex = findProductIndexInCart(cart, cartId);
  const cartItem = cart[cartIndex];
  if (cartItem.quantity === 1) {
    const cartRemainder = removeProductFromCart(cart, cartId);
    return { cart: cartRemainder, removedIndex: cartIndex };
  }
  cart[cartIndex].quantity--;
  return { cart, removedIndex: null };
};

const total = (cart) => {
  return cart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
};

export const calculateCartSubTotal = (state) => {
  const cartWithoutRefKey = state.cart.map((product) => ({
    id: product.id,
    title: product.title,
    image_url: product.image_url,
    price: product.price,
    quantity: product.quantity,
    itemRef: null,
  }));
  const dataToStore = {
    ...state,
    cart: cartWithoutRefKey,
    cartSubTotal: total(state.cart),
  };

  storeCartDataInLocalStorage(dataToStore);
  return total(state.cart);
};

export const updateCartItemsPrice = (cart, products) => {
  cart.map((item, index) => {
    const cartItemInProducts = products.find((p) => p.id === item.id);
    cart[index].price = cartItemInProducts.price;
    return item;
  });
  return cart;
};
