import { products } from './product.js';
import { addToCart, removeCartItem, increaseQuantity, decreaseQuantity, calculateTotalAmount, clearCart, getCartItems } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  const productElements = document.querySelectorAll('.product');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountElement = document.getElementById('total-amount');
  const clearCartButton = document.getElementById('clear-cart');

  productElements.forEach((productElement, index) => {
    const productName = productElement.querySelector('.product-name').textContent;
    const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.slice(1));

    const addToCartButton = productElement.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
      const quantity = parseInt(prompt('Enter the quantity:', '1'), 10) || 1;

      addToCart(products[index], quantity);
      displayCartItems();
    });
  });

  function displayCartItems() {
    cartItemsContainer.innerHTML = '';

    getCartItems().forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <p>${item.product.name} x ${item.quantity}</p>
        <p>$${item.product.price}</p>
        <button class="increase-quantity">+</button>
        <button class="decrease-quantity">-</button>
        <button class="remove-item">Remove</button>
      `;

      const increaseQuantityButton = itemElement.querySelector('.increase-quantity');
      increaseQuantityButton.addEventListener('click', () => {
        increaseQuantity(item);
        displayCartItems();
      });

      const decreaseQuantityButton = itemElement.querySelector('.decrease-quantity');
      decreaseQuantityButton.addEventListener('click', () => {
        decreaseQuantity(item);
        displayCartItems();
      });

      const removeItemButton = itemElement.querySelector('.remove-item');
      removeItemButton.addEventListener('click', () => {
        removeCartItem(item);
        displayCartItems();
      });

      cartItemsContainer.appendChild(itemElement);
    });

    const totalAmount = calculateTotalAmount();
    totalAmountElement.textContent = `Total: $${totalAmount}`;
  }

  clearCartButton.addEventListener('click', () => {
    clearCart();
    displayCartItems();
  });
});
