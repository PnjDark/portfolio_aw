// Theme Switcher Module - Advanced with icons & persistence

class ThemeSwitcher {
  constructor() {
    this.toggleBtn = document.getElementById('theme-toggle');
    this.sunIcon = document.getElementById('sun-icon');
    this.moonIcon = document.getElementById('moon-icon');
    this.init();
  }

  init() {
    this.loadTheme();
    this.toggleBtn?.addEventListener('click', () => this.toggleTheme());
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') this.setTheme(e.newValue);
    });
  }

  loadTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  }

  toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    if (this.sunIcon && this.moonIcon) {
      this.sunIcon.classList.toggle('hidden', theme !== 'dark');
      this.moonIcon.classList.toggle('hidden', theme === 'dark');
    }
  }
}

window.themeSwitcher = new ThemeSwitcher();
export default ThemeSwitcher;
