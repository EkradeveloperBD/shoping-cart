let cart = [];

export function addToCart(product, quantity) {
  const existingCartItem = cart.find(item => item.product.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    const newItem = {
      product,
      quantity
    };
    cart.push(newItem);
  }
}

export function removeCartItem(cartItem) {
  const itemIndex = cart.findIndex(item => item.product.id === cartItem.product.id);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
}

export function increaseQuantity(cartItem) {
  cartItem.quantity += 1;
}

export function decreaseQuantity(cartItem) {
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  }
}

export function calculateTotalAmount() {
  return cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

export function clearCart() {
  cart = [];
}

export function getCartItems() {
  return cart;
}
