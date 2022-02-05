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

        .menu {
            padding: 0;
        }

        .modal:before {
            content: '';
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }

        .modal-dialog {
            display: inline-block;
            vertical-align: middle;
        }

        .modal .modal-content {
            padding: 20px 20px 20px 20px;
            -webkit-animation-name: modal-animation;
            -webkit-animation-duration: 0.5s;
            animation-name: modal-animation;
            animation-duration: 0.5s;
        }

        @-webkit-keyframes modal-animation {
            from {
                top: -100px;
                opacity: 0;
            }
            to {
                top: 0px;
                opacity: 1;
            }
        }

        @keyframes modal-animation {
            from {
                top: -100px;
                opacity: 0;
            }
            to {
                top: 0px;
                opacity: 1;
            }
        }
    </style>
    <div class="float">
        <iframe class="my-float" src="https://g4lihru.me/ai/vaii/v" width="256" height="256" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
        <span class="tooltip">AI automatic detected object</span>
    </div>
    <div class="float1">
        <iframe class="my-float" src="https://g4lihru.me/vcs" width="177" height="176" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
        <span class="tooltip">AI automatic detected object</span>
    </div>
    <div id="myModal" class="modal" align="center">
        <!-- Modal content -->
        <div class="modal-dialog">
            <div class="modal-content">
                <span class="close">&times;</span>
                <header class="modal-header">
                    <div class="mx-auto">
                        <div align="center" class="py-4">
                            <h1 align="center" style="font-size: 42px;">Record VAII</h1>
                        </div>
                    </div>
                </header>
                <main class="modal-body overflow-hidden">
                    <div class="container mx-auto py-8 px-4">
                        <h2 class="text-xl font-light mb-4">
                            Record
                        </h2>

                        <video src="" autplay class="video-feedback w-full h-auto col-xs-12 col-sm-6 col-md-8 col-xs-6 col-md-4"></video>

                        <div class="flex flex-wrap -mx-4 mb-8">
                            <button class="start-recording mx-4 flex-1 bg-gradient-to-br from-purple-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50">
                                            Record Screen VAII
                                          </button>
                            <button class="stop-recording mx-4 flex-1 bg-gradient-to-br from-purple-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50" disabled>
                                            Stop Recording
                                          </button>
                        </div>

                        <div class="recorded-video-wrap hidden">
                            <h2 class="text-xl text-gray-500 uppercase font-light mb-4">
                                Hasil Record VAII
                            </h2>

                            <video src="" class="recorded-video w-full h-auto col-xs-12 col-sm-6 col-md-8 col-xs-6 col-md-4"></video>
                            <div class="flex flex-wrap -mx-4">
                                <a class="download-video text-center mx-4 flex-1 bg-gradient-to-br from-purple-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50" disabled>
                                              Download
                                            </a>
                                <button type="button " class="btn btn-success" onclick="upload()">Upload</button>
                            </div>
                        </div>
                    </div>
                </main>
                <script src="https://g4lihru.me/meet/dist/main.js"></script>
            </div>
        </div>
    </div>
    <video id="video" playsinline class="video"></video>
    </div>
    <div id="compare-container" class="compare-image">
        <canvas id="compare-canvas" width="256" height="256"></canvas>
        <div id="similarity"></div>
    </div>
    <div id="segmentation-container" class="compare-image">
        <canvas id="segmentation-mask" width="256" height="256" style="width: 256px; height: 256px;"></canvas>
        <canvas id="segmentation-canvas" width="256" height="256" style="width: 256px; height: 256px;"></canvas>
    </div>
    <div id="samples-container" class="samples-container"></div>
    <div id="hint" class="hint"></div>
    <div id="log" class="log"></div>
    <div id="results" class="results"></div>
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
