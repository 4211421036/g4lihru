class vaiisec extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('home-section')}`;
    }
}

window.customElements.define('vaii-sec', vaiisec);
