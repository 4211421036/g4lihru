class vaiiground extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementById('background')}`;
    }
}

window.customElements.define('vaii-ground', vaiiground);
