// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAccessibilityControls();
    initAnimations();
    updateCopyrightYear();
    initIntersectionObserver();
    initGSAPAnimations();
    initAOS();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    
    // Add mobile menu toggle
    document.querySelector('.main-nav').prepend(navToggle);
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        
        // Add keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Handle mobile menu toggle
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        document.querySelector('.nav-links').classList.toggle('active');
    });
}

// Accessibility controls
function initAccessibilityControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'accessibility-controls';
    controlsContainer.setAttribute('aria-label', 'Accessibility Controls');
    
    // Font size controls
    const fontControls = document.createElement('div');
    fontControls.className = 'font-controls';
    fontControls.setAttribute('role', 'group');
    fontControls.setAttribute('aria-label', 'Font size controls');
    
    const increaseFont = createButton('A+', 'Increase font size', () => changeFontSize(1));
    const decreaseFont = createButton('A-', 'Decrease font size', () => changeFontSize(-1));
    const resetFont = createButton('Reset', 'Reset font size', resetFontSize);
    
    fontControls.append(decreaseFont, resetFont, increaseFont);
    
    // Contrast toggle
    const contrastToggle = createButton(
        'High Contrast',
        'Toggle high contrast mode',
        toggleContrast,
        'contrast-toggle'
    );
    
    controlsContainer.append(fontControls, contrastToggle);
    document.body.appendChild(controlsContainer);
    loadPreferences();
}

// Helper function to create buttons
function createButton(text, ariaLabel, onClick, className = '') {
    const button = document.createElement('button');
    button.textContent = text;
    button.setAttribute('aria-label', ariaLabel);
    button.className = className;
    button.addEventListener('click', onClick);
    return button;
}

// Font size control functions
function changeFontSize(delta) {
    const root = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(root).fontSize);
    const newSize = Math.max(12, Math.min(24, currentSize + delta));
    
    root.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize);
    announceChange(`Font size ${delta > 0 ? 'increased' : 'decreased'} to ${newSize}px`);
}

function resetFontSize() {
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('fontSize');
    announceChange('Font size reset to default');
}

// Contrast toggle function
function toggleContrast() {
    const body = document.body;
    body.classList.toggle('high-contrast');
    const isHighContrast = body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
    announceChange(`High contrast mode ${isHighContrast ? 'enabled' : 'disabled'}`);
}

// Load saved preferences
function loadPreferences() {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedHighContrast = localStorage.getItem('highContrast');
    
    if (savedFontSize) {
        document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
    
    if (savedHighContrast === 'true') {
        document.body.classList.add('high-contrast');
    }
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}

// Announce changes for screen readers
function announceChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Handle errors gracefully
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
    // You could add error reporting service here
});

// Add service worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// Initialize AOS
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });
}

// Initialize GSAP animations
function initGSAPAnimations() {
    // Hero section animation
    gsap.from('.hero', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    // Feature cards animation
    gsap.from('.feature-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.features',
            start: 'top center',
            toggleActions: 'play none none reverse'
        }
    });

    // Logo animation
    gsap.from('.logo-image', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    // Navigation links animation
    gsap.from('.nav-link', {
        duration: 0.5,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
} 