const template = document.createElement('template');
template.innerHTML = `
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0px;
            border: 0;
            overflow: hidden;
            /*  Disable scrollbars */
            display: block;
            /* No floating content on sides */
        }

        .float {
            position: fixed;
            bottom: 40px;
            right: 40px;
            text-align: center;
            overflow: hidden;
        }

        .float1 {
            position: fixed;
            bottom: 288px;
            right: 40px;
            text-align: center;
            overflow: hidden;
        }

        .my-float {
            margin-top: 22px;
        }
    </style>
    <div class="float">
        <iframe class="my-float" src="https://g4lihru.me/ai/vaii/v" width="256" height="256" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
    </div>
    <div class="float1">
        <iframe class="my-float" src="https://g4lihru.me/ai/vaii/vaii-call" width="177" height="176" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
    </div>
`;

class vaii extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
window.customElements.define('vaii-video', vaii);
