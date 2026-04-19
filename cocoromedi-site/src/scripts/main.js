// CocoroMedi – main.js

document.addEventListener('DOMContentLoaded', async () => {

    // ── Load HTML components ──────────────────────────────────
    async function loadComponent(containerId, filePath) {
        const container = document.getElementById(containerId);
        if (!container) return;
        try {
            const res = await fetch(filePath);
            if (!res.ok) throw new Error(`Failed to load ${filePath}`);
            container.innerHTML = await res.text();
        } catch (e) {
            console.warn(e);
        }
    }

    await Promise.all([
        loadComponent('nav-container',    'components/nav.html'),
        loadComponent('footer-container', 'components/footer.html'),
    ]);

    // ── Hamburger menu ────────────────────────────────────────
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    // ── Close mobile menu helper ──────────────────────────────
    window.closeMenu = () => {
        hamburger?.classList.remove('open');
        mobileMenu?.classList.remove('open');
    };

    // ── Smooth scroll for anchor links ────────────────────────
    document.addEventListener('click', e => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth' });
    });

    // ── Nav shadow on scroll ──────────────────────────────────
    const nav = document.getElementById('main-nav');
    const onScroll = () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Scroll reveal ─────────────────────────────────────────
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // ── Contact form ──────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            document.getElementById('form-success').style.display = 'block';
            contactForm.reset();
        });
    }
});
