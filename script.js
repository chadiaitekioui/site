/**
 * ============================================
 * PORTFOLIO MAIN SCRIPT
 * ============================================
 * Handles navigation, scrolling, mobile menu
 * and user interactions
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');

// ============================================
// MENU MOBILE - OUVERTURE/FERMETURE
// ============================================

/**
 * Shows the mobile menu
 */
function showMenu() {
    navMenu.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevents body scroll
}

/**
 * Hides the mobile menu
 */
function hideMenu() {
    navMenu.classList.remove('show');
    document.body.style.overflow = ''; // Re-enables scroll
}

// Event listeners pour le toggle du menu
if (navToggle) {
    navToggle.addEventListener('click', showMenu);
}

if (navClose) {
    navClose.addEventListener('click', hideMenu);
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hideMenu();
    });
});

// ============================================
// NAVIGATION ACTIVE AU SCROLL
// ============================================

/**
 * Updates the active navigation link based on the visible section
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; // Offset for fixed header
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Listen to scroll to update active navigation
window.addEventListener('scroll', updateActiveNav);

// ============================================
// HEADER FIXE AVEC OMBRE AU SCROLL
// ============================================

/**
 * Adds shadow to header when scrolling
 */
function handleHeaderScroll() {
    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ============================================
// SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
// ============================================

/**
 * Handles smooth scroll for all anchor links
 */
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Check if it's an anchor link
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// ============================================

/**
 * Handles contact form submission
 */
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate submission (to be replaced with actual backend functionality)
        console.log('Form submitted:', { name, email, message });
        
        // Show confirmation message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// ============================================
// ANIMATION AU SCROLL (OPTIONNEL)
// ============================================

/**
 * Adds fade-in animation to elements on scroll
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.project__card, .about__content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize styles for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.project__card, .about__content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation on load
    animateOnScroll();
});

// Listen to scroll for animations
window.addEventListener('scroll', animateOnScroll);

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================

/**
 * Initialization function called on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');
    
    // Update active navigation on load
    updateActiveNav();
    
    // Handle initial header state
    handleHeaderScroll();
});

