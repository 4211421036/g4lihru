let opdi = document.createElement("opdi-app")
document.body.appendChild(opdi);

let cfg = document.createElement("script")
cfg.setAttribute('src', 'js/config.js');
document.body.appendChild(cfg);

let main = document.createElement("script")
main.setAttribute('src', 'js/main.js');
document.body.appendChild(main);

let mani = document.createElement("link")
main.setAttribute('rel', 'manifest');
main.setAttribute('href', 'manifest.json');
document.head.appendChild(mani);

let dex = document.createElement("script")
dex.setAttribute('src', 'index.js');
dex.setAttribute('defer', '');
document.head.appendChild(dex);

class OpdiApp extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create header
        const header = document.createElement('opdi-header');
        header.setAttribute('class', 'header');

        const icon = document.createElement('opdi-header-home');
        icon.setAttribute('class', 'home');
        icon.setAttribute('tabindex', 0);

        const info = document.createElement('opdi-header-info');
        info.setAttribute('class', 'app-all');

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        info.textContent = text;

        // Insert icon
        let imgUrl;
        if (this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'home.svg';
        }

        const img = document.createElement('img');
        img.setAttribute('class', 'all-home')
        img.src = imgUrl;
        icon.appendChild(img);

        let imgAUrl;
        if (this.hasAttribute('img')) {
            imgAUrl = this.getAttribute('img');
        } else {
            imgAUrl = 'app.svg';
        }

        const butapp = document.createElement('button')
        butapp.setAttribute('data-link', '')
        butapp.setAttribute('class', 'butapp')

        const imgAll = document.createElement('img');
        imgAll.setAttribute('class', 'all-apps')
        imgAll.src = imgAUrl;
        butapp.appendChild(imgAll);

        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'style.css');

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(header);
        header.appendChild(icon);
        header.appendChild(info);
        info.appendChild(butapp)
    }
}

// Define the new element
customElements.define('opdi-app', OpdiApp);
