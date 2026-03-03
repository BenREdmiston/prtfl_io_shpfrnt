// --- 1. CONFIGURATION ---
let cartCount = 0;
const unitPrice = 19.99;

// DOM Elements
const mainBuyBtn = document.querySelector('.buy-button'); // The button on the landing page
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-cart');
const qtyDisplay = document.getElementById('qty-display');
const itemSubtotal = document.getElementById('item-subtotal');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const navCart = document.querySelector('.cart');

// --- 2. THE ADD TO CART FLOW ---
mainBuyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Increment cart
    if (cartCount === 0) cartCount = 1; 
    else cartCount++;

    // Trigger Success Animation on the button
    showSuccessState();
    
    // Update and Open Modal
    renderCart();
    setTimeout(() => {
        modal.style.display = "block";
    }, 600); // Small delay so they see the success animation first
});

// --- 3. QUANTITY LOGIC ---
// This function is called by the onclick attributes in your HTML buttons
window.changeQty = function(amount) {
    cartCount += amount;
    
    // Prevent negative numbers
    if (cartCount < 0) cartCount = 0;
    
    renderCart();
};

// --- 4. UI UPDATE ENGINE ---
function renderCart() {
    const total = (cartCount * unitPrice).toFixed(2);
    
    // Update Modal Numbers
    if(qtyDisplay) qtyDisplay.innerText = cartCount;
    if(itemSubtotal) itemSubtotal.innerText = `$${total}`;
    if(totalPriceEl) totalPriceEl.innerText = total;
    
    // Update Nav Bar
    navCart.innerText = `🛒 (${cartCount})`;

    // Handle Empty Cart State
    if (cartCount === 0) {
        checkoutBtn.innerText = "Cart is Empty";
        checkoutBtn.style.opacity = "0.5";
        checkoutBtn.style.pointerEvents = "none";
    } else {
        checkoutBtn.innerText = "Proceed to Checkout";
        checkoutBtn.style.opacity = "1";
        checkoutBtn.style.pointerEvents = "all";
    }
}

// --- 5. ANIMATIONS & MODAL TOGGLES ---
function showSuccessState() {
    const originalText = mainBuyBtn.innerText;
    mainBuyBtn.innerText = "✓ Added to Cart";
    mainBuyBtn.style.backgroundColor = "#059669"; // Success Green
    
    setTimeout(() => {
        mainBuyBtn.innerText = originalText;
        mainBuyBtn.style.backgroundColor = ""; // Resets to CSS default
    }, 1500);
}

// Close Modal logic
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Final Checkout Redirect
checkoutBtn.addEventListener('click', () => {
    // Replace with your real Stripe/LemonSqueezy link
    window.location.href = "https://buy.stripe.com/test_link";
});