// Experience Data - Timeline for About page & CV

window.experienceData = [
  {
    position: 'Senior Front-End Developer',
    company: 'Tech Corp',
    duration: '2022 - Present',
    achievements: [
      'Led development of 10+ production web apps',
      'Implemented Supabase integration reducing backend costs by 70%',
      'Created reusable component library used company-wide'
    ]
  },
  {
    position: 'Front-End Engineer',
    company: 'Startup Inc',
    duration: '2020 - 2022',
    achievements: [
      'Built performant portfolio systems with real-time features',
      'Optimized animations achieving 60fps on all devices'
    ]
  },
  {
    position: 'Junior Developer',
    company: 'Web Agency',
    duration: '2018 - 2020',
    achievements: [
      'Mastered modern HTML/CSS/JS workflows',
      'Contributed to client projects with 100% satisfaction'
    ]
  }
];

function renderExperience() {
  const container = document.querySelector('[id*=\"experience\"]') || document.querySelector('.experience-section');
  if (!container) return;

  // Timeline rendering logic
  container.innerHTML = experienceData.map((exp, index) => `
    <div class="flex items-start space-x-6 mb-12 ${index % 2 ? 'flex-row-reverse' : ''}" data-scroll>
      <div class="flex-shrink-0 w-24 h-24 glass rounded-2xl flex items-center justify-center">
        <span class="text-2xl font-bold">${new Date(exp.duration.split(' - ')[1] || exp.duration).getFullYear()}</span>
      </div>
      <div class="flex-1 glass p-6 rounded-2xl">
        <h3 class="text-2xl font-bold mb-2">${exp.position}</h3>
        <p class="text-blue-600 font-semibold mb-4">${exp.company} • ${exp.duration}</p>
        <ul class="space-y-2">
          ${exp.achievements.map(ach => `<li>• ${ach}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

window.renderExperience = renderExperience;
export { experienceData, renderExperience };
