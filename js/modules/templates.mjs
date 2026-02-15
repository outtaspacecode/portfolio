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
                <sesction class="contact">
                    <h3>Phone</h3>
                    <p>${data.phone}</p>
                    <h3>Email</h3>
                    <p>${data.email}</p>
                    <h3>Links</h3>
                    <section class="links">
                        ${data.links.map(link => `<a href="${link.dest}" target="_blank">${link.name}</a>`).join('')}
                    </section>
                </section>
                <section></section>
            </div>
            <div class="divider"></div>
            <div class="main">
                ${data.experience.map(exp => {
                    return `
                        <section>
                            <h2>${exp.title}</h2>
                            <hr />
                            <p>${exp.content}</p>
                        </section>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}