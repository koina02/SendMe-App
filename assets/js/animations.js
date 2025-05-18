/**
 * SendMe - Animation Management
 * Handles scroll animations and interactive elements
 */

// Initialize scroll animations
function initScrollAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= 0);
            
            if (isVisible) {
                const animation = el.getAttribute('data-animate');
                el.classList.add(animation);
                el.removeAttribute('data-animate');
            }
        });
    };

    // Initial check and event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

// Hover animations for interactive elements
function initHoverAnimations() {
    // Button hover effects
    document.querySelectorAll('.btn-hover').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('scale-105', 'shadow-lg');
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('scale-105', 'shadow-lg');
        });
    });
    
    // Card hover effects
    document.querySelectorAll('.hover-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('shadow-xl', 'border-accent');
            card.querySelector('.card-content').classList.add('translate-y-[-5px]');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shadow-xl', 'border-accent');
            card.querySelector('.card-content').classList.remove('translate-y-[-5px]');
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverAnimations();
});