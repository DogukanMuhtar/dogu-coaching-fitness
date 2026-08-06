/* ================================================
   DOĞU COACHING – INTERACTIONS & ANIMATIONS
   ================================================ */

function kayitOL() {
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ================================================
   NAVBAR – Scroll glassmorphism effect
   ================================================ */
(function () {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (window.scrollY > 60) {
                    nav.classList.add('nav-scrolled');
                } else {
                    nav.classList.remove('nav-scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
})();

/* ================================================
   FAQ ACCORDION
   ================================================ */
(function () {
    document.addEventListener('click', function (e) {
        const header = e.target.closest('.faq-item__header');
        if (!header) return;

        const item = header.closest('.faq-item');
        if (!item) return;

        // Close others in the same container
        const container = item.closest('.faq-container');
        if (container) {
            container.querySelectorAll('.faq-item.active').forEach(function (other) {
                if (other !== item) other.classList.remove('active');
            });
        }

        item.classList.toggle('active');
    });
})();

/* ================================================
   ANTRENMAN PROGRAMLARI – Akordeon Kartlar
   ================================================ */
document.querySelectorAll('.program-card__header').forEach(function (header) {
    header.addEventListener('click', function () {
        var card = header.closest('.program-card');
        var panel = card.querySelector('.program-card__panel');
        var isOpen = header.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.program-card__header[aria-expanded="true"]').forEach(function (openHeader) {
            if (openHeader !== header) {
                openHeader.setAttribute('aria-expanded', 'false');
                openHeader.closest('.program-card').querySelector('.program-card__panel').style.maxHeight = null;
            }
        });

        if (isOpen) {
            header.setAttribute('aria-expanded', 'false');
            panel.style.maxHeight = null;
        } else {
            header.setAttribute('aria-expanded', 'true');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
});

// "Programı Seç" butonuna basınca iletişim formuna yumuşak kaydırma
document.querySelectorAll('.program-card__cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ================================================
   KALORİ & MAKRO HESAPLAYICI
   ================================================ */
let selectedGender = 'male';

function setGender(btn, gender) {
    selectedGender = gender;
    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function calculateMacros() {
    const age = parseFloat(document.getElementById('calcAge').value);
    const weight = parseFloat(document.getElementById('calcWeight').value);
    const height = parseFloat(document.getElementById('calcHeight').value);
    const activity = parseFloat(document.getElementById('calcActivity').value);
    const goal = document.getElementById('calcGoal').value;

    if (!age || !weight || !height) {
        alert('Lütfen tüm alanları eksiksiz doldurun.');
        return;
    }

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (selectedGender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    const tdee = bmr * activity;
    let targetCalories = tdee;

    if (goal === 'cut') targetCalories -= 500;
    else if (goal === 'bulk') targetCalories += 300;

    targetCalories = Math.round(targetCalories);

    let proteinG = Math.round(weight * 2.0);
    let fatG = Math.round(weight * 0.9);

    let proteinCal = proteinG * 4;
    let fatCal = fatG * 9;
    let carbCal = targetCalories - (proteinCal + fatCal);
    if (carbCal < 0) carbCal = 0;
    let carbG = Math.round(carbCal / 4);

    document.getElementById('resultEmpty').style.display = 'none';
    document.getElementById('resultContent').style.display = 'block';

    document.getElementById('valCalories').innerText = targetCalories;
    document.getElementById('valBmr').innerText = Math.round(bmr) + ' kcal';
    document.getElementById('valTdee').innerText = Math.round(tdee) + ' kcal';

    document.getElementById('valProteinG').innerText = proteinG + 'g';
    document.getElementById('valProteinCal').innerText = proteinCal + ' kcal';

    document.getElementById('valCarbg').innerText = carbG + 'g';
    document.getElementById('valCarbCal').innerText = carbCal + ' kcal';

    document.getElementById('valFatg').innerText = fatG + 'g';
    document.getElementById('valFatCal').innerText = fatCal + ' kcal';

    setTimeout(() => {
        document.getElementById('barProtein').style.width = Math.round((proteinCal / targetCalories) * 100) + '%';
        document.getElementById('barCarb').style.width = Math.round((carbCal / targetCalories) * 100) + '%';
        document.getElementById('barFat').style.width = Math.round((fatCal / targetCalories) * 100) + '%';
    }, 100);
}

/* ================================================
   SCROLL REVEAL – All sections
   ================================================ */
(function () {
    function initReveal() {
        // Selectors for elements to reveal on scroll
        const selectors = [
            // Programs
            '.programs .section-eyebrow',
            '.programs h2',
            '.program-card',
            // Services
            '.services-eyebrow',
            '.services h2',
            '.card',
            // Calculator
            '.calc .services-eyebrow',
            '.calc h2',
            '.calc__box',
            // About
            '.about-hero__text',
            '.about-hero__image',
            '.about-philosophy',
            '.about-value-card',
            // FAQ
            '.faq-section .section-eyebrow',
            '.faq-section h2',
            '.faq-item',
            // Contact
            '.contact__info',
            '.contact__form-wrapper',
        ];

        const elements = document.querySelectorAll(selectors.join(', '));

        elements.forEach(function (el) {
            el.classList.add('reveal-element');
        });

        let aboutCountersStarted = false;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Calculate stagger delay based on sibling index
                    const parent = entry.target.parentElement;
                    let siblingIndex = 0;
                    if (parent) {
                        const siblings = Array.from(parent.children).filter(function (c) {
                            return c.classList.contains('reveal-element');
                        });
                        siblingIndex = siblings.indexOf(entry.target);
                        if (siblingIndex < 0) siblingIndex = 0;
                    }
                    const delay = siblingIndex * 100;

                    setTimeout(function () {
                        entry.target.classList.add('revealed');
                    }, delay);

                    observer.unobserve(entry.target);

                    // Trigger about counters once
                    if (!aboutCountersStarted && entry.target.closest('.about')) {
                        aboutCountersStarted = true;
                        animateAboutCounters();
                    }
                }
            });
        }, { threshold: 0.12 });

        elements.forEach(function (el) { observer.observe(el); });
    }

    // About section – animated stat counters
    function animateAboutCounters() {
        const stats = document.querySelectorAll('.about-stat');
        stats.forEach(function (stat) {
            const numberEl = stat.querySelector('.about-stat__number');
            if (!numberEl) return;
            const target = parseInt(stat.dataset.target, 10);
            const suffix = stat.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutExpo
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                numberEl.textContent = Math.round(ease * target) + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();

/* ================================================
   CONTACT FORM – Submit handler
   ================================================ */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const msg = document.getElementById('formMsg');
            if (msg) {
                msg.style.display = 'block';
                // Auto-hide after 5 seconds
                setTimeout(function () {
                    msg.style.display = 'none';
                }, 5000);
            }
            form.reset();
        });
    });
})();