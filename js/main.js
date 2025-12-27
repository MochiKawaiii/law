/* ================================================
   Henrison Law - JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initHeroSlider();
    initMobileNav();
    initScrollAnimations();
    initChatWidget();
    initBackToTop();
    initContactForm();
});

/* ================================================
   Header Scroll Effect
   ================================================ */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ================================================
   Hero Slider
   ================================================ */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Initialize
    showSlide(0);
    startSlider();
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            currentSlide = index;
            showSlide(currentSlide);
            startSlider();
        });
    });
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopSlider);
        hero.addEventListener('mouseleave', startSlider);
    }
}

/* ================================================
   Mobile Navigation
   ================================================ */
function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navItems = document.querySelectorAll('.nav__item');
    
    if (!toggle || !navList) return;
    
    toggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Handle dropdown on mobile
    navItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        const dropdown = item.querySelector('.nav__dropdown');
        
        if (dropdown && link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

/* ================================================
   Scroll Animations
   ================================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

/* ================================================
   Chat Widget
   ================================================ */
function initChatWidget() {
    const widget = document.querySelector('.chat-widget');
    const toggle = document.querySelector('.chat-widget__toggle');
    const input = document.querySelector('.chat-widget__input');
    const sendBtn = document.querySelector('.chat-widget__send');
    const body = document.querySelector('.chat-widget__body');
    
    if (!widget || !toggle) return;
    
    toggle.addEventListener('click', () => {
        widget.classList.toggle('active');
    });
    
    // Send message
    function sendMessage() {
        if (!input || !body) return;
        
        const message = input.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-widget__message chat-widget__message--user';
        userMsg.textContent = message;
        body.appendChild(userMsg);
        
        // Clear input
        input.value = '';
        
        // Scroll to bottom
        body.scrollTop = body.scrollHeight;
        
        // Simulate response
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-widget__message';
            botMsg.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.';
            body.appendChild(botMsg);
            body.scrollTop = body.scrollHeight;
        }, 1000);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-widget') && widget.classList.contains('active')) {
            widget.classList.remove('active');
        }
    });
}

/* ================================================
   Back to Top Button
   ================================================ */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ================================================
   Contact Form
   ================================================ */
function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        // Email validation
        const emailField = form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
        }
        
        if (isValid) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm.</span>
            `;
            form.innerHTML = '';
            form.appendChild(successMsg);
        }
    });
    
    // Remove error class on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
}

/* ================================================
   Stats Counter Animation
   ================================================ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stats__number');
    if (stats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-value'));
                animateCounter(target, value);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

/* ================================================
   Smooth Scroll for Anchor Links
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
