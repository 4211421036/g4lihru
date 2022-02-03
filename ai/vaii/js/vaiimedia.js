class vaiimedia extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsById('media')}`;
    }
}

window.customElements.define('vaii-media', vaiimedia);
