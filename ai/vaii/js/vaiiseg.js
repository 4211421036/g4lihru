class vaiiseg extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('compare-image')}`;
    }
}

window.customElements.define('vaii-segmen-container', vaiiseg);
