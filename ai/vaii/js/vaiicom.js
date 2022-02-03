class vaiicom extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('compare-image')}`;
    }
}

window.customElements.define('vaii-compare-container', vaiicom);
