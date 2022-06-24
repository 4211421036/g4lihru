const template = document.createElement('template');
template.innerHTML = `
    <style>
    @font-face {
        font-family: 'Lato';
        font-display: swap;
        font-style: normal;
        font-weight: 100;
        src: local('Lato'), url('../assets/lato-light.woff2')
    }
    
    html {
        font-family: 'Lato', 'Segoe UI';
        font-size: 16px;
        font-variant: small-caps;
    }
    
    body {
        margin: 0;
        background: black;
        color: white;
        overflow-x: hidden;
        width: 100vw;
        height: 100vh;
    }
    
    body::-webkit-scrollbar {
        display: none;
    }
    
    hr {
        width: 100%;
    }
    
    .play {
        position: absolute;
        width: 256px;
        height: 256px;
        z-index: 9;
        bottom: 35%;
        left: 50%;
        margin-left: -125px;
        display: none;
        filter: grayscale(1);
    }
    
    .play:hover {
        filter: grayscale(0);
    }
    
    .btn-background {
        fill: grey;
        cursor: pointer;
        opacity: 0.6;
    }
    
    .btn-background:hover {
        opacity: 1;
    }
    
    .btn-foreground {
        fill: white;
        cursor: pointer;
        opacity: 0.8;
    }
    
    .btn-foreground:hover {
        opacity: 1;
    }
    
    .status {
        position: absolute;
        width: 90vw;
        bottom: 25%;
        text-align: center;
        font-size: 3rem;
        font-weight: 100;
        text-shadow: 2px 2px #303030;
        right: 1px;
    }
    
    .thumbnail {
        margin: 8px;
        box-shadow: 0 0 4px 4px dimgrey;
    }
    
    .thumbnail:hover {
        box-shadow: 0 0 8px 8px dimgrey;
        filter: grayscale(1);
    }
    
    .log {
        position: absolute;
        left: 0rem;
        bottom: 0rem;
        margin: 0.4rem 0.4rem 0 0.4rem;
        width: 100%;
        font-size: 0.9rem;
    }
    
    recis-bar {
        width: 100%;
        background: #303030;
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        padding: 8px;
        cursor: pointer;
    }
    
    .samples-container {
        display: flex;
        flex-wrap: wrap;
    }
    
    .video {
        display: none;
    }
    
    .canvas {
        margin: 0 auto;
    }
    
    .bench {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    
    .compare-image {
        width: 256px;
        position: absolute;
        top: 150px;
        left: 30px;
        box-shadow: 0 0 2px 2px black;
        background: black;
        display: none;
    }
    
    .loader {
        width: 300px;
        height: 300px;
        border: 3px solid transparent;
        border-radius: 50%;
        border-top: 4px solid #f15e41;
        animation: spin 4s linear infinite;
        position: absolute;
        bottom: 15%;
        left: 50%;
        margin-left: -150px;
        z-index: 15;
    }
    
    .loader::before,
    .loader::after {
        content: "";
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 6px;
        right: 6px;
        border-radius: 50%;
        border: 4px solid transparent;
    }
    
    .loader::before {
        border-top-color: #bad375;
        animation: 3s spin linear infinite;
    }
    
    .loader::after {
        border-top-color: #26a9e0;
        animation: spin 1.5s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .wave {
        position: fixed;
        top: 0;
        left: -90%;
        width: 100vw;
        height: 100vh;
        border-radius: 10%;
        opacity: .3;
        z-index: -1;
    }
    
    .wave.one {
        animation: rotate 10000ms infinite linear;
        background: #2F4F4F;
    }
    
    .wave.two {
        animation: rotate 15000ms infinite linear;
        background: #1F3F3F;
    }
    
    .wave.three {
        animation: rotate 20000ms infinite linear;
        background: #0F1F1F;
    }
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        from {
            transform: rotate(360deg);
        }
    }
    
    </style>
    <recis-ground-wave-one class='wave one'></recis-ground-wave-one>
    <recis-ground-wave-two class='wave two'></recis-ground-wave-two>
    <recis-ground-wave-three class='wave three'></recis-ground-wave-three>`;

class ground extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
window.customElements.define('recis-ground', ground);
