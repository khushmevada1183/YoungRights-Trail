document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize accessibility controls
    initAccessibilityControls();
    
    // Initialize animations
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Accessibility controls
function initAccessibilityControls() {
    // Create accessibility controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'accessibility-controls';
    
    // Font size controls
    const fontControls = document.createElement('div');
    fontControls.className = 'font-controls';
    
    const increaseFont = document.createElement('button');
    increaseFont.textContent = 'A+';
    increaseFont.addEventListener('click', () => changeFontSize(10));
    
    const decreaseFont = document.createElement('button');
    decreaseFont.textContent = 'A-';
    decreaseFont.addEventListener('click', () => changeFontSize(-10));
    
    const resetFont = document.createElement('button');
    resetFont.textContent = 'Reset';
    resetFont.addEventListener('click', () => resetFontSize());
    
    fontControls.appendChild(decreaseFont);
    fontControls.appendChild(resetFont);
    fontControls.appendChild(increaseFont);
    
    // Contrast toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.className = 'contrast-toggle';
    contrastToggle.textContent = 'High Contrast';
    contrastToggle.addEventListener('click', toggleContrast);
    
    // Add controls to container
    controlsContainer.appendChild(fontControls);
    controlsContainer.appendChild(contrastToggle);
    
    // Add container to body
    document.body.appendChild(controlsContainer);
}

// Font size control functions
function changeFontSize(delta) {
    const currentSize = parseInt(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.max(12, Math.min(24, currentSize + delta));
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize);
}

function resetFontSize() {
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('fontSize');
}

// Contrast toggle function
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
}

// Animation initialization
function initAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .hero').forEach(element => {
        observer.observe(element);
    });
}

// Load saved preferences
function loadPreferences() {
    // Load font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
    
    // Load contrast mode
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
        document.body.classList.add('high-contrast');
    }
}

// Initialize preferences on load
loadPreferences(); 