class pel extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('container')}`;
    }
}

window.customElements.define('pljr', pel);