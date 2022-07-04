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
  const linkmani = document.createElement('link');
  const linkElem = document.createElement('link');
  const linkElem1 = document.createElement('link');
  const linkElem2 = document.createElement('link');
  const linkElem3 = document.createElement('link');
  const mtcss = document.createElement('link');
  const googcss = document.createElement('link');
  const googcss2 = document.createElement('link');
  const googcss3 = document.createElement('link');
  const boxcss = document.createElement('link');
  const icon = document.createElement('link');
  const icon2 = document.createElement('link');
  const iconku = document.createElement('link');
  const conjs = document.createElement('script');
  const conjs1 = document.createElement('script');
  const conjs2 = document.createElement('script');
  const conjs3 = document.createElement('script');
  
  linkElem.setAttribute('rel', 'stylesheet');
  linkElem.setAttribute('href', '//g4lihru.me/ai/recis/css/styles.css');

  linkElem1.setAttribute('rel', 'stylesheet');
  linkElem1.setAttribute('href', 'https://g4lihru.me/meet/dist/tailwind.css');

  linkElem2.setAttribute('rel', 'stylesheet');
  linkElem2.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
  
  linkElem3.setAttribute('rel', 'stylesheet');
  linkElem3.setAttribute('href', 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');
  
  googcss.setAttribute('rel', 'stylesheet');
  googcss.setAttribute('href', 'https://fonts.googleapis.com/css?family=Open+Sans:700&display=swap');

  googcss2.setAttribute('rel', 'stylesheet');
  googcss2.setAttribute('href', 'https://fonts.googleapis.com/css?family=Open+Sans:600&display=swap');

  googcss3.setAttribute('rel', 'stylesheet');
  googcss3.setAttribute('href', 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
  
  mtcss.setAttribute('rel', 'stylesheet');
  mtcss.setAttribute('href', 'https://g4lihru.me/ai/recis/icons.css');

  linkmani.setAttribute('rel', 'manifest');
  linkmani.setAttribute('href', '//g4lihru.me/ai/recis/manifest.json');
  
  conjs.setAttribute('rel', 'canonical');
  conjs.setAttribute('src', 'https://g4lihru.me/ai/recis/recisside.js');
  
  conjs1.setAttribute('rel', 'canonical');
  conjs1.setAttribute('src', '//code.jquery.com/ui/1.11.2/jquery-ui.js');

  conjs2.setAttribute('rel', 'canonical');
  conjs2.setAttribute('src', '//code.jquery.com/jquery-1.10.2.js');
  
  conjs3.setAttribute('rel', 'canonical');
  conjs3.setAttribute('href', 'https://g4lihru.me/script.js');
  
  icon.setAttribute('rel', 'shortcut icon');
  icon.setAttribute('href', 'https://g4lihru.me/987654567.png');
  icon.setAttribute('type', 'image/x-icon');

  icon2.setAttribute('rel', 'apple-touch-icon');
  icon2.setAttribute('href', 'https://g4lihru.me/987654567.png');

  iconku.setAttribute('rel', 'icon');
  iconku.setAttribute('href', 'data:image/png; base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAuCAYAAAC4e0AJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGwWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4wLWMwMDAgNzkuMjE3YmNhNiwgMjAyMS8wNi8xNC0xODoyODoxMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0xMS0wOFQxODowMTozMiswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTEtMDhUMTg6MDk6NDErMDc6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMTEtMDhUMTg6MDk6NDErMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE0ZmI2ZjFhLTY3NjYtM2Q0MC1iYzU1LWNmYjFkY2QzMjZkNCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVkYzMxMDNjLTZjNmUtZmU0Yy05NjVhLTVjYTFjNWU4OTI5NCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMxNzRmMWE1LTZjNGYtOGU0YS04MGQ3LWQxY2ZiYjdlMmFlMiI+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6YWIwYTYzYmYtOWFjNC1jMDRmLTg2ZTEtZGUwNDIzMjFkZTVjPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzE3NGYxYTUtNmM0Zi04ZTRhLTgwZDctZDFjZmJiN2UyYWUyIiBzdEV2dDp3aGVuPSIyMDIxLTExLTA4VDE4OjAxOjMyKzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTRmYjZmMWEtNjc2Ni0zZDQwLWJjNTUtY2ZiMWRjZDMyNmQ0IiBzdEV2dDp3aGVuPSIyMDIxLTExLTA4VDE4OjA5OjQxKzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ws3IrAAAB8JJ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');
  
  
  document.getElementsByTagName('head')[0].appendChild(el);
  document.getElementsByTagName('head')[0].appendChild(linkElem);
  document.getElementsByTagName('head')[0].appendChild(linkElem1);
  document.getElementsByTagName('head')[0].appendChild(linkElem2);
  document.getElementsByTagName('head')[0].appendChild(linkElem3);
  document.getElementsByTagName('head')[0].appendChild(linkmani);
  document.getElementsByTagName('head')[0].appendChild(icon);
  document.getElementsByTagName('head')[0].appendChild(icon2);
  document.getElementsByTagName('head')[0].appendChild(iconku);
  document.getElementsByTagName('head')[0].appendChild(conjs);
  document.getElementsByTagName('head')[0].appendChild(conjs1);
  document.getElementsByTagName('head')[0].appendChild(conjs2);
  document.getElementsByTagName('head')[0].appendChild(conjs3);
  document.getElementsByTagName('head')[0].appendChild(mtcss);
  document.getElementsByTagName('head')[0].appendChild(googcss);
  document.getElementsByTagName('head')[0].appendChild(googcss2);
  document.getElementsByTagName('head')[0].appendChild(googcss3);
  
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
