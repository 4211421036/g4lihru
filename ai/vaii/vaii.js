const template = document.createElement('template');
template.innerHTML = `
    <link rel="manifest" href="https://g4lihru.me/demo/manifest.webmanifest">
    <link rel="shortcut icon" href="https://g4lihru.me/987654567.png" type="image/x-icon">
    <link rel="apple-touch-icon" href="https://g4lihru.me/987654567.png">
    <link rel="stylesheet" type="text/css" href="https://g4lihru.me/ai/vaii/icons.css">
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://g4lihru.me/meet/dist/tailwind.css" />
    <script src="https://g4lihru.me/script.js" defer></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiiside.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiiplay.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiiground.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiiload.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiistatus.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiibar.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiimedia.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiicom.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiiseg.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiisamp.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiihint.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiilog.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiires.js"></script>
    <script src="https://g4lihru.me/ai/vaii/js/vaiitrans.js"></script>
    <script src="https://g4lihru.me/ai/vaii/index.js" type="module"></script>
    <script src="https://code.responsivevoice.org/responsivevoice.js?key=BLzc1i7C"></script>
    <style>
    html, body {
          width: 100%;
          height: 100%;
          margin: 0px;
          border: 0;
          overflow: hidden; /*  Disable scrollbars */
          display: block;  /* No floating content on sides */
        }
        .float {
            position:fixed;
            bottom:40px;
            right:40px;
            text-align:center;
            overflow: hidden;
        }
        .float1 {
            position:fixed;
            bottom:288px;
            right:40px;
            text-align:center;
            overflow: hidden;
        }
        
        .my-float {
            margin-top: 22px;
        }        
        .menu {
            padding: 0;
        }
        
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
                
        hr {
            width: 100%;
        }
        
        .play {
            position: absolute;
            width: 256px;
            height: 256px;
            z-index: 9;
            bottom: 50%;
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
            width: 100vw;
            bottom: 44%;
            left: 0;
            text-align: center;
            font-size: 3rem;
            font-weight: 100;
            text-shadow: 2px 2px #303030;
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
            bottom: 45%;
            margin: 0.4rem 0.4rem 0 0.4rem;
            font-size: 0.9rem;
        }
        
        .menubar {
            width: auto;
            background: #303030;
            display: flex;
            justify-content: space-evenly;
            text-align: center;
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
            bottom: 50%;
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
        
        .button {
            text-shadow: 2px 2px black;
            display: flex;
        }
        
        .button:hover {
            text-shadow: -2px -2px black;
            color: lightblue;
        }
        
        .button::before {
            display: inline-block;
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            font-family: "FA";
            font-weight: 900;
            font-size: 2.4rem;
            margin-right: 0.4rem;
        }
        
        .button-display::before {
            content: "\f8c4";
        }
        
        .button-image::before {
            content: "\f3f2";
        }
        
        .button-process::before {
            content: "\f3f0";
        }
        
        .button-model::before {
            content: "\f2c2";
        }
        
        .button-start::before {
            content: "\f144";
        }
        
        .button-stop::before {
            content: "\f28b";
        }
        
        .icon {
            width: 180px;
            text-align: -webkit-center;
            text-align: -moz-center;
            filter: grayscale(1);
        }
        
        .icon:hover {
            background: #505050;
            filter: grayscale(0);
        }
        
        .hint {
            opacity: 0;
            transition-duration: 0.5s;
            transition-property: opacity;
            font-style: italic;
            color: #000;
            position: fixed;
            top: 12rem;
            padding: 8px;
            margin: 8px;
            box-shadow: 0 0 2px 2px #303030;
        }
        
        .input-file {
            align-self: center;
            width: 5rem;
        }
        
        .results {
            position: absolute;
            left: 0;
            top: 5rem;
            background: #303030;
            width: 20rem;
            height: 90%;
            font-size: 0.8rem;
            overflow-y: auto;
            display: none
        }
        
        .results::-webkit-scrollbar {
            background-color: #303030;
        }
        
        .results::-webkit-scrollbar-thumb {
            background: black;
            border-radius: 10px;
        }
        
        .json-line {
            margin: 4px 0;
            display: flex;
            justify-content: flex-start;
        }
        
        .json {
            margin-right: 8px;
            margin-left: 8px;
        }
        
        .json-type {
            color: lightyellow;
        }
        
        .json-key {
            color: white;
        }
        
        .json-index {
            color: lightcoral;
        }
        
        .json-value {
            margin-left: 20px;
        }
        
        .json-number {
            color: lightgreen;
        }
        
        .json-boolean {
            color: lightyellow;
        }
        
        .json-string {
            color: lightblue;
        }
        
        .json-size {
            color: gray;
        }
        
        .hide {
            display: none;
        }
        
        .fas {
            display: inline-block;
            width: 0;
            height: 0;
            border-style: solid;
        }
        
        .fa-caret-down {
            border-width: 10px 8px 0 8px;
            border-color: white transparent
        }
        
        .fa-caret-right {
            border-width: 10px 0 8px 10px;
            border-color: transparent transparent transparent white;
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
        
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 78px;
            background: #11101D;
            padding: 6px 14px;
            z-index: 99;
            transition: all 0.5s ease;
        }
        
        .sidebar.open {
            width: 250px;
        }
        
        .sidebar .logo-details {
            height: 60px;
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .sidebar .logo-details .icon {
            opacity: 0;
            transition: all 0.5s ease;
        }
        
        .sidebar .logo-details .logo_name {
            color: #fff;
            font-size: 20px;
            font-weight: 600;
            opacity: 0;
            transition: all 0.5s ease;
        }
        
        .sidebar.open .logo-details .icon,
        .sidebar.open .logo-details .logo_name {
            opacity: 1;
        }
        
        .sidebar .logo-details #btn {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            font-size: 22px;
            transition: all 0.4s ease;
            font-size: 23px;
            text-align: center;
            cursor: pointer;
            transition: all 0.5s ease;
        }
        
        .sidebar.open .logo-details #btn {
            text-align: right;
        }
        
        .sidebar i {
            color: #fff;
            height: 60px;
            min-width: 50px;
            font-size: 28px;
            text-align: center;
            line-height: 60px;
        }
        
        .sidebar .nav-list {
            margin-top: 20px;
            height: 100%;
        }
        
        .sidebar li {
            position: relative;
            margin: 8px 0;
            list-style: none;
        }
        
        .sidebar li .tooltip {
            position: absolute;
            top: -20px;
            left: calc(100% + 15px);
            z-index: 3;
            background: #000;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 400;
            opacity: 0;
            white-space: nowrap;
            pointer-events: none;
            transition: 0s;
        }
        
        .sidebar li:hover .tooltip {
            opacity: 1;
            pointer-events: auto;
            transition: all 0.4s ease;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .sidebar.open li .tooltip {
            display: none;
        }
        
        .sidebar input {
            font-size: 15px;
            color: #FFF;
            font-weight: 400;
            outline: none;
            height: 50px;
            width: 100%;
            width: 50px;
            border: none;
            border-radius: 12px;
            transition: all 0.5s ease;
            background: #1d1b31;
        }
        
        .sidebar.open input {
            padding: 0 20px 0 50px;
            width: 100%;
        }
        
        .sidebar .bx-search {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-size: 22px;
            background: #1d1b31;
            color: #FFF;
        }
        
        .sidebar.open .bx-search:hover {
            background: #1d1b31;
            color: #FFF;
        }
        
        .sidebar .bx-search:hover {
            background: #FFF;
            color: #11101d;
        }
        
        .sidebar li a {
            display: flex;
            height: 100%;
            width: 100%;
            border-radius: 12px;
            align-items: center;
            text-decoration: none;
            transition: all 0.4s ease;
            background: #11101D;
        }
        
        .sidebar li a:hover {
            background: #FFF;
        }
        
        .sidebar li a .links_name {
            color: #fff;
            font-size: 15px;
            font-weight: 400;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: 0.4s;
        }
        
        .sidebar.open li a .links_name {
            opacity: 1;
            pointer-events: auto;
        }
        
        .sidebar li a:hover .links_name,
        .sidebar li a:hover i {
            transition: all 0.5s ease;
            color: #11101D;
        }
        
        .sidebar li i {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            border-radius: 12px;
        }
        
        .sidebar li.profile {
            position: fixed;
            height: 60px;
            width: 78px;
            left: 0;
            bottom: -8px;
            padding: 10px 14px;
            background: #1d1b31;
            transition: all 0.5s ease;
            overflow: hidden;
        }
        
        .sidebar.open li.profile {
            width: 250px;
        }
        
        .sidebar li .profile-details {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
        }
        
        .sidebar li img {
            height: 45px;
            width: 45px;
            object-fit: cover;
            border-radius: 6px;
            margin-right: 10px;
        }
        
        .sidebar li.profile .name,
        .sidebar li.profile .job {
            font-size: 15px;
            font-weight: 400;
            color: #fff;
            white-space: nowrap;
        }
        
        .sidebar li.profile .job {
            font-size: 12px;
        }
        
        .sidebar .profile #log_out {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            background: #1d1b31;
            width: 100%;
            height: 60px;
            line-height: 60px;
            border-radius: 0px;
            transition: all 0.5s ease;
        }
        
        .sidebar.open .profile #log_out {
            width: 50px;
            background: none;
        }
        
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

        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          border-radius: 5px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.25); 
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background-color: #11101D; 
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
    </style>
    <section class="home-section">
                <div class="text">VAII</div>
                <vaii-play disabled id="play" class="play icon-play"></vaii-play>
                <vaii-ground id="background" class="background">
                    <div class='wave one'></div>
                    <div class='wave two'></div>
                    <div class='wave three'></div>
                </vaii-ground>
                <vaii-load id="loader" class="loader"></vaii-load>
                <vaii-status id="status" class="status"></vaii-status>
                <vaii-bar id="menubar" class="menubar">
                    <div id="btnDisplay" class="icon">
                        <div class="icon-binoculars"> </div>display</div>
                    <div id="btnImage" class="icon">
                        <div class="icon-brush"></div>input</div>
                    <div id="btnProcess" class="icon">
                        <div class="icon-stats"></div>options</div>
                    <div id="btnModel" class="icon">
                        <div class="icon-games"></div>models</div>
                    <div id="chatVAII" class="icon">
                        <div id="myBtn" class="icon-record"></div>Start</div>
                    <div id="btnStart" class="icon">
                        <div class="icon-webcam"></div><span id="btnStartText">start video</span></div>
                </vaii-bar>
                <vaii-media id="media">
                    <canvas id="canvas" class="canvas" style='position:absolute; left:0px; top:0px;'></canvas>
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
                </vaii-media>
                <vaii-compare-container id="compare-container" class="compare-image">
                    <canvas id="compare-canvas" width="256" height="256"></canvas>
                    <div id="similarity"></div>
                </vaii-compare-container>
                <vaii-segmen-container id="segmentation-container" class="compare-image">
                    <canvas id="segmentation-mask" width="256" height="256" style="width: 256px; height: 256px;"></canvas>
                    <canvas id="segmentation-canvas" width="256" height="256 " style="width: 256px; height: 256px;"></canvas>
                </vaii-segmen-container>
                <vaii-samp-container id="samples-container" class="samples-container"></vaii-samp-container>
                <vaii-hint id="hint" class="hint"></vaii-hint>
                <vaii-log id="log" class="log"></vaii-log>
                <vaii-results id="results" class="results"></vaii-results>
                <vaii-transcript id="transcript"></vaii-transcript>
            </section>
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
window.customElements.define('vaii', vaii);
