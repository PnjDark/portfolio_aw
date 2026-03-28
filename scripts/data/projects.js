// Projects Data - For algorithmic sorting and cards
// Score = recency * 0.4 + techStack.length * 0.3 + complexity * 0.3

window.projectsData = [
  {
    id: 1,
    title: 'Admin Dashboard w/ Supabase',
    description: 'Full CRUD admin panel with auth, real-time updates, file storage.',
    techStack: ['HTML', 'Tailwind', 'Vanilla JS', 'Supabase'],
    image: 'assets/images/project1.jpg',
    live: 'https://example.com',
    github: 'https://github.com/admin-dashboard',
    recency: 0.95, // 1.0 = latest
    complexity: 5,
    featured: true
  },
  {
    id: 2,
    title: 'Auto CV Generator',
    description: 'Dynamic PDF/DOCX generation from portfolio data using browser APIs.',
    techStack: ['JS', 'html2pdf.js', 'Modular Data'],
    image: 'assets/images/project2.jpg',
    live: '',
    github: 'https://github.com/cv-generator',
    recency: 0.85,
    complexity: 4,
    featured: true
  },
  {
    id: 3,
    title: 'SVG Animation Library',
    description: 'Custom SVG illustrations with CSS/JS animations and morphing.',
    techStack: ['SVG', 'CSS Keyframes', 'GSAP-like'],
    image: 'assets/images/project3.jpg',
    recency: 0.75,
    complexity: 5
  }
  // More projects...
];

function renderProjects(sortedProjects = projectsData) {
  const container = document.getElementById('projects-grid') || document.querySelector('[id*=\"projects\"]');
  if (!container) return;

  container.innerHTML = sortedProjects.slice(0, 6).map(project => `
    <div class="glass p-8 rounded-3xl hover-scale group cursor-pointer shadow-xl hover:shadow-2xl transition-all overflow-hidden bg-gradient-to-br" data-scroll>
      <div class="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6 overflow-hidden group-hover:scale-110 transition-transform">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
      </div>
      <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">${project.title}</h3>
      <p class="opacity-75 mb-4 line-clamp-2">${project.description}</p>
      <div class="flex flex-wrap gap-2 mb-6">
        ${project.techStack.map(tech => `<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">${tech}</span>`).join('')}
      </div>
      <div class="flex gap-4">
        ${project.live ? `<a href="${project.live}" class="text-blue-600 hover:underline font-medium">Live →</a>` : ''}
        ${project.github ? `<a href="${project.github}" class="text-slate-500 hover:underline font-medium">Code →</a>` : ''}
      </div>
    </div>
  `).join('');
}

window.renderProjects = renderProjects;
export { projectsData, renderProjects };
