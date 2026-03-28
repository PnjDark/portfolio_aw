// Scroll Effects Module - Reveal animations, parallax lite

class ScrollEffects {
  constructor() {
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.1 });

    this.observeElements();
    this.initSmoothScroll();
  }

  observeElements() {
    document.querySelectorAll('[data-scroll]').forEach(el => this.observer.observe(el));
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}

window.scrollEffects = new ScrollEffects();
export default ScrollEffects;
