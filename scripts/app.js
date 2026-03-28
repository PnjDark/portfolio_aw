// App Entry Point - Modular Architecture
// Follows Documentation.md structure: router, data, ui, logic

import './data/profile.js';
import './data/skills.js';
import './data/projects.js';
import './data/experience.js';
import './ui/themeSwitcher.js';
import './ui/scrollEffects.js';
import './ui/componentRenderer.js';
import './logic/utils.js';
import './logic/cvGenerator.js';
import './logic/algorithmicPortfolioSorter.js';

// Router (multi-page + SPA-like components)
class Router {
  constructor() {
    this.routes = {
      '/': 'index.html',
      '/about': 'about.html',
      '/projects': 'projects.html',
      '/contact': 'contact.html',
      '/admin': '/admin/index.html'
    };
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.navigate(window.location.pathname));
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }

  async navigate(path) {
    // Load page content dynamically (for SPA feel)
    const page = await fetch(path === '/' ? 'index.html' : path.slice(1)).then(r => r.text());
    document.querySelector('#app') ? document.querySelector('#app').innerHTML = page : history.pushState({}, '', path);
    this.loadComponents();
  }

  loadComponents() {
    // Load reusable components via fetch
    // Implemented in componentRenderer.js
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new Router();
  
  // Init UI modules
  window.themeSwitcher.init();
  window.scrollEffects.init();
  window.componentRenderer.init();
  
  // Load data and render
  window.renderSkills();
  window.renderProjects();
  window.sortPortfolioAlgorithmically();
  
  console.log('Advanced Portfolio App Initialized');
});

// Global namespace for modules
window.App = {};

// Export for modules
export { Router };
