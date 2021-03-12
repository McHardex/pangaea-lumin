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
  if (productIsInTheCart) return cartItems;
  if (updatedProducts.length) {
    const updatedProductsToAdd = updatedProducts.find(
      (updatedProduct) => updatedProduct.id === product.id
    );
    const productToAdd = { ...updatedProductsToAdd, quantity: 1 };
    return cartItems.concat(productToAdd);
  } else {
    const productToAdd = { ...product, quantity: 1 };
    return cartItems.concat(productToAdd);
  }
};

export const removeProductFromCart = (cartItems, productId) =>
  cartItems.filter((cart) => cart.id !== productId);

export const decrementCartQuantity = (cart, cartId) => {
  const cartIndex = findProductIndexInCart(cart, cartId);
  const cartItem = cart[cartIndex];
  if (cartItem.quantity === 1) {
    const cartRemainder = removeProductFromCart(cart, cartId);
    return cartRemainder;
  }
  cart[cartIndex].quantity--;
  return cart;
};

export const calculateCartSubTotal = (cart) =>
  cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

export const updateCartItemsPrice = (cart, products) => {
  cart.map((item, index) => {
    const cartItemInProducts = products.find((p) => p.id === item.id);
    cart[index].price = cartItemInProducts.price;
    return item;
  });
  return cart;
};
