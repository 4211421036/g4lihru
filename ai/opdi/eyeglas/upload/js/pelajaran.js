class pelajaran extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('posts')}`;
    }
}

window.customElements.define('pljr-post', pelajaran);