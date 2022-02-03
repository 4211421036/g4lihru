class vaiilog extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('log')}`;
    }
}

window.customElements.define('vaii-log', vaiilog);
