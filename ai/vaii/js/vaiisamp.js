class vaiisamp extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('samples-container')}`;
    }
}

window.customElements.define('vaii-samp-container', vaiisamp);
