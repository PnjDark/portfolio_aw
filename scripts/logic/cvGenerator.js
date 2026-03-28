// CV Generator Module - Compiles live portfolio data to downloadable PDF/DOCX

class CVGenerator {
  constructor() {
    this.template = this.getCVTemplate();
  }

  generateCV() {
    const cvHTML = this.compileCV();
    
    // Method 1: Print to PDF (native browser)
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CV - ${window.profile?.name || 'Developer'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          .cv-page { max-width: 8.5in; margin: 1in auto; font-size: 11pt; line-height: 1.5; }
          .no-print { display: none; }
        </style>
      </head>
      <body class="cv-page bg-white text-slate-900 p-8">${cvHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };

    // Future: jsPDF + html2canvas for direct download
    console.log('CV generated and ready for print-to-PDF');
  }

  compileCV() {
    const p = window.profile || {};
    const skills = window.skillsData || [];
    const projects = window.projectsData || [];
    const exp = window.experienceData || [];

    return `
      <div class="print:dark:hidden">
        <header class="text-center mb-12 pb-8 border-b-4 border-blue-600">
          <h1 class="text-4xl font-black mb-2">${p.name}</h1>
          <p class="text-2xl text-blue-600">${p.title}</p>
          <p class="mt-4 opacity-75">${p.location} | ${p.contact?.email}</p>
        </header>

        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6 border-b border-slate-300 pb-2">Summary</h2>
          <p>${p.summary || 'Experienced developer.'}</p>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6 border-b border-slate-300 pb-2">Experience</h2>
          ${exp.map(e => `
            <div class="mb-8">
              <h3 class="text-xl font-bold">${e.position} @ <span class="text-blue-600">${e.company}</span></h3>
              <p class="opacity-75 mb-4">${e.duration}</p>
              <ul class="list-disc ml-6 space-y-1">
                ${e.achievements.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </section>

        <div class="grid md:grid-cols-2 gap-12">
          <section>
            <h2 class="text-2xl font-bold mb-6 border-b border-slate-300 pb-2">Skills</h2>
            <div class="grid grid-cols-2 gap-3">
              ${skills.map(s => `<div><strong>${s.name}</strong> (${window.utils.levelToPercent(s.level)}%)</div>`).join('')}
            </div>
          </section>

          <section>
            <h2 class="text-2xl font-bold mb-6 border-b border-slate-300 pb-2">Key Projects</h2>
            <ul class="space-y-2">
              ${projects.slice(0,5).map(pr => `<li><strong>${pr.title}</strong>: ${pr.description.slice(0,80)}...</li>`).join('')}
            </ul>
          </section>
        </div>

        <footer class="mt-16 pt-8 border-t border-slate-300 text-center opacity-75 text-xs">
          Generated automatically from live portfolio data - ${new Date().toLocaleDateString()}
        </footer>
      </div>
    `;
  }

  getCVTemplate() {
    // Predefined professional template
    return 'professional'; // A4, clean layout
  }
}

window.App.generateCV = () => new CVGenerator().generateCV();
export default CVGenerator;
