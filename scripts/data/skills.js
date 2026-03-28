// Skills Data - Powers skill bars with auto-scaling
// Algorithm: level (1-5) -> percentage

window.skillsData = [
  {
    name: 'HTML5 & CSS3',
    category: 'Markup & Styling',
    level: 5, // 95%
    icon: 'assets/svg/html.svg'
  },
  {
    name: 'TailwindCSS',
    category: 'CSS Frameworks',
    level: 5, // 95%
    icon: 'assets/svg/tailwind.svg'
  },
  {
    name: 'JavaScript ES2024',
    category: 'Programming',
    level: 5, // 95%
    icon: 'assets/svg/js.svg'
  },
  {
    name: 'Supabase',
    category: 'Backend',
    level: 4, // 85%
    icon: 'assets/svg/supabase.svg'
  },
  {
    name: 'SVG Animations',
    category: 'Graphics',
    level: 4, // 85%
    icon: 'assets/svg/svg.svg'
  },
  {
    name: 'Vite',
    category: 'Build Tools',
    level: 4, // 80%
    icon: 'assets/svg/vite.svg'
  }
  // Add more...
];

function renderSkills() {
  const container = document.querySelector('#skills .grid');
  if (!container) return;

  skillsData.forEach(skill => {
    const percent = Math.min((skill.level / 5) * 95, 95);
    const bar = document.createElement('div');
    bar.className = 'skill-item';
    bar.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">${skill.name} <span class="text-sm opacity-75">(${percent}%)</span></h3>
      <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full animate-skillbar" style="--delay: ${Math.random()}s; width: ${percent}%"></div>
      </div>
    `;
    bar.dataset.scroll = '';
    container.appendChild(bar);
  });
}

window.renderSkills = renderSkills;
export { skillsData, renderSkills };
