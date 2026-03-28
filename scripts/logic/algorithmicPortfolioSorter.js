// Algorithmic Portfolio Sorter - Advanced sorting by weighted score

class PortfolioSorter {
  sort(criteria = 'featured') {
    const projects = [...window.projectsData];
    
    const sorters = {
      recency: (a, b) => b.recency - a.recency,
      complexity: (a, b) => b.complexity - a.complexity,
      techstack: (a, b) => b.techStack.length - a.techStack.length,
      featured: (a, b) => {
        // Weighted score algorithm
        const scoreA = (a.recency * 0.4) + ((a.techStack.length / 10) * 0.3) + (a.complexity * 0.3);
        const scoreB = (b.recency * 0.4) + ((b.techStack.length / 10) * 0.3) + (b.complexity * 0.3);
        return scoreB - scoreA;
      }
    };

    projects.sort(sorters[criteria] || sorters.featured);
    window.sortedProjects = projects;
    window.renderProjects(projects);
  }

  initSortButtons() {
    document.querySelectorAll('#projects-sorter button').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const criteria = ['recency', 'complexity', 'techstack', 'featured'][index];
        this.sort(criteria);
        // Update active button
        document.querySelectorAll('#projects-sorter button').forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
        btn.classList.add('bg-blue-600', 'text-white');
      });
    });
  }
}

window.sortPortfolioAlgorithmically = () => new PortfolioSorter().sort('featured');
window.PortfolioSorter = PortfolioSorter;
export default PortfolioSorter;
