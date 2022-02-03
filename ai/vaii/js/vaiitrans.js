class vaiitrans extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('transcript')}`;
    }
}

window.customElements.define('vaii-transcript', vaiitrans);
