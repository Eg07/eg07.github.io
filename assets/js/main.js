// Main JavaScript file for portfolio - Optimized version

// Use strict mode for better error catching and performance
'use strict';

// Cache DOM elements when the content is loaded
let cachedElements = {};

// Enhanced loading screen with smooth transition
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Add a small delay to ensure content is rendered
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Add a class to body to trigger entrance animations
            document.body.classList.add('content-loaded');
            
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 500); // Reduced from 800ms to 500ms for faster loading
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Cache commonly used DOM elements
    cacheElements();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize scroll animations with IntersectionObserver
    initScrollAnimations();
    
    // Initialize tabs in about section
    initTabs();
    
    // Initialize skill bars with staggered animations
    initSkillBars();
    
    // Initialize project filters with smooth transitions
    initProjectFilters();
    
    // Initialize project modals with improved UX
    initProjectModals();
    
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Initialize typed.js with improved config
    initTypedText();
    
    // Add header scroll effect
    initHeaderScroll();
    
    // Initialize scroll to top button with smooth animation
    initScrollToTop();
    
    // Initialize language progress bars with intersection observer
    initLanguageProgressBars();
    
    // Add smooth hover effects to links
    initLinkHoverEffects();
    
    // Initialize image lazy loading and effects
    initImageEffects();
    
    // Fix viewport height for mobile browsers
    updateViewportHeight();
    window.addEventListener('resize', debounce(updateViewportHeight, 100));
});

// Cache DOM elements for better performance
function cacheElements() {
    const elements = [
        'header',
        '.nav-links',
        '.mobile-toggle',
        '.dark-mode-toggle',
        '.animate-on-scroll',
        '.tab-btn',
        '.tab-pane',
        '.filter-btn',
        '.project-card',
        '.project-details-btn'
    ];
    
    elements.forEach(selector => {
        const key = selector.replace(/[^a-zA-Z0-9]/g, '_');
        cachedElements[key] = document.querySelectorAll(selector);
    });
}

// Add header scroll effect with box-shadow transition - Performance optimized
function initHeaderScroll() {
    const header = cachedElements.header?.[0] || document.querySelector('.header');
    
    if (!header) return;
    
    let lastScrollY = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
}

// Mobile navigation with smooth transitions
function initMobileNav() {
    const mobileToggle = cachedElements.mobile_toggle?.[0] || document.querySelector('.mobile-toggle');
    const navLinks = cachedElements._nav_links?.[0] || document.querySelector('.nav-links');
    const body = document.body;
    
    if (!mobileToggle || !navLinks) return;
    
    // Create overlay if it doesn't exist
    if (!document.querySelector('.nav-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
    }
    
    const navOverlay = document.querySelector('.nav-overlay');
    
    // Toggle menu on click
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.classList.toggle('mobile-menu-open');
        
        // Toggle aria-expanded state for accessibility
        const expanded = navLinks.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', expanded);
        
        // Change icon based on state
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.className = expanded ? 'fas fa-times' : 'fas fa-bars';
        }
    });
    
    // Close menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Close menu when clicking on links
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });
}

// Enhanced dark mode toggle with smoother transitions
function initDarkModeToggle() {
    const darkModeToggle = cachedElements.dark_mode_toggle?.[0] || document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) return;
    
    // Check system preference, localStorage, and time of day
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 6 || currentHour > 18;
    
    // Determine initial theme state
    let shouldBeDark = false;
    
    if (savedTheme) {
        // User preference takes priority
        shouldBeDark = savedTheme === 'dark';
    } else if (prefersDarkMode) {
        // Then system preference
        shouldBeDark = true;
    } else if (isNightTime) {
        // Then time of day as a fallback
        shouldBeDark = true;
    }
    
    // Apply initial theme
    if (shouldBeDark) {
        document.documentElement.classList.add('dark-mode');
        darkModeToggle.setAttribute('aria-checked', 'true');
    } else {
        darkModeToggle.setAttribute('aria-checked', 'false');
    }
    
    // Add click event listener
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark-mode');
        
        const isDark = document.documentElement.classList.contains('dark-mode');
        darkModeToggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
        
        // Add a subtle animation effect
        darkModeToggle.classList.add('clicked');
        setTimeout(() => {
            darkModeToggle.classList.remove('clicked');
        }, 300);
        
        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Announce theme change for screen readers
        announceThemeChange(isDark);
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only apply if user hasn't set a preference
            const newIsDark = e.matches;
            document.documentElement.classList.toggle('dark-mode', newIsDark);
            darkModeToggle.setAttribute('aria-checked', newIsDark ? 'true' : 'false');
        }
    });
}

