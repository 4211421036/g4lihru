let instance = 0;
let CSScreated = false;

let theme = {
  background: 'transparent',
  hover: '#4b4681',
  itemBackground: '#1d1b31',
  itemColor: 'white',
  buttonBackground: 'lightblue',
  buttonHover: 'lightgreen',
  checkboxSt: 'transparent',
  checkboxOn: 'lightgreen',
  checkboxOff: 'lightcoral',
  rangeBackground: 'lightblue',
  rangeLabel: 'white',
  chartColor: 'lightblue',
};

function createCSS() {
  if (CSScreated) return;
  const css = `
  :root { --rounded: 0.1rem; }
  
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
  
  .menu { position: absolute; top: 0rem; right: 0; min-width: 180px; width: max-content; padding: 0.2rem 0.8rem 0 0.8rem; line-height: 1.8rem; z-index: 10; background: ${theme.background}; border: none }
  .button { text-shadow: none; }

  .menu-container { display: block; max-height: 100vh; left: 250px; top: -0.9rem; position: absolute; background-color: #11101d; transform: translate(10px, 0px); }
  .menu-container-fadeout { max-height: 0; overflow: hidden; transition: max-height, 0.5s ease; }
  .menu-container-fadein { max-height: 85vh; overflow: hidden; transition: max-height, 0.5s ease; overflow-y: scroll; }
  .menu-container-fadein::-webkit-scrollbar-thumb { background-color: #626262; border-radius: 10px; }
  .menu-container-fadein::-webkit-scrollbar-track { box-shadow: none; }
  .menu-item { display: flex; white-space: nowrap; padding: 0.2rem; cursor: default; width: 100%; }
  .menu-item:hover { background: ${theme.hover} }
  .menu-title { cursor: pointer; }
  .menu-hr { margin: 0.2rem; border: 1px solid rgba(0, 0, 0, 0.5) }
  .menu-label { padding: 0; font-weight: 800; }

  .menu-list { margin-right: 0.8rem; }
  select:focus { outline: none; }
  .menu-list-item { background: ${theme.itemBackground}; color: ${theme.itemColor}; border: none; padding: 0.2rem; font-family: inherit;
    font-variant: inherit; border-radius: var(--rounded); font-weight: 800; }

  .menu-chart-title { padding: 0; font-size: 0.8rem; font-weight: 800; align-items: center}
  .menu-chart-canvas { background: transparent; margin: 0.2rem 0 0.2rem 0.6rem; }
  
  .menu-button { border: 0; background: ${theme.buttonBackground}; width: -webkit-fill-available; padding: 8px; margin: 8px; cursor: pointer;
    border-radius: var(--rounded); justify-content: center; font-family: inherit; font-variant: inherit; font-size: 1rem; font-weight: 800; }
  .menu-button:hover { background: ${theme.buttonHover}; box-shadow: 4px 4px 4px 0 black; }
  .menu-button:focus { outline: none; }

  .menu-checkbox { width: 2.6rem; height: 1rem; background: ${theme.itemBackground}; margin: 0.5rem 1.0rem 0 0; position: relative; border-radius: var(--rounded); }
  .menu-checkbox:after { content: 'OFF'; color: ${theme.checkboxOff}; position: absolute; right: 0.2rem; top: -0.4rem; font-weight: 800; font-size: 0.5rem; }
  .menu-checkbox:before { content: 'ON'; color: ${theme.checkboxOn}; position: absolute; left: 0.3rem; top: -0.4rem; font-weight: 800; font-size: 0.5rem; }
  .menu-checkbox-label { width: 1.3rem; height: 1rem; cursor: pointer; position: absolute; top: 0; right: 0rem; z-index: 1; background: ${theme.checkboxSt}; border: 1px solid ${theme.checkboxOff};
    border-radius: var(--rounded); transition: right 0.6s ease; }

  input[type=checkbox] { visibility: hidden; }
  input[type=checkbox]:checked + label { left: 0; background: ${theme.checkboxSt}; border: 1px solid ${theme.checkboxOn} }

  .menu-range { margin: 0.2rem 1.0rem 0 0; width: 5rem; background: transparent; color: ${theme.rangeBackground}; }
  .menu-range:before { color: ${theme.rangeLabel}; margin: 0 0.4rem 0 0; font-weight: 800; font-size: 0.9rem; position: relative; top: 0.1rem; content: attr(value); }


  recis-input-cont::-webkit-slider-runnable-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-track::-webkit-slider-runnable-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-track::-moz-range-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-tumb::-webkit-slider-thumb { border: 1px solid #000000; margin-top: 0; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: pointer; -webkit-appearance: none; }
  recis-input-slider-tumb::-moz-range-thumb { border: 1px solid #000000; margin-top: 0rem; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: pointer; -webkit-appearance: none; }

  input[type=range] { -webkit-appearance: none; }
  recis-input-slider-container input[type=range]::-webkit-slider-runnable-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-container input[type=range]::-moz-range-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-track input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-track input[type=range]::-moz-range-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-thumb input[type=range]::-webkit-slider-thumb { border: 1px solid #000000; margin-top: 0; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: pointer; -webkit-appearance: none; }
  recis-input-slider-thumb input[type=range]::-moz-range-thumb { border: 1px solid #000000; margin-top: 0rem; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: pointer; -webkit-appearance: none; }

  input[type=range]::-webkit-slider-runnable-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  input[type=range]::-moz-range-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  input[type=range]::-moz-range-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  input[type=range]::-webkit-slider-thumb { border: 1px solid #000000; margin-top: 0; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: grab; -webkit-appearance: none; }
  input[type=range]:hover::-webkit-slider-runnable-tumb { width: 100%; height: 1rem; cursor: grabbing; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  input[type=range]::-moz-range-thumb { border: 1px solid #000000; margin-top: 0rem; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: grab; -webkit-appearance: none; }
  input[type=range]:hover::-moz-range-thumb { border: 1px solid #000000; margin-top: 0rem; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: grabbing; -webkit-appearance: none; }

  input[type=file]::-webkit-file-upload-button { -webkit-appearance: button; cursor: pointer; font: inherit; background-color: #11101d; color: white; border-radius: 25px; border: 3px solid #f0f6fc; }

  recis-input-slider-container[type=range]::-webkit-slider-runnable-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-container[type=range]::-moz-range-container { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-track[type=range]::-webkit-slider-runnable-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-track[type=range]::-moz-range-track { width: 100%; height: 1rem; cursor: pointer; background: ${theme.itemBackground}; border-radius: var(--rounded); border: 1px; }
  recis-input-slider-thumb[type=range]::-webkit-slider-thumb { border: 1px solid #000000; margin-top: 0; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: pointer; -webkit-appearance: none; }
  recis-input-slider-thumb[type=range]::-moz-range-thumb { border: 1px solid #000000; margin-top: 0rem; height: 1rem; width: 0.6rem; border-radius: var(--rounded); background: ${theme.rangeBackground}; cursor: pointer; -webkit-appearance: none; }

  .svg-background { fill:#303030; cursor:pointer; opacity: 0.6; }
  .svg-foreground { fill:white; cursor:pointer; opacity: 0.8; }
  `;
  const el = document.createElement('style');
  el.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(el);
  CSScreated = true;
}

