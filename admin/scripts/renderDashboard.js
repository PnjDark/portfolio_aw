// Dashboard Renderer - Page switching & table editors

class RenderDashboard {
  constructor() {
    this.pages = {
      dashboard: this.renderDashboard,
      projects: this.renderProjectsTable,
      skills: this.renderSkillsTable,
      experience: this.renderExperienceTable,
      cv: this.renderCVManager
    };
    this.init();
  }

  async init() {
    this.renderPage('dashboard');
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.target.dataset.page;
        document.querySelector('[data-page].active')?.classList.remove('active');
        e.target.classList.add('active');
        this.renderPage(page);
      });
    });
  }

  async renderPage(pageKey) {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="slide-in">Loading...</div>';
    setTimeout(() => {
      const renderFn = this.pages[pageKey];
      content.innerHTML = renderFn.call(this);
    }, 300);
  }

  renderDashboard() {
    return `
      <h2 class="text-3xl font-bold mb-8">Dashboard Overview</h2>
      <p>Full CRUD management for portfolio content. Changes sync realtime to frontend via data modules (future Supabase).</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div class="glass p-6 rounded-2xl text-center">
          <div class="text-4xl font-bold text-blue-400">Live</div>
          <p>Realtime Sync</p>
        </div>
        <div class="glass p-6 rounded-2xl text-center">
          <div class="text-4xl font-bold text-green-400">File</div>
          <p>Uploads</p>
        </div>
        <div class="glass p-6 rounded-2xl text-center">
          <div class="text-4xl font-bold text-purple-400">Auto</div>
          <p>CV Gen</p>
        </div>
        <div class="glass p-6 rounded-2xl text-center">
          <div class="text-4xl font-bold text-orange-400">RLS</div>
          <p>Secure</p>
        </div>
      </div>
    `;
  }

  async renderProjectsTable() {
    const projects = await AdminDB.get('projects');
    return `
      <div class="table-editor">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Projects (${projects.length})</h2>
          <button class="glass px-4 py-2 rounded-xl hover-scale" onclick="showModal('project')">+ New Project</button>
        </div>
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-600">
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${projects.map(p => `
              <tr class="border-b border-slate-700 hover:bg-slate-800/50">
                <td>${p.title}</td>
                <td><span class="px-2 py-1 bg-green-600/30 text-green-400 rounded-full text-sm">Live</span></td>
                <td>
                  <button onclick="editProject(${p.id})" class="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                  <button onclick="deleteProject(${p.id})" class="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Similar for skills, experience...
  renderSkillsTable() { return 'Skills table...'; }
  renderExperienceTable() { return 'Experience table...'; }
  renderCVManager() {
    return `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">CV Manager</h2>
        <button onclick="App.generateCV()" class="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover-scale shadow-2xl">
          Generate & Download CV
        </button>
        <p class="opacity-75">CV compiles live from portfolio data above.</p>
      </div>
    `;
  }
}

window.RenderDashboard = new RenderDashboard();
export default RenderDashboard;
