class vaiistatus extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('status')}`;
    }
}

window.customElements.define('vaii-status', vaiistatus);
