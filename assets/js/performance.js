// Performance Optimization Script
(function() {
  'use strict';
  
  // Smooth scroll optimization
  if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
  // Lazy load images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    });
  }
  
  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
      // Scroll handling code
    });
  }, { passive: true });
  
  // Optimize animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!prefersReducedMotion.matches) {
    document.body.classList.add('animations-enabled');
  }
})();
