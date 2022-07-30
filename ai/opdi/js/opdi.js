let hai = document.createElement("opdi-app")
document.body.appendChild(hai);

let css = {
    primarycolor: 'red'
}

// Create a class for the element
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


        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'style.css');

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(header);
        header.appendChild(icon);
        header.appendChild(info);
    }
}

// Define the new element
customElements.define('opdi-app', OpdiApp);