// Function to announce theme changes for screen readers
function announceThemeChange(isDark) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Theme changed to ${isDark ? 'dark' : 'light'} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// Optimized scroll animations with IntersectionObserver
function initScrollAnimations() {
    // Performance optimized - only observe elements that aren't already visible
    const elements = cachedElements.animate_on_scroll || document.querySelectorAll('.animate-on-scroll');
    
    if (!elements.length) return;
    
    // Create options with different thresholds based on element position
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create observer for standard animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay attribute if it exists
                const delayClass = Array.from(entry.target.classList).find(cls => cls.startsWith('animate-delay-'));
                const delay = delayClass ? parseInt(delayClass.split('-').pop()) * 100 : 0;
                
                // Apply show class with the specified delay
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
                
                // Stop observing once shown for better performance
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Apply observer to all animate-on-scroll elements
    elements.forEach(element => {
        // Skip elements that are already visible
        if (!element.classList.contains('show')) {
            observer.observe(element);
        }
    });
    
    // Add scroll event for parallax effects
    initParallaxEffects();
}

// Add subtle parallax effects on scroll - Performance optimized
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.animated-shapes .shape');
    
    if (parallaxElements.length > 0) {
        let lastScrollY = window.pageYOffset;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            lastScrollY = window.pageYOffset;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    parallaxElements.forEach((element, index) => {
                        // Different speeds for different elements
                        const speed = 0.05 + (index * 0.03);
                        const movement = lastScrollY * speed;
                        
                        // Apply transform with translate and rotate for more dynamic effect
                        element.style.transform = `translate3d(0, ${movement}px, 0) rotate(${movement / 10}deg)`;
                    });
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// Initialize tabs in about section with improved animations and transitions
function initTabs() {
    const tabButtons = cachedElements.tab_btn || document.querySelectorAll('.tab-btn');
    const tabPanes = cachedElements.tab_pane || document.querySelectorAll('.tab-pane');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    // Add initial animations on load
    setTimeout(() => {
        // Make sure first tab is visible
        const activeTab = document.querySelector('.tab-pane.active');
        if (activeTab) {
            activeTab.style.opacity = "1";
            activeTab.style.visibility = "visible";
            activeTab.style.transform = "translateY(0)";
            activeTab.style.position = "relative";
        }
    }, 100);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target panel
            const target = button.getAttribute('data-target');
            const targetPane = document.querySelector(target);
            
            if (!targetPane || button.classList.contains('active')) return;
            
            // Add click effect to button
            button.classList.add('btn-clicked');
            setTimeout(() => {
                button.classList.remove('btn-clicked');
            }, 300);
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // Get the currently active pane
            const activePane = document.querySelector('.tab-pane.active');
            
            if (activePane) {
                // Fade out currently active pane
                activePane.style.opacity = '0';
                activePane.style.transform = 'translateY(10px)';
                activePane.style.visibility = 'hidden';
                
                // Wait for animation to finish then show new tab
                setTimeout(() => {
                    activePane.classList.remove('active');
                    activePane.style.position = 'absolute';
                    
                    // Show the target pane
                    targetPane.classList.add('active');
                    targetPane.style.position = 'relative';
                    
                    // Force reflow to enable transition
                    void targetPane.offsetWidth;
                    
                    // Fade in new pane
                    targetPane.style.opacity = '1';
                    targetPane.style.transform = 'translateY(0)';
                    targetPane.style.visibility = 'visible';
                }, 300);
            } else {
                // If no active pane (first load), simply show the target
                targetPane.classList.add('active');
                targetPane.style.opacity = '1';
                targetPane.style.transform = 'translateY(0)';
                targetPane.style.visibility = 'visible';
                targetPane.style.position = 'relative';
            }
            
            // Handle aria attributes for accessibility
            tabButtons.forEach(btn => {
                const controlsId = btn.getAttribute('data-target').substring(1);
                btn.setAttribute('aria-controls', controlsId);
            });
        });
        
        // Add keyboard navigation
        button.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                
                const buttons = Array.from(tabButtons);
                const currentIndex = buttons.indexOf(button);
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1;
                    if (nextIndex < 0) nextIndex = buttons.length - 1;
                } else {
                    nextIndex = currentIndex + 1;
                    if (nextIndex >= buttons.length) nextIndex = 0;
                }
                
                buttons[nextIndex].focus();
                buttons[nextIndex].click();
            }
        });
    });
    
    // Set up initial ARIA attributes
    tabButtons.forEach((button, index) => {
        const isActive = index === 0;
        const controlId = button.getAttribute('data-target').substring(1);
        
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', isActive);
        button.setAttribute('aria-controls', controlId);
        button.setAttribute('tabindex', isActive ? '0' : '-1');
        
        const pane = document.getElementById(controlId);
        if (pane) {
            pane.setAttribute('role', 'tabpanel');
            pane.setAttribute('aria-labelledby', button.id || `tab-${index}`);
            if (!button.id) button.id = `tab-${index}`;
        }
    });
    
    // Set the first tab as active by default if none is active
    if (!document.querySelector('.tab-btn.active') && tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

// Enhanced skill bars animation with staggered timing
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    if (!skillLevels.length) return;
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                
                // Staggered animation starts
                setTimeout(() => {
                    entry.target.style.width = level;
                }, 200 + (index * 100));
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

// Initialize language progress bars with smoother animations
function initLanguageProgressBars() {
    const progressBars = document.querySelectorAll('.language-progress .progress-bar');
    
    if (!progressBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width') + '%';
                
                // Add staggered timing for more appealing animation
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200 + (index * 150));
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Improved project filtering with smoother transitions
function initProjectFilters() {
    const filterButtons = cachedElements.filter_btn || document.querySelectorAll('.filter-btn');
    const projectCards = cachedElements.project_card || document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!filterButtons.length || !projectCards.length || !projectsGrid) return;
    
    // Add data attributes and initialize
    projectCards.forEach(card => {
        // Set initial opacity to 0 to enable animations
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
    });
    
    // Animate all cards in on page load with staggered timing
    setTimeout(() => {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                card.classList.add('show');
            }, 100 + (index * 100));
        });
    }, 300);
    
    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Skip if already active
            if (button.classList.contains('active')) return;
            
            // Update active button with smooth transition
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Add animation class to grid
            projectsGrid.classList.add('filtering');
            setTimeout(() => {
                projectsGrid.classList.remove('filtering');
            }, 600);
            
            // Filter projects with smooth animations
            projectCards.forEach((card, index) => {
                const shouldShow = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
                
                // First remove show class for fade out
                card.classList.remove('show');
                
                setTimeout(() => {
                    // Hide or show cards based on filter
                    if (shouldShow) {
                        card.style.display = '';
                        
                        // Staggered animation for showing cards
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 50 * (index % 5));
                    } else {
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, 300);
            });
            
            // Announce filter change for screen readers
            announceFilterChange(filterValue);
        });
    });
    
    // Set the first filter as active by default
    if (!document.querySelector('.filter-btn.active')) {
        filterButtons[0].click();
    }
}

