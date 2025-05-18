/**
 * SendMe - Main JavaScript File
 * Handles core functionality and component loading
 */

// Component loader function
function loadComponent(componentId, path) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            document.getElementById(componentId).innerHTML = html;
            // Initialize any component-specific JS after load
            if (componentId === 'header-component') initHeader();
            if (componentId === 'order-panel-component') initOrderPanel();
        })
        .catch(err => console.error(`Error loading ${componentId}:`, err));
}

// Header specific functionality
function initHeader() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuToggle.querySelector('svg').classList.toggle('rotate-180');
        });
    }
    
    // Active nav link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Order panel functionality
function initOrderPanel() {
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Calculate price (simulated)
            const price = calculatePrice();
            document.getElementById('estimated-price').textContent = `KES ${price}`;
            document.getElementById('payment-section').classList.remove('hidden');
            
            // Show appropriate payment method
            const paymentMethod = document.getElementById('payment-method').value;
            document.querySelectorAll('[id$="-payment"]').forEach(el => el.classList.add('hidden'));
            document.getElementById(`${paymentMethod}-payment`).classList.remove('hidden');
        });
    }
    
    // M-Pesa payment handler
    const mpesaBtn = document.getElementById('initiate-mpesa');
    if (mpesaBtn) {
        mpesaBtn.addEventListener('click', function() {
            const phone = prompt('Enter your M-Pesa phone number:');
            if (phone) {
                initiateMpesaPayment(
                    document.getElementById('estimated-price').textContent.replace(/\D/g,''),
                    phone,
                    function(response) {
                        alert(response.message);
                        if (response.success) {
                            // Redirect or show success message
                        }
                    }
                );
            }
        });
    }
}

// Price calculation (simplified)
function calculatePrice() {
    const packageType = document.getElementById('package-type').value;
    const prices = {
        'document': 150,
        'small': 300,
        'medium': 500,
        'large': 800
    };
    return prices[packageType] || 300;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponent('header-component', '/components/header.html');
    loadComponent('footer-component', '/components/footer.html');
    loadComponent('order-panel-component', '/components/order-panel.html');
    
    // Initialize other functionality
    if (typeof initMap === 'function') initMap();
    if (typeof initializeAuth === 'function') initializeAuth();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
  