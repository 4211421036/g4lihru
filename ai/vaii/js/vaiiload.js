class vaiiload extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('loader')}`;
    }
}

window.customElements.define('vaii-load', vaiiload);
