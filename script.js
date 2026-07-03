/* ==========================================================================
   Dilana Damsath — Portfolio
   Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader ---------------- */
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const percentLabel = document.getElementById('preloaderPercent');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = '';
        revealOnLoad();
      }, 280);
    }
    fill.style.width = progress + '%';
    percentLabel.textContent = String(Math.floor(progress)).padStart(2, '0');
  }, 140);

  document.body.style.overflow = 'hidden';

  /* ---------------- Custom cursor ---------------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouch) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactiveSelectors = 'a, button, input, textarea, .skill-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) ring.classList.remove('is-active');
    });
  }

  /* ---------------- Theme toggle ---------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (isDark) => {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', String(isDark));
  };

  setTheme(prefersDark);

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  /* ---------------- Mobile menu ---------------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));

  function revealOnLoad() {
    // Reveal hero elements immediately once the preloader clears
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), i * 90);
    });
  }

  /* ---------------- Footer year ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- Contact form → Formspree ---------------- */
  // Must match the form's `action` attribute in index.html.
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdarweyy';

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const toast = document.getElementById('toast');

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!email || !message) return;

    submitBtn.classList.add('is-loading');
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, message })
      });

      if (!response.ok) throw new Error('Request failed');

      form.reset();
      formStatus.textContent = 'Sent — thank you!';
      formStatus.classList.add('is-success');
      showToast('Message sent');
    } catch (err) {
      formStatus.textContent = 'Something went wrong. Check the Formspree endpoint in script.js.';
      formStatus.classList.add('is-error');
    } finally {
      submitBtn.classList.remove('is-loading');
    }
  });
});
