class vaiiground extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementByClassName('background')}`;
    }
}

window.customElements.define('vaii-ground', vaiiground);
