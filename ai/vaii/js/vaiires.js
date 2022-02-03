class vaiires extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('results')}`;
    }
}

window.customElements.define('vaii-results', vaiires);
