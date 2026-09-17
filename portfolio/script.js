/* ============================================================
   VAJP'S PORTFOLIO - SCRIPT.JS
   Premium Futuristic Developer Portfolio
   ============================================================ */

(function () {
    'use strict';

    /* ============================================================
       1. LOADING SCREEN
       ============================================================ */
    const loader = document.getElementById('loader');

    function hideLoader() {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initScrollReveal();
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('load', function () {
        setTimeout(hideLoader, 1600);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 1600);
    }

    /* ============================================================
       2. THEME TOGGLE
       ============================================================ */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }

    function initTheme() {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) {
            setTheme(saved);
        } else {
            setTheme('dark');
        }
    }

    themeToggle.addEventListener('click', function () {
        const current = htmlEl.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    initTheme();

    /* ============================================================
       3. MOBILE MENU
       ============================================================ */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = navLinks.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded',
            hamburger.classList.contains('active'));
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinkItems.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ============================================================
       4. NAVBAR SCROLL
       ============================================================ */
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ============================================================
       5. ACTIVE SECTION INDICATOR
       ============================================================ */
    const sections = document.querySelectorAll('.section, .hero');
    const navLinksAll = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    /* ============================================================
       6. TYPING ANIMATION
       ============================================================ */
    const typingEl = document.getElementById('typing-text');
    const roles = [
        'Full-Stack Web Developer',
        'Web Developer',
        'JavaScript Developer',
        'Creative Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingEl.textContent = currentRole.substring(0, charIndex);

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500;
        }

        typingTimeout = setTimeout(typeEffect, delay);
    }

    typeEffect();

    /* ============================================================
       7. SCROLL REVEAL
       ============================================================ */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    /* ============================================================
       8. BACK TO TOP
       ============================================================ */
    const backToTop = document.getElementById('back-to-top');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ============================================================
       9. COPY EMAIL
       ============================================================ */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');
    const EMAIL = 'vrajd9313@gmail.com';

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(function () {
            toast.classList.remove('visible');
        }, 2500);
    }

    copyEmailBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(EMAIL).then(function () {
            var spanEl = copyEmailBtn.querySelector('span');
            spanEl.textContent = 'Copied!';
            showToast('Email copied to clipboard!');
            setTimeout(function () {
                spanEl.textContent = 'Copy Email';
            }, 2000);
        }).catch(function () {
            // Fallback for older browsers
            var tempInput = document.createElement('input');
            tempInput.value = EMAIL;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showToast('Email copied to clipboard!');
        });
    });

    /* ============================================================
       12. CONTACT FORM
       ============================================================ */
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameVal = document.getElementById('name').value.trim();
        var emailVal = document.getElementById('email').value.trim();
        var messageVal = document.getElementById('message').value.trim();

        if (!nameVal || !emailVal || !messageVal) {
            showToast('Please fill in all fields.');
            return;
        }

        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showToast('Please enter a valid email address.');
            return;
        }

        // Since no backend, use mailto
        var subject = encodeURIComponent('Portfolio Contact from ' + nameVal);
        var body = encodeURIComponent(
            'Name: ' + nameVal + '\n' +
            'Email: ' + emailVal + '\n\n' +
            'Message:\n' + messageVal
        );
        window.open('mailto:vrajd9313@gmail.com?subject=' + subject + '&body=' + body);

        showToast('Opening email client...');
        contactForm.reset();
    });

    /* ============================================================
       13. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ============================================================
       14. PREFERS REDUCED MOTION
       ============================================================ */
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('visible');
            });
        }
    }

    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

})();
