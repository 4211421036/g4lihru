class vaiibar extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('menubar')}`;
    }
}

window.customElements.define('vaii-bar', vaiibar);
