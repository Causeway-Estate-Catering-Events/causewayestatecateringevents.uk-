// Header and footer content directly embedded
const headerContent = `
<!-- Main navigation -->
<nav class="navbar" role="navigation" aria-label="Main navigation">
    <a href="index.html" data-page="index" aria-label="Home">Home</a>
    <a href="about.html" data-page="about" aria-label="About">About</a>
    <a href="catering.html" data-page="catering" aria-label="Catering">Catering</a>
    <a href="events.html" data-page="events" aria-label="Events">Events</a>
    <a href="contact.html" data-page="contact" aria-label="Contact">Contact</a>
</nav>
`;

const footerContent = `
<!-- Contact section with location, opening times, and contact details -->
<section class="contact-section">
    <div class="location">
        <h3>LOCATION</h3>
        <p>Herefordshire Golf Club</p>
        <p>The Causeway</p>
        <p>Hereford</p>
        <p>HR1 1DF</p>
    </div>
    
    <div class="opening-times">
        <h3>OPENING TIMES</h3>
        <p>Monday: 10am – 4pm</p>
        <p>Tuesday: 10am – 4pm</p>
        <p>Wednesday: 10am – 4pm</p>
        <p>Thursday: 10am – 4pm</p>
        <p>Friday: 10am – 4pm</p>
        <p>Saturday: 10am – 4pm</p>
        <p>Sunday: 10am – 4pm</p>
    </div>
    
    <div class="contact-details">
        <h3>CONTACT</h3>
        <p>Phone: 01432 265 000</p>
        <p>Email: <a href="mailto:elaijah@causewayestate.com">elaijah@causewayestate.com</a></p>
        <div class="socials">
            <h4>SOCIALS</h4>
            <div class="social-links">
                <a href="https://facebook.com/TheCausewayRestaurant" target="_blank" rel="noopener noreferrer">
                    <img src="images/facebook-icon.png" alt="Follow us on Facebook">
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="images/instagram-icon.png" alt="Follow us on Instagram">
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Copyright footer -->
<footer>
    <div class="copyright">
        <p>&copy; 2024 Causeway Cafe & Bar. All rights reserved.</p>
    </div>
</footer>
`;

// Function to include HTML components and set active navigation
document.addEventListener('DOMContentLoaded', () => {
    // Insert header where needed
    const headerElements = document.querySelectorAll('[include-html="components/header.html"]');
    headerElements.forEach(element => {
        element.innerHTML = headerContent;
    });
    
    // Insert footer where needed
    const footerElements = document.querySelectorAll('[include-html="components/footer.html"]');
    footerElements.forEach(element => {
        element.innerHTML = footerContent;
    });
    
    // Set active navigation link if header exists
    if (headerElements.length > 0) {
        setActiveNavLink();
    }
});

// Function to set the active navigation link
function setActiveNavLink() {
    // Get the current page name from the URL
    const path = window.location.pathname;
    const currentPage = path.split('/').pop().replace('.html', '') || 'index';
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Add active class to the current page link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
} 