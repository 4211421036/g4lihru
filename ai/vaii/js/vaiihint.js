class vaiihint extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('hint')}`;
    }
}

window.customElements.define('vaii-hint', vaiihint);
