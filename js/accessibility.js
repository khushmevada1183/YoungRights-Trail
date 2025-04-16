document.addEventListener('DOMContentLoaded', function() {
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize screen reader enhancements
    initScreenReaderEnhancements();
    
    // Initialize focus management
    initFocusManagement();
});

// Keyboard navigation
function initKeyboardNavigation() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Tab key navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Screen reader enhancements
function initScreenReaderEnhancements() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent);
        }
    });
    
    // Add ARIA roles to landmarks
    const main = document.querySelector('main');
    if (main) {
        main.setAttribute('role', 'main');
    }
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
    }
    
    // Add ARIA live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
}

// Focus management
function initFocusManagement() {
    // Trap focus in modal dialogs
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    });
    
    // Manage focus for dynamic content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                const newContent = mutation.addedNodes[0];
                if (newContent.nodeType === 1) { // Element node
                    const focusable = newContent.querySelector(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusable) {
                        focusable.focus();
                    }
                }
            }
        });
    });
    
    // Observe the main content area
    const mainContent = document.querySelector('main');
    if (mainContent) {
        observer.observe(mainContent, {
            childList: true,
            subtree: true
        });
    }
}

// Announce changes to screen readers
function announceToScreenReader(message) {
    const liveRegion = document.querySelector('.sr-only');
    if (liveRegion) {
        liveRegion.textContent = message;
    }
}

// Handle focus for interactive elements
function handleFocus(element) {
    element.setAttribute('tabindex', '0');
    element.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    element.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
}

// Initialize focus handling for interactive elements
document.querySelectorAll('button, a, input, select, textarea').forEach(handleFocus); 