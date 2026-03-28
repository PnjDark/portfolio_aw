// Component Renderer - Dynamic HTML component injection

class ComponentRenderer {
  constructor() {
    this.components = new Map();
    this.init();
  }

  init() {
    this.loadComponents();
  }

  async loadComponents() {
    const componentFiles = ['navbar.html', 'hero.html', 'footer.html'];
    for (const file of componentFiles) {
      try {
        const response = await fetch(`components/${file}`);
        if (response.ok) {
          this.components.set(file, await response.text());
        }
      } catch (e) {
        console.warn(`Component ${file} not found`);
      }
    }
    this.injectComponents();
  }

  injectComponents() {
    // Replace placeholders like <!-- include:navbar -->
    document.querySelectorAll('[data-component]').forEach(el => {
      const component = el.dataset.component;
      if (this.components.has(component)) {
        el.outerHTML = this.components.get(component);
      }
    });
  }

  render(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || '');
  }
}

window.componentRenderer = new ComponentRenderer();
export default ComponentRenderer;
