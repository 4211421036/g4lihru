class vaiisec extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementsByClassName('my-sec')}`;
    }
}

window.customElements.define('vaii-sec', vaiisec);
