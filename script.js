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

// Add to cart functionality
function addToCart(productId, productName, productPrice) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        // Store the cart in localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(product => product.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart count
        updateCartCount();
        alert(`${quantity} ${productName}(s) added to the cart.`);

        // Hide the quantity selector after adding to cart
        const quantitySelector = document.getElementById(`quantity-selector-${productId}`);
        quantitySelector.style.display = 'none';
    }
}

// Update cart count based on the cart contents
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Initialize the cart count when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
