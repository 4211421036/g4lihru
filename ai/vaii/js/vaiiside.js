class vaiiside extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('sidebar')}`;
    }
}

window.customElements.define('vaii-side', vaiiside);