class Menu {
    constructor(parent, title, position, userTheme) {
        if (userTheme) theme = {...theme, ...userTheme };
        createCSS();
        this.createMenu(parent, title, position);
        this.id = 0;
        this.instance = instance;
        instance++;
        this._maxFPS = 0;
        this.hidden = false;
    }

    createMenu(parent, title = '', position = { top: null, left: null, bottom: null, right: null }) {
        /** @type {HTMLDivElement} */
        this.menu = document.createElement('recis-menu');
        this.menu.id = `menu-${instance}`;
        this.menu.className = 'menu';
        if (position) {
            if (position.top) this.menu.style.top = `${position.top}`;
            if (position.bottom) this.menu.style.bottom = `${position.bottom}`;
            if (position.left) this.menu.style.left = `${position.left}`;
            if (position.right) this.menu.style.right = `${position.right}`;
        }

        this.container = document.createElement('recis-menu-contain');
        this.container.id = `menu-container-${instance}`;
        this.container.className = 'menu-container menu-container-fadein';

        // set menu title with pulldown arrow
        const elTitle = document.createElement('recis-menu-title');
        elTitle.className = 'menu-title';
        elTitle.id = `menu-title-${instance}`;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 2rem; height: 2rem; vertical-align: top;">
        <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zm-51.37 182.31L232.06 348.16a10.38 10.38 0 0 1-16.12 0L99.37 214.31C92.17 206 97.28 192 107.43 192h233.14c10.15 0 15.26 14 8.06 22.31z" class="svg-background"/>
        <path d="M348.63 214.31L232.06 348.16a10.38 10.38 0 0 1-16.12 0L99.37 214.31C92.17 206 97.28 192 107.43 192h233.14c10.15 0 15.26 14 8.06 22.31z" class="svg-foreground"/>
      </svg>`;
        if (title) elTitle.innerHTML = `${title}${svg}`;
        this.menu.appendChild(elTitle);
        elTitle.addEventListener('click', () => {
            if (this.container && this.menu) {
                this.container.classList.toggle('menu-container-fadeout');
                this.container.classList.toggle('menu-container-fadein');
                // this.menu.style.borderStyle = this.container.classList.contains('menu-container-fadeout') ? 'none' : 'solid';
            }
        });

        this.menu.appendChild(this.container);
        if (typeof parent === 'object') parent.appendChild(this.menu);
        // @ts-ignore undefined
        else document.getElementById(parent).appendChild(this.menu);
    }

    get newID() {
        this.id++;
        return `menu-${this.instance}-${this.id}`;
    }

    get ID() {
        return `menu-${this.instance}-${this.id}`;
    }

    get width() {
        return this.menu ? this.menu.offsetWidth : 0;
    }

    get height() {
        return this.menu ? this.menu.offsetHeight : 0;
    }

    hide() {
        if (this.container && this.container.classList.contains('menu-container-fadein')) {
            this.container.classList.toggle('menu-container-fadeout');
            this.container.classList.toggle('menu-container-fadein');
        }
    }

    visible() {
        return (this.container ? this.container.classList.contains('menu-container-fadein') : false);
    }

    toggle(evt) {
        if (this.container && this.menu) {
            this.container.classList.toggle('menu-container-fadeout');
            this.container.classList.toggle('menu-container-fadein');
            /*
            if (this.container.classList.contains('menu-container-fadein') && evt) {
              const x = evt.x || (evt.touches && evt.touches[0] ? evt.touches[0].pageX : null);
              // const y = evt.y || (evt.touches && evt.touches[0] ? evt.touches[0].pageY : null);
              if (x) this.menu.style.left = `${x - (this.menu.offsetWidth / 2)}px`;
              // if (y) this.menu.style.top = '5.5rem'; // `${evt.y + 55}px`;
              if (this.menu.offsetLeft < 0) this.menu.style.left = '0';
              if ((this.menu.offsetLeft + this.menu.offsetWidth) > window.innerWidth) {
                this.menu.style.left = '';
                this.menu.style.right = '0';
              }
              // this.menu.style.borderStyle = 'solid';
            } else {
              // this.menu.style.borderStyle = 'none';
            }
            */
        }
    }

    addTitle(title) {
        const el = document.createElement('recis-menu-title');
        el.className = 'menu-title';
        el.id = this.newID;
        el.innerHTML = title;
        if (this.menu) this.menu.appendChild(el);
        el.addEventListener('click', () => {
            this.hidden = !this.hidden;
            const all = document.getElementsByClassName('menu');
            for (const item of all) {
                // @ts-ignore
                item.style.display = this.hidden ? 'none' : 'block';
            }
        });
        return el;
    }

    addLabel(title) {
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item menu-label';
        el.id = this.newID;
        el.innerHTML = title;
        if (this.container) this.container.appendChild(el);
        return el;
    }

    addBool(title, object, variable, callback) {
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item';
        el.innerHTML = `<recis-menu-check class="menu-checkbox"><input class="menu-checkbox" type="checkbox" id="${this.newID}" ${object[variable] ? 'checked' : ''}/><label class="menu-checkbox-label" for="${this.ID}" title="Status"></label></recis-menu-check>${title}`;
        if (this.container) this.container.appendChild(el);
        el.addEventListener('change', (evt) => {
            if (evt.target) {
                object[variable] = evt.target['checked'];
                if (callback) callback(evt.target['checked']);
            }
        });
        return el;
    }

    async addList(title, items, selected, callback) {
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item';
        let options = '';
        for (const item of items) {
            const def = item === selected ? 'selected' : '';
            options += `<option value="${item}" ${def}>${item}</option>`;
        }
        el.innerHTML = `<div class="menu-list"><select name="${this.ID}" title="${title}" class="menu-list-item">${options}</select><label for="${this.ID}" title="Status"></label></div>${title}`;
        el.style.fontFamily = document.body.style.fontFamily;
        el.style.fontSize = document.body.style.fontSize;
        el.style.fontVariant = document.body.style.fontVariant;
        if (this.container) this.container.appendChild(el);
        el.addEventListener('change', (evt) => {
            if (callback && evt.target) callback(items[evt.target['selectedIndex']]);
        });
        return el;
    }

    addRange(title, object, variable, min, max, step, callback) {
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item';
        el.innerHTML = `<input class="menu-range" type="range" title="${title}" id="${this.newID}" min="${min}" max="${max}" step="${step}" value="${object[variable]}">${title}`;
        if (this.container) this.container.appendChild(el);
        el.addEventListener('change', (evt) => {
            if (evt.target) {
                object[variable] = parseInt(evt.target['value']) === parseFloat(evt.target['value']) ? parseInt(evt.target['value']) : parseFloat(evt.target['value']);
                // @ts-ignore
                evt.target.setAttribute('value', evt.target['value']);
                if (callback) callback(evt.target['value']);
            }
        });
        el['input'] = el.children[0];
        return el;
    }

    addHTML(html) {
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item';
        el.id = this.newID;
        if (html) el.innerHTML = html;
        if (this.container) this.container.appendChild(el);
        return el;
    }

    addButton(titleOn, titleOff, callback) {
        const el = document.createElement('button');
        el.className = 'menu-item menu-button';
        el.style.fontFamily = document.body.style.fontFamily;
        el.style.fontSize = document.body.style.fontSize;
        el.style.fontVariant = document.body.style.fontVariant;
        el.type = 'button';
        el.id = this.newID;
        el.innerText = titleOn;
        if (this.container) this.container.appendChild(el);
        el.addEventListener('click', () => {
            if (el.innerText === titleOn) el.innerText = titleOff;
            else el.innerText = titleOn;
            if (callback) callback(el.innerText !== titleOn);
        });
        return el;
    }

    addValue(title, val, suffix = '') {
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item';
        el.id = `menu-val-${title}`;
        el.innerText = `${title}: ${val}${suffix}`;
        if (this.container) this.container.appendChild(el);
        return el;
    }

    // eslint-disable-next-line class-methods-use-this
    updateValue(title, val, suffix = '') {
        const el = document.getElementById(`menu-val-${title}`);
        if (el) el.innerText = `${title}: ${val}${suffix}`;
        else this.addValue(title, val);
    }

    addChart(title, id, width = 150, height = 40, color) {
        if (color) theme.chartColor = color;
        const el = document.createElement('recis-menu-item');
        el.className = 'menu-item menu-chart-title';
        el.id = this.newID;
        el.innerHTML = `<font color=${theme.chartColor}>${title}</font><canvas id="menu-canvas-${id}" class="menu-chart-canvas" width="${width}px" height="${height}px"></canvas>`;
        if (this.container) this.container.appendChild(el);
        return el;
    }

    // eslint-disable-next-line class-methods-use-this
    async updateChart(id, values) {
        if (!values || (values.length === 0)) return;
        /** @type {HTMLCanvasElement} */
        // @ts-ignore undefined
        const canvas = document.getElementById(`menu-canvas-${id}`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = theme.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const width = canvas.width / values.length;
        const max = 1 + Math.max(...values);
        const height = canvas.height / max;
        for (let i = 0; i < values.length; i++) {
            const gradient = ctx.createLinearGradient(0, (max - values[i]) * height, 0, 0);
            gradient.addColorStop(0.1, theme.chartColor);
            gradient.addColorStop(0.4, theme.background);
            ctx.fillStyle = gradient;
            ctx.fillRect(i * width, 0, width - 4, canvas.height);
            ctx.fillStyle = theme.background;
            ctx.font = `${width / 1.5}px "Segoe UI"`;
            ctx.fillText(Math.round(values[i]).toString(), i * width + 1, canvas.height - 1, width - 1);
        }
    }
}

export default Menu;
