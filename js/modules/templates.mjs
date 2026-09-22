export function resumeTemplate(data) {
  return `
    <section class="head">
      <h1>${data.name}</h1>
      <h2>${data.title}</h2>
    </section>
    <hr />
    <div class="content">
      ${sidebarTemplate(data)}
      <div class="divider"></div>
      <div class="main">
        ${educationSectionTemplate(data.experience.education)}
        ${skillSectionTemplate(data.experience.skills)}
        ${projectSectionTemplate(data.experience.projects)}
        ${workSectionTemplate(data.experience.work)}
      </div>
    </div>
  `;
}

function sidebarTemplate(data) {
  return `
    <div class="sidebar">
      <section class="profile">
        <h2>Profile</h2>
        <p>${data.profile}</p>
      </section>
      <section class="contact">
        <h3>Phone</h3>
        <a href="tel:+12086040269">${data.phone}</a>
        <h3>Email</h3>
        <a href="mailto:${data.email}">${data.email}</a>
        <h3>Links</h3>
        <section class="links">
          ${data.links.map((link) => `<a href="${link.dest}" target="_blank">${link.name}</a>`).join('')}
        </section>
      </section>
      <section class="additional-info">
        <h3>Additional Information</h3>
        <h4>Spoken Languages</h4>
        <ul>
          ${data.additionalInfo.languages.map((lang) => `<li>${lang.name} (${lang.proficiency})</li>`).join('')}
        </ul>
      </section>
    </div>
  `;
}

function educationSectionTemplate(data) {
  return `
    <h2>Education</h2>
    <hr />
    <section class="education">
      <p>${data.title}</p>
      <p>${data.school} - ${data.location}</p>
    </section>
  `;
}

function workSectionTemplate(data) {
  return `
    <h2>Work Experience</h2>
    <hr />
    <section class="work">
      ${data
        .map(
          (job) => `
          <h4>${job.title}</h4>
          <h5>${job.business} - ${job.location}</h5>
          <p>${job.date}</p>
          <ul>
            ${getListItems(job.skills)}
          </ul>
        `,
        )
        .join('')}
    </section>
  `;
}

function projectSectionTemplate(data) {
  return `
    <h2>Technical Projects</h2>
    <hr />
    <section class="projects">
        ${data
          .map(
            (project) => `
          <section>
            <h3>${project.name} (${project.skills.map((s) => s).join(', ')})</h3>
            <hr class="light-rule" />
            <ul>
              ${getListItems(project.points)}
            </u>
          </section>
        `,
          )
          .join('')}
    </section>
  `;
}

function skillSectionTemplate(data) {
  return `
    <h2>Technical Skills</h2>
    <hr />
    <section class="skills">
      ${Object.entries(data)
        .map(
          ([key, item]) => `
          <section>
            <h3>${capitalize(key)}</h3>
            <hr class="light-rule" />
            <ul>
              ${getListItems(item)}
            </ul>
          </section>
        `,
        )
        .join('')}
    </section>
  `;
}

function getListItems(data) {
  return data.map((item) => `<li>${item}</li>`).join('');
}

function capitalize(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
