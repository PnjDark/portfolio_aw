// Utility Functions - Modular helpers

window.utils = {
  debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },

  throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  levelToPercent(level) {
    return Math.min((level / 5) * 95, 95);
  },

  formatDate(dateStr) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(new Date(dateStr));
  }
};

export const { debounce, throttle, sanitize, levelToPercent, formatDate } = window.utils;
