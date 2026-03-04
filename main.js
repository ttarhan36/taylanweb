document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const btnContact = document.querySelector('.btn-contact');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');

            // Simple approach: toggle display
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                if (btnContact) btnContact.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#13151c';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';

                if (btnContact) {
                    btnContact.style.display = 'flex';
                    navLinks.appendChild(btnContact);
                }
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                menuToggle.classList.remove('active');
            }
        });
    });

    // 2. Simple Scroll Animation for items
    const observers = [];
    const fadeElements = document.querySelectorAll('.skill-item, .tool-icon, .project-card, .collaborate-form, .floating-badges');

    // Add initial CSS via JS or ensure it's in CSS
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });
});