// Function to announce filter changes for screen readers
function announceFilterChange(filterValue) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Showing ${filterValue === 'all' ? 'all projects' : filterValue + ' projects'}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// Enhanced project modal functionality with smooth open/close animations
function initProjectModals() {
    const projectButtons = cachedElements.project_details_btn || document.querySelectorAll('.project-details-btn');
    const modal = document.querySelector('.project-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    
    if (!modal || !projectButtons.length || !modalContent) return;
    
    let lastFocusedElement = null;
    
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            lastFocusedElement = button;
            
            // Get project data from the parent card
            const projectCard = button.closest('.project-card');
            
            if (!projectCard) return;
            
            const projectTitle = projectCard.querySelector('h3')?.textContent || '';
            const projectCategory = projectCard.querySelector('.project-category')?.textContent || '';
            const projectDate = projectCard.querySelector('.project-date')?.textContent || '';
            const projectClient = projectCard.querySelector('.project-client')?.textContent || '';
            const projectDescription = projectCard.querySelector('.project-description')?.textContent || '';
            
            // Get achievements if available
            let achievementsList = '';
            const achievements = projectCard.querySelector('.project-achievements');
            if (achievements) {
                const items = achievements.querySelectorAll('li');
                achievementsList = Array.from(items).map(item => `<li>${item.innerHTML}</li>`).join('');
            }
            
            // Get tech stack
            let techStack = '';
            const techs = projectCard.querySelectorAll('.project-tech span');
            techStack = Array.from(techs).map(tech => `<span>${tech.textContent}</span>`).join('');
            
            // Build modal content
            modalContent.innerHTML = `
                <span class="modal-close">&times;</span>
                <div class="modal-header">
                    <h2 class="modal-title">${projectTitle}</h2>
                    <div class="modal-subtitle">
                        <span><i class="fas fa-tag"></i> ${projectCategory}</span>
                        <span><i class="far fa-calendar-alt"></i> ${projectDate}</span>
                        <span><i class="fas fa-building"></i> ${projectClient.replace('Client: ', '')}</span>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-section">
                        <h3 class="modal-section-title">Overview</h3>
                        <p>${projectDescription}</p>
                    </div>
                    
                    ${achievementsList ? `
                    <div class="modal-section">
                        <h3 class="modal-section-title">Key Contributions</h3>
                        <ul class="achievements-list">
                            ${achievementsList}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">Technologies Used</h3>
                        <div class="project-tech modal-tech">
                            ${techStack}
                        </div>
                    </div>
                </div>
            `;
            
            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Set focus to the modal for accessibility
            modalContent.setAttribute('tabindex', '-1');
            setTimeout(() => {
                modalContent.focus();
            }, 300);
            
            // Close button functionality
            const newCloseButton = modalContent.querySelector('.modal-close');
            if (newCloseButton) {
                newCloseButton.addEventListener('click', () => closeModal(modal, lastFocusedElement));
            }
            
            // Set up keyboard trap for modal
            setupModalKeyboardTrap(modal, modalContent, lastFocusedElement);
        });
    });
    
    // Close modal when clicking outside content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal, lastFocusedElement);
            }
        });
    }
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal(modal, lastFocusedElement);
        }
    });
}

function closeModal(modal, lastFocusedElement) {
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the last clicked button
    if (lastFocusedElement) {
        setTimeout(() => {
            lastFocusedElement.focus();
        }, 300);
    }
}

function setupModalKeyboardTrap(modal, modalContent, lastFocusedElement) {
    if (!modal || !modalContent) return;
    
    // Trap focus inside modal for accessibility
    const focusableElements = modalContent.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modalContent.addEventListener('keydown', function(e) {
        const isTabPressed = e.key === 'Tab';
        
        if (!isTabPressed) return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}

// Scroll progress indicator with smooth updates
function initScrollProgress() {
    // Create progress bar element if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(progressBar);
    }
    
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;
    
    let lastScrollPercentage = 0;
    let requestId = null;
    
    // Update progress bar width on scroll with throttling
    window.addEventListener('scroll', function() {
        if (!requestId) {
            requestId = requestAnimationFrame(() => updateScrollProgress(progressBar, lastScrollPercentage, requestId));
        }
    });
    
    // Initial call
    updateScrollProgress(progressBar, lastScrollPercentage, requestId);
}

function updateScrollProgress(progressBar, lastScrollPercentage, requestId) {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;
    
    // Only update if there's a significant change (smoother performance)
    if (Math.abs(scrollPercentage - lastScrollPercentage) > 0.5) {
        progressBar.style.width = scrollPercentage + '%';
        lastScrollPercentage = scrollPercentage;
    }
    
    requestId = null;
}

// Initialize typed.js for the typing effect with better configuration
function initTypedText() {
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement && typeof Typed !== 'undefined') {
        new Typed(typingElement, {
            strings: [
                "AI Engineer",
                "Data Scientist",
                "Computer Vision Specialist",
                "MLOps Expert",
                "LLM Developer"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 1000,
            loop: true,
            smartBackspace: true,
            showCursor: false, // Using custom cursor in CSS
            autoInsertCss: false
        });
    }
}

// Add smooth effects to links and buttons throughout the site
function initLinkHoverEffects() {
    // Add magnetic effect to special buttons
    const magneticElements = document.querySelectorAll('.hero-cta .btn, .contact-link');
    
    if (!magneticElements.length) return;
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage of position relative to element size
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            // Apply subtle transform based on mouse position
            this.style.transform = `translateY(-3px) perspective(1000px) rotateX(${yPercent * 4}deg) rotateY(${xPercent * 4}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize image effects and optimizations
function initImageEffects() {
    // Lazy load images for better performance
    const images = document.querySelectorAll('img:not(.profile-image)');
    
    if (!images.length) return;
    
    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    
                    // Add fade-in effect
                    img.classList.add('img-loaded');
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    
    images.forEach(img => {
        // Only target images with data-src
        if (img.getAttribute('data-src')) {
            imageObserver.observe(img);
        } else {
            // Add loaded class to regular images after they're loaded
            if (img.complete) {
                img.classList.add('img-loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('img-loaded');
                });
            }
        }
    });
}

// Add scroll to top functionality with smooth animation
function initScrollToTop() {
    // Create the scroll-to-top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollTopBtn.setAttribute('title', 'Scroll to top');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
    }
    
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollTopBtn) return;
    
    // Show button when scrolling down with throttling
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateScrollTopButton(scrollTopBtn, lastScrollY);
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Initial check
    updateScrollTopButton(scrollTopBtn, window.pageYOffset);
    
    // Scroll to top on click with smooth animation
    scrollTopBtn.addEventListener('click', function() {
        // First small movement for visual feedback
        window.scrollTo({
            top: window.pageYOffset - 100,
            behavior: 'smooth'
        });
        
        // Then complete scroll to top
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 50);
        
        // Add click animation
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
}

function updateScrollTopButton(scrollTopBtn, scrollY) {
    if (scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
}

// Helper utility functions
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Create a CSS variable with the current viewport height for mobile compatibility
function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}