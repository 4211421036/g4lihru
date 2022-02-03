class vaiiplay extends HTMLElement {
    constructor() {
        super();
        this.interHTML = `${this.getElementById('play')}`;
    }
}

window.customElements.define('vaii-play', pelajaran);
