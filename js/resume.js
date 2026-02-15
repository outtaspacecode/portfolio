import { getJson } from "./modules/utilities.mjs";
import { resumeTemplate } from "./modules/templates.mjs";

async function init() {
    const main = document.querySelector('main');
    const data = await getJson('./resume.json');
    const html = resumeTemplate(data);
    main.insertAdjacentHTML('beforeend', html);
}

init();
