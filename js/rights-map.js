document.addEventListener('DOMContentLoaded', function() {
    // Rights map elements
    const mapCategories = document.querySelectorAll('.map-category');
    const categoryDetails = document.querySelectorAll('.category-detail');
    
    // Handle category selection
    mapCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.getAttribute('data-category');
            showCategoryDetails(categoryName);
            
            // Visual feedback for selection
            mapCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            this.classList.add('active');
            
            // Announce selection to screen reader
            const categoryTitle = this.querySelector('h3').textContent;
            announceToScreenReader(`Selected: ${categoryTitle}`);
        });
        
        // Add keyboard navigation
        category.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Show details for selected category
    function showCategoryDetails(categoryName) {
        // Hide all details first
        categoryDetails.forEach(detail => {
            detail.classList.add('hidden');
        });
        
        // Show selected category details
        const targetDetail = document.getElementById(`${categoryName}-detail`);
        if (targetDetail) {
            targetDetail.classList.remove('hidden');
            
            // Scroll to details on mobile
            if (window.innerWidth < 768) {
                targetDetail.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Focus on the first interactive element in the details
            const firstInteractive = targetDetail.querySelector('a, button');
            if (firstInteractive) {
                firstInteractive.focus();
            }
        }
    }
    
    // Initialize with first category selected
    if (mapCategories.length > 0) {
        mapCategories[0].click();
    }
    
    // Optional: Add animation for map categories
    function animateMapCategories() {
        mapCategories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('animate-in');
            }, index * 150);
        });
    }
    
    // Start animations
    animateMapCategories();
    
    // Handle keyboard navigation between categories
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const activeCategory = document.querySelector('.map-category.active');
            const currentIndex = Array.from(mapCategories).indexOf(activeCategory);
            
            let nextIndex;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % mapCategories.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                nextIndex = (currentIndex - 1 + mapCategories.length) % mapCategories.length;
            }
            
            mapCategories[nextIndex].focus();
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const activeCategory = document.querySelector('.map-category.active');
            if (activeCategory) {
                const categoryName = activeCategory.getAttribute('data-category');
                showCategoryDetails(categoryName);
            }
        }, 250);
    });
    
    // Add ARIA attributes for accessibility
    mapCategories.forEach(category => {
        category.setAttribute('role', 'button');
        category.setAttribute('tabindex', '0');
        category.setAttribute('aria-expanded', 'false');
        
        const categoryName = category.getAttribute('data-category');
        const detail = document.getElementById(`${categoryName}-detail`);
        if (detail) {
            category.setAttribute('aria-controls', `${categoryName}-detail`);
        }
    });
    
    // Update ARIA expanded state when category is selected
    mapCategories.forEach(category => {
        category.addEventListener('click', function() {
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
}); 