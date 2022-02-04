const template = document.createElement('template');
template.innerHTML ="";
template.innerHTML = `
<style>
        .home-section {
            position: relative;
            background: #E4E9F7;
            min-height: 100vh;
            top: 0;
            left: 78px;
            width: calc(100% - 78px);
            transition: all 0.5s ease;
            z-index: 2;
        }
        .card {
	    font-family: 'Arial', sans-serif;
	    background: #f4f4f4;
	    width: 100%;
            grid-gap: 10px;
            margin-bottom: 15px;
	    border-bottom: coral 5px solid;
	}

	.card video {
	    width: 100%;
            height: 100%;
	}
        .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px
        }

        .sidebar.open~.home-section {
            left: 250px;
            width: calc(100% - 250px);
        }
        
        .home-section .text {
            display: inline-block;
            color: #11101d;
            font-size: 25px;
            font-weight: 500;
            margin: 18px
        }
        
        @media (max-width: 420px) {
            .sidebar li .tooltip {
                display: none;
            }
        }
</style>
<body>
        <section class="home-section">
            <div class="text">
            </div>
        </section>
</body>
`;

class plvideo extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('div').innerText = this.getAttribute('name');
    }
}

window.customElements.define('pljr-video', plvideo);
