function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = document.querySelector(".cart-count");

    cartIcon.addEventListener("click", () => {
        alert("Cart functionality coming soon!");
    });

    // Example of incrementing cart count
    function addToCart() {
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
    }
});






// Toggle the display of the quantity selector
function openQuantitySelector(productId) {
    const quantitySelector = document.getElementById(`quantity-selector-${productId}`);
    quantitySelector.style.display = 'block';
}

// Update the cart button based on the quantity input
function updateCartButton(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = quantityInput.value;
    const quantitySelector = document.getElementById(`quantity-selector-${productId}`);

    if (quantity == 0) {
        quantitySelector.style.display = 'none';
    }
}


// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        const existingProduct = cart.find(product => product.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${quantity} ${productName}(s) added to the cart.`);
        document.getElementById(`quantity-selector-${productId}`).style.display = 'none';
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

function buyNow(productId, productName, productPrice) {
    cart = [{ id: productId, name: productName, price: productPrice, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

function redirectToCheckout() {
    window.location.href = 'checkout.html';
}

// Checkout functionality
function proceedToPayment() {
    alert('Proceeding to payment...');
}

// Load cart items on checkout page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('checkout.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    updateCartCount();
});
