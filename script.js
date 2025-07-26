// Enhanced script.js with polished animations and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initFormHandling();
    initProjectFiltering();
    initProgressBars();
    initCounterAnimations();
    initParticleBackground();
    initScrollEffects();
    initFAQ();
    initLoadMore();
    
    // Navigation functionality
    function initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');
        
        // Mobile menu toggle
        hamburger?.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only prevent default for same-page links
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // Close mobile menu
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', throttle(function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, 100));
        
        // Update active navigation link
        updateActiveNavLink();
        window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (link.getAttribute('href').includes(current) && current)) {
                link.classList.add('active');
            }
        });
    }
    
    // Animation functionality
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Add animation classes
                    if (target.classList.contains('skill-card')) {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                        target.style.transition = 'all 0.6s ease';
                    }
                    
                    if (target.classList.contains('objective-card')) {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                        target.style.transition = 'all 0.6s ease';
                    }
                    
                    if (target.classList.contains('team-member')) {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                        target.style.transition = 'all 0.6s ease';
                    }
                    
                    if (target.classList.contains('project-card')) {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                        target.style.transition = 'all 0.6s ease';
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.skill-card, .objective-card, .team-member, .project-card, .culture-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }
    
    // Progress bar animations
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 500);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Counter animations
    function initCounterAnimations() {
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current);
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        }
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Form handling
    function initFormHandling() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Clear previous errors
                clearFormErrors();
                
                // Validate form
                if (validateForm()) {
                    // Show loading state
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission
                    setTimeout(() => {
                        showNotification('Thank you! Your message has been sent successfully.', 'success');
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });
            
            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
        }
    }
    
    function validateForm() {
        const form = document.getElementById('contactForm');
        let isValid = true;
        
        // Required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }
        
        return isValid;
    }
    
    function clearFormErrors() {
        const form = document.getElementById('contactForm');
        const errorElements = form.querySelectorAll('.form-error');
        const errorFields = form.querySelectorAll('.error');
        
        errorElements.forEach(el => el.textContent = '');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    // Project filtering with smooth animations
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const projectsGrid = document.getElementById('projectsGrid');
        
        if (!projectsGrid) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects with animation
                filterProjects(filterValue, projectCards, projectsGrid);
            });
        });
    }
    
    function filterProjects(filterValue, projectCards, projectsGrid) {
        // First, hide all cards
        projectCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.classList.add('hide');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
        });
        
        // Animate grid layout
        setTimeout(() => {
            projectsGrid.style.transition = 'all 0.5s ease';
        }, 300);
    }
    
    // Particle background
    function initParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.4;
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }
        
        function initParticles() {
            particles = [];
            const particleCount = Math.min(50, Math.floor(window.innerWidth / 25));
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                    color: `hsl(${Math.random() * 60 + 300}, 70%, 60%)`
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around screen
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                
                // Draw connections
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = particle.color;
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            ctx.globalAlpha = 1;
            requestAnimationFrame(animateParticles);
        }
        
        // Initialize
        resizeCanvas();
        animateParticles();
        
        // Handle resize
        window.addEventListener('resize', debounce(resizeCanvas, 250));
    }
    
    // Scroll effects
    function initScrollEffects() {
        // Parallax effect for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            
            floatingCards.forEach((card, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
        
        // Smooth reveal animation for sections
        const revealElements = document.querySelectorAll('.section-header, .hero-content');
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.8s ease';
            revealObserver.observe(el);
        });
    }
    
    // FAQ functionality
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        });
    }
    
    // Load more functionality
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Simulate loading more projects
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    showNotification('No more projects to load at the moment.', 'info');
                    this.innerHTML = '<i class="fas fa-plus"></i> Load More Projects';
                    this.disabled = false;
                }, 1500);
            });
        }
    }
    
    // Utility functions
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 400px;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            padding: 0.2rem;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    function getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }
    
    // Enhanced cursor effects
    function initCursorEffects() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255, 107, 157, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        updateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .objective-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, rgba(78, 205, 196, 0.8) 0%, transparent 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(255, 107, 157, 0.8) 0%, transparent 70%)';
            });
        });
    }
    
    // Initialize cursor effects
    initCursorEffects();
    
    // Performance monitoring
    function initPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
        
        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Scroll ended
            }, 150);
        });
    }
    
    initPerformanceMonitoring();
    
    // Accessibility enhancements
    function initAccessibility() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 4px 4px;
            z-index: 10001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Announce page changes for screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        
        document.body.appendChild(announcer);
        
        // Keyboard navigation enhancement
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close mobile menu
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                if (navMenu?.classList.contains('active')) {
                    hamburger?.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }
    
    initAccessibility();
    
    console.log('🚀 CodeZenos website loaded successfully!');
});

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
