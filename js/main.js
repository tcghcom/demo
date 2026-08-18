// Mobile nav toggle
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
  document.querySelectorAll('.nav__links a').forEach((link) => {
    link.addEventListener('click', () => header.classList.remove('nav-open'));
  });
}

// Header shadow once page is scrolled
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Animated stat counters
const statEls = document.querySelectorAll('[data-count]');
if (statEls.length) {
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * progress);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statEls.forEach((el) => observer.observe(el));
}

// Gallery category filter
const filterButtons = document.querySelectorAll('.gallery-filter button');
const galleryItems = document.querySelectorAll('[data-category]');
if (filterButtons.length && galleryItems.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const category = btn.dataset.filter;
      galleryItems.forEach((item) => {
        const show = category === 'all' || item.dataset.category === category;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}
