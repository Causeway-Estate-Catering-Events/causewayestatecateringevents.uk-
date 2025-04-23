/**
 * Main JavaScript file for The Causeway Cafe & Bar website
 * Optimized for performance
 */

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components that exist on the current page
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
    
    // Initialize smooth scroll for all pages
    initSmoothScroll();
});

/**
 * Contact Form Handling
 * Manages form submission, validation and sanitization
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Generate CSRF token more efficiently
    const csrfInput = document.querySelector('input[name="csrf_token"]');
    if (csrfInput) {
        csrfInput.value = Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Direct field validation for better performance
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();

        // Name validation
        if (name.length < 2 || !/^[A-Za-z\s]+$/.test(name)) {
            showMessage('Please enter a valid name', 'error');
            return;
        }

        // Email validation with simpler regex for better performance
        if (!/\S+@\S+\.\S+/.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Message validation
        if (message.length < 10) {
            showMessage('Please enter a message (minimum 10 characters)', 'error');
            return;
        }

        try {
            // Get form data directly
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Sanitize all input data with a more efficient approach
            Object.keys(data).forEach(key => {
                if (typeof data[key] === 'string') {
                    data[key] = String(data[key])
                        .replace(/[<>&"'/]/g, char => {
                            const map = {
                                '<': '&lt;',
                                '>': '&gt;',
                                '&': '&amp;',
                                '"': '&quot;',
                                "'": '&#x27;',
                                '/': '&#x2F;'
                            };
                            return map[char] || char;
                        });
                }
            });

            // Log sanitized data (would be sent to server in production)
            console.log('Form data:', data);
            
            // Show success and reset
            showMessage('Thank you for your message. We will get back to you soon!', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('There was an error submitting the form. Please try again.', 'error');
        }
    });
}

/**
 * Show Message to User
 * @param {string} message - The message to show
 * @param {string} type - The type of message ('success' or 'error')
 */
function showMessage(message, type) {
    // Remove existing messages first
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Remove message after 5 seconds
    requestAnimationFrame(() => {
        setTimeout(() => messageDiv.remove(), 5000);
    });
}

/**
 * Smooth Scrolling
 * Using event delegation for better performance
 */
function initSmoothScroll() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Also handle mobile menu toggle if needed
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
}

// Mobile Navigation Menu Toggle (if needed)
const navLinks = document.querySelector('.navbar');
if (navLinks) {
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            // Close mobile menu if it's open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
} 