document.addEventListener('DOMContentLoaded', () => {

    // --- Language Switcher Logic ---
    const langBtn = document.getElementById('lang-toggle');
    const currentLangText = document.getElementById('current-lang');
    let currentLang = 'mr'; // Default to Marathi

    // Initialize with Marathi on load
    setLanguage('mr');

    function setLanguage(lang) {
        currentLang = lang;
        if (lang === 'en') currentLangText.textContent = 'English';
        else if (lang === 'hi') currentLangText.textContent = 'हिंदी';
        else currentLangText.textContent = 'मराठी';

        // Find all elements with data-key
        const elements = document.querySelectorAll('[data-key]');

        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update body lang attribute for potential specific css
        document.body.setAttribute('lang', lang);
    }

    langBtn.addEventListener('click', () => {
        // Cycle: mr -> hi -> en -> mr
        let newLang;
        if (currentLang === 'mr') newLang = 'hi';
        else if (currentLang === 'hi') newLang = 'en';
        else newLang = 'mr';

        setLanguage(newLang);
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Also animate section titles when they come into view
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in'); // Add fade-in class to sections for general reveal
        observer.observe(section);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "var(--shadow-sm)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

});
