export function resumeTemplate(data) {
    return `
        <section class="head">
            <h1>${data.name}</h1>
            <h2>${data.title}</h2>
        </section>
        <hr />
        <div class="content">
            <div class="sidebar">
                <section>
                    <h2>Profile</h2>
                    <p>${data.profile}</p>
                </section>
                <section class="contact">
                    <h3>Phone</h3>
                    <p>${data.phone}</p>
                    <h3>Email</h3>
                    <p>${data.email}</p>
                    <h3>Links</h3>
                    <section class="links">
                        ${data.links.map(link => `<a href="${link.dest}" target="_blank">${link.name}</a>`).join('')}
                    </section>
                </section>
                <section>
                    <h3>Additional Information</h3>
                    <h4>Spoken Languages</h4>
                    <ul>
                        ${data.additionalInfo.languages.map(lang => `<li>${lang.name} (${lang.proficiency})</li>`).join('')}
                    </ul>
                </section>
            </div>
            <div class="divider"></div>
            <div class="main">
                ${educationSectionTemplate(data.experience.education)}
                ${workSectionTemplate(data.experience.work)}
                ${skillSectionTemplate(data.experience.skills)}
            </div>
        </div>
    `;
}

function educationSectionTemplate(data) {
    return `
        <section>
            <h2>Education</h2>
            <hr />
            <p>${data.title}</p>
            <p>${data.school} - ${data.location}</p>
            <h4>Relevant Technical Projects</h4>
            <ul>
                ${getListItems(data.projects)}
            </ul>
        </section>
    `;
}

function workSectionTemplate(data) {
    return `
        <section>
            <h2>Work Experience</h2>
            <hr />
            ${data.map(job => `
                <h4>${job.title}</h4>
                <h5>${job.business} - ${job.location}</h5>
                <p>${job.date}</p>
                <ul>
                    ${getListItems(job.skills)}
                </ul>
            `).join('')}
        </section>
    `;
}

function skillSectionTemplate(data) {
    return `
        <section>
            <h2>Technical Skills</h2>
            <hr />
            <h4>Languages</h4>
            <ul>
                ${getListItems(data.languages)}
            </ul>
            <h4>Frameworks</h4>
            <ul>
                ${getListItems(data.frameworks)}
            </ul>
        </section>
    `;
}

function getListItems(data) {
    return data.map(item => `<li>${item}</li>`).join('');
}
