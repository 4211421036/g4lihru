let instance = 0;
let CSScreated = false;

function createCSS() {
  if (CSScreated) return;
  const css = `        
        @font-face  { font-family:Lato; font-display:fallback; font-style:normal; font-weight:100; src:local('Lato'),url('https://g4lihru.me/ai/assets/lato-light.woff2')}
        html  { font-family:Lato,'Segoe UI'; font-size:16px; font-variant:small-caps}
        body  { margin:0; background:#000; color:#fff; overflow-x:hidden; width:100vw; height:100vh}
        body::-webkit-scrollbar  { display:none}
        hr  { width:100%}
        .play  { position:absolute; width:256px; height:256px; z-index:9; bottom:35%; left:50%; margin-left:-125px; display:none; filter:grayscale(1)}
        .button  { width:100%; height:75px}
        .left  { float:left; display:block}
        .right  { float:right; display:block}
        .button ul a  { padding:10px; background:#74b50c; color:#fff}
        .play:hover  { filter:grayscale(0)}
        .btn-background  { fill:grey; cursor:pointer; opacity:.6}
        .btn-background:hover  { opacity:1}
        .btn-foreground  { fill:white; cursor:pointer; opacity:.8}
        .btn-foreground:hover  { opacity:1}
        .status  { position:absolute; width:90vw; bottom:25%; text-align:center; font-size:3rem; font-weight:100; text-shadow:2px 2px #303030; right:1px}
        .thumbnail  { margin:8px; box-shadow:0 0 4px 4px #696969}
        .thumbnail:hover  { box-shadow:0 0 8px 8px #696969; filter:grayscale(1)}
        .log  { position:absolute; left:0; bottom:0; margin:.4rem .4rem 0 .4rem; width:100%; font-size:.9rem; color: #11101d}
        recis-bar  { width:100%; background:#303030; display:flex; justify-content:space-evenly; text-align:center; padding:8px; cursor:pointer}
        .samples-container  { display:flex; flex-wrap:wrap}.video  { display:none}
        .canvas  { margin:0 auto}.bench  { position:absolute; right:0; bottom:0}
        .compare-image  { width:256px; position:absolute; top:150px; left:30px; box-shadow:0 0 2px 2px #000; background:#11101d; opacity: 0.88; display:none}
        .loader  { width:300px; height:300px; border:3px solid transparent; border-radius:50%; border-top:4px solid #f15e41; animation:spin 4s linear infinite; position:absolute; bottom:15%; left:50%; margin-left:-150px; z-index:15}
        .loader::after,.loader::before  { content:""; position:absolute; top:6px; bottom:6px; left:6px; right:6px; border-radius:50%; border:4px solid transparent}
        .loader::before  { border-top-color:#bad375; animation:3s spin linear infinite}
        .loader::after  { border-top-color:#26a9e0; animation:spin 1.5s linear infinite}@keyframes spin  { from  { transform:rotate(0)}to  { transform:rotate(360deg)}}
        .wave  { position:fixed; top:0; left:-90%; width:100vw; height:100vh; border-radius:10%; opacity:.3; z-index:-1}
        .wave.one  { animation:rotate 10s infinite linear; background:#2f4f4f}
        .wave.two  { animation:rotate 15s infinite linear; background:#1f3f3f}
        .wave.three  { animation:rotate 20s infinite linear; background:#0f1f1f}
        @keyframes rotate  { from  { transform:rotate(0)}from  { transform:rotate(360deg)}}
        .button  { text-shadow:2px 2px #000; display:flex}
        .button:hover  { text-shadow:-2px -2px #000; color:#add8e6}
        .button::before  { display:inline-block; font-style:normal; font-variant:normal; text-rendering:auto; -webkit-font-smoothing:antialiased; font-family:FA; font-weight:900; font-size:2.4rem; margin-right:.4rem}
        .button-display::before  { content:"\f8c4"}
        .button-image::before  { content:"\f3f2"}
        .button-process::before  { content:"\f3f0"}
        .button-model::before  { content:"\f2c2"}
        .button-start::before  { content:"\f144"}
        .button-stop::before  { content:"\f28b"}
        recis-bar-icon.icon  { width:180px; text-align:-webkit-center; text-align:-moz-center; filter:grayscale(1)}
        recis-bar-icon.icon:hover  { background:#505050; filter:grayscale(0)}
        .hint  { opacity:0; transition-duration:.5s; transition-property:opacity; font-style:italic; position:fixed; top:10rem; padding:8px; margin:8px; box-shadow:0 0 2px 2px #303030; color:#000}
        .input-file  { align-self:center; width:5.2rem}
        .results  { position:absolute; opacity: 0.93; left:0; top:5rem; background:#11101d; width:20rem; height:85%; border-top-right-radius: 35px; border-bottom-right-radius: 35px; font-size:.8rem; overflow-y:auto; display:none}
        .results::-webkit-scrollbar  { background-color: transparent;}
        .results::-webkit-scrollbar-thumb  { background:#a7a7a7; border-radius:10px}
        .json-line  { margin:4px 0; display:flex; justify-content:flex-start}
        .json  { margin-right:8px; margin-left:8px}
        .json-type  { color:#ffffe0}.json-key  { color:#fff}
        .json-index  { color:#f08080}
        .json-value  { margin-left:20px}
        .json-number  { color:#90ee90}
        .json-boolean  { color:#ffffe0}
        .json-string  { color:#add8e6}
        .json-size  { color:gray}
        .hide  { display:none}
        .fas  { display:inline-block; width:0; height:0; border-style:solid}
        .fa-caret-down  { border-width:10px 8px 0 8px; border-color:#fff transparent}
        .fa-caret-right  { border-width:10px 0 8px 10px; border-color:transparent transparent transparent #fff}
        body,html  { width:100%; height:100%; margin:0; border:0; overflow:hidden; display:block}
        .float  { position:fixed; bottom:40px; right:40px; text-align:center; overflow:hidden}
        .float1  { position:fixed; bottom:288px; right:40px; text-align:center; overflow:hidden}
        .my-float  { margin-top:22px}
        .menu  { padding:0}
        .modal:before  { content:''; display:inline-block; height:100%; vertical-align:middle}
        .modal-dialog  { display:inline-block; vertical-align:middle}
        .modal-dialog::-webkit-scrollbar-thumb  { background-color: #626262;}
        .modal-dialog::-webkit-scrollbar-track  { box-shadow: none;}
        .modal .modal-content  { padding:20px 20px 20px 20px; -webkit-animation-name:modal-animation; -webkit-animation-duration:.5s; animation-name:modal-animation; animation-duration:.5s}
        @-webkit-keyframes modal-animation  { from  { top:-100px; opacity:0}to  { top:0; opacity:1}}
        @keyframes modal-animation  { from  { top:-100px; opacity:0}to  { top:0; opacity:1}}
        modal-plant-map { display: block; position: absolute;}
        ::-webkit-scrollbar-track  { border-radius:5px; box-shadow:inset 0 0 10px rgba(0,0,0,.25)}
        ::-webkit-scrollbar-thumb  { border-radius:5px; background-color:#11101d}
        ::-webkit-scrollbar-thumb:hover  { background:#555; cursor: grab;}
        recis-side  { position:fixed; left:0; top:0; height:100%; width:78px; background:#11101d; padding:6px 14px; z-index:99; transition:all .5s ease}
        recis-side.show  { width:250px}
        recis-side.bx-menu::before  { content:"\eac1"}
        recis-side.show .bx-menu::after  { content:"\eac3";  transition:all .20s ease}
        recis-side.show .bx-menu::before  { content:""\eb54""; display:none;  transition:all .20s ease}
        recis-side.show .bx-search::after  { content:"\eb54"; top:2.5rem; position:absolute; left:1rem; background:0 0}
        recis-side .bx-search::before  { content:"\eb54"; display:none}
        recis-side .bxs-video-recording::before  { content:"\eab8"; top:1.4rem; position:absolute; left:.8rem}
        recis-side recis-logo.logo-details  { height:60px; display:flex; align-items:center; position:relative}
        recis-side recis-logo.logo-details .icon  { opacity:0; transition:all .5s ease}
        recis-side recis-logo.logo-details recis-text.logo_name  { color:#fff; font-size:20px; font-weight:600; opacity:0; transition:all .5s ease}
        recis-side.show .logo-details .icon,recis-side.show .logo-details .logo_name  { opacity:1}
        recis-side recis-logo.logo-details i#btn  { position:absolute; top:78%; right:0; transform:translateY(-50%); font-size:22px; transition:all .4s ease; font-size:23px; text-align:center; cursor:pointer; transition:all .5s ease}
        recis-side.show recis-logo.logo-details i#btn  { text-align:right}
        recis-side i  { color:#fff; height:60px; min-width:50px; font-size:28px; text-align:center; line-height:60px}
        recis-side ul.nav-list  { margin-top:20px; height:25rem; overflow-y:scroll}
        recis-side li  { position:relative; margin:8px 0; list-style:none}
        recis-side ul.nav-list li span.tooltip  { position:absolute; top:-20px; left:calc(100% + 15px); z-index:3; background:#000; box-shadow:0 5px 10px rgba(0,0,0,.3); padding:6px 12px; border-radius:4px; font-size:15px; font-weight:400; opacity:0; white-space:nowrap; pointer-events:none; transition:0s; text-decoration:none}
        recis-side ul.nav-list li:hover span.tooltip  { opacity:1; pointer-events:auto; transition:all .4s ease; top:50%; transform:translateY(-50%); text-decoration:none}
        recis-side.show ul li .tooltip  { display:none}
        recis-side input  { font-size:15px; color:#fff; font-weight:400; outline:0; height:50px; width:100%; width:50px; border:none; border-radius:12px; transition:all .5s ease; background:#1d1b31; top:0; position:absolute; left:0}
        recis-side.show input  { padding:0 20px 0 50px; width:100%; top:1.5rem; position:absolute; left:0;  background-color: transparent;  border-style: solid;  border-color: white;  border-radius: 45px}
        recis-side i.bxs-hdd  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side i.bxs-videos  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side i.bx-desktop  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side i.bxs-brush-alt  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side i.bx-stats  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side i.bxs-game  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side .bxs-video-recording  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side i.bxl-instagram-alt  { top:0; margin-top:1.8rem; left:0; transform:translateY(-50%); font-size:22px; background-size:2.4rem; color:#fff}
        recis-side li a  { display:flex; height:100%; width:100%; border-radius:12px; align-items:center; text-decoration:none; transition:all .4s ease; background:#11101d}
        recis-side li a:hover  { background:#fff; text-decoration:none}
        recis-side li a span.links_name  { color:#fff; font-size:15px; font-weight:400; white-space:nowrap; opacity:0; pointer-events:none; transition:.4s; text-decoration:none}
        recis-side.show li a span.links_name  { opacity:1; pointer-events:auto; text-decoration:none}
        recis-side li a:hover i, recis-side li a:hover span.links_name  { transition:all .5s ease; color:#11101d; text-decoration:none}
        recis-side li button  { display:flex; height:100%; width:100%; border-radius:12px; align-items:center; text-decoration:none; transition:all .4s ease; background:#11101d}
        recis-side li button:hover  { background:#fff}
        recis-side li button span.links_name  { color:#fff; font-size:15px; font-weight:400; white-space:nowrap; opacity:0; pointer-events:none; transition:.4s}
        recis-side.show li a span.links_name  { opacity:1; pointer-events:auto; text-decoration:none}
        recis-side li button:hover i,recis-side li button:hover span.links_name  { transition:all .5s ease; color:#11101d}
        recis-side li i  { height:50px; line-height:50px; font-size:18px; border-radius:12px}
        recis-side li.profile  { position:fixed; height:60px; width:78px; left:0; bottom:-8px; padding:10px 14px; background:#1d1b31; transition:all .5s ease; overflow:hidden}
        recis-side.show li.profile  { width:250px}
        recis-side.show ul li.profile-details  { display:flex; align-items:center; flex-wrap:nowrap}
        recis-side.show li img  { height:45px; width:45px; object-fit:cover; border-radius:6px; margin-right:10px}
        recis-side.sidebar li img  { height:45px; width:45px; object-fit:cover; border-radius:6px; margin-right:10px}
        recis-side li.profile i#log_out  { position:absolute; top:50%; right:0; transform:translateY(-50%); background:#1d1b31; width:100%; height:60px; line-height:60px; border-radius:0; transition:all .5s ease}
        recis-side.show li.profile i#log_out  { width:50px; background:0 0}
        recis-sec.home-section  { display: block; position:relative; background:#e4e9f7; min-height:100vh; top:0; left:78px; width:calc(100% - 78px); transition:all .5s ease; z-index:2}
        recis-side.show~recis-sec.home-section  { left:250px; width:calc(100% - 250px)}
        recis-sec.home-section recis-text.text  { display:inline-block; color:#11101d; font-size:25px; font-weight:500; margin:18px}
        recis-sec.home-section recis-media-container video#videoRECIS { width: 210px; border-radius: 25px; position: absolute; top: 0.1rem; right: 0.1rem; cursor: move;}
        recis-media-container recis-media-container-plant { right: 0px; top: 217px; width: 74px; height: 76px; border-radius: 60px 0px 0px 60px; display: flex; background: #11101D; position: fixed; box-shadow: rgb(0 0 0 / 15%) 0px 4px 12px 0px; justify-content: center; align-items: center; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 700;}
        recis-media-container recis-media-container-plant::after { width: 52px; height: 52px; content: ''; border-color: inherit; opacity: 0; position: absolute; border-radius: 50%; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); animation-duration: 1.3s; animation-name: ; animation-iteration-count: infinite; animation-delay: 1s;}
        recis-media-container recis-media-container-plant svg { width: 64px; height: 64px; fill: none; z-index: 1; pointer-events: none;}
        recis-media-container recis-media-container-plant button { width: 64px; height: 64px; margin: 0; padding: 0; border: none; background: transparent; position: absolute; border-radius: 50%; cursor: pointer; z-index: 1;}
        @media (max-width:420px)  { .sidebar li .tooltip  { display:none}}::-webkit-scrollbar  { width:10px}
        @media only screen and (min-device-width: 425px) and (max-device-width: 767px) and (orientation:portrait){ recis-side ul.nav-list{margin-top:2rem;height:30rem;overflow-y:scroll;overflow-x:hidden}}
        @media only screen and (min-device-width: 768px){ recis-side ul.nav-list{margin-top: 2rem;height:23rem;overflow-y:scroll;overflow-x:hidden}}
        @media only screen and (min-device-width: 375px) and (max-device-width: 424px) and (orientation:portrait){ recis-side ul.nav-list{margin-top:2rem;height:50rem;overflow-y:scroll;overflow-x:hidden}}
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) and (orientation:portrait){recis-side ul.nav-list{margin-top:2rem;height:30rem;overflow-y:scroll;overflow-x:hidden}}
  `;
  const el = document.createElement('style');
  el.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(el);
  CSScreated = true;
}