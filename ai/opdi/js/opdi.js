let opdi = document.createElement("opdi-app")
document.body.appendChild(opdi);

let cfg = document.createElement("script")
cfg.setAttribute('src', 'js/config.js');
document.body.appendChild(cfg);

let main = document.createElement("script")
main.setAttribute('src', 'js/main.js');
document.body.appendChild(main);

let mani = document.createElement("link")
mani.setAttribute('rel', 'manifest');
mani.setAttribute('href', 'manifest.json');
document.getElementsByTagName('head')[0].appendChild(mani);

var today = new Date();

var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

var dateTime = date + ' ' + time;

document.getElementById('time').innerHTML = dateTime;

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("Input-Opdi");
    filter = input.value.toUpperCase();
    ul = document.getElementById("map-bar");
    li = ul.getElementsByTagName("bar-side");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

class OpdiApp extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        const shd = document.createElement('opdi-side')
        shd.setAttribute('class', 'screen')

        const prof = document.createElement('opdi-profile')
        prof.setAttribute('class', 'profile')
        shd.appendChild(prof)

        const nov = document.createElement('opdi-notifly')
        nov.setAttribute('class', 'notifly')
        shd.appendChild(nov)

        const sea = document.createElement('opdi-search')
        sea.setAttribute('class', 'search')
        shd.appendChild(sea)

        let imgpnoti;
        if (this.hasAttribute('img')) {
            imgpnoti = this.getAttribute('img');
        } else {
            imgpnoti = 'notifly.svg';
        }

        let imgpUrl;
        if (this.hasAttribute('img')) {
            imgpUrl = this.getAttribute('img');
        } else {
            imgpUrl = 'profile.svg';
        }

        const sean = document.createElement('input');
        sean.setAttribute('class', 'img-search')
        sean.type = 'text'
        sean.onkeyup = 'myFunction()'
        sean.placeholder = 'Search Menu'
        sean.title = 'Search'
        sean.setAttribute('id', 'Input-Opdi')
        sea.appendChild(sean);

        const imgn = document.createElement('img');
        imgn.setAttribute('class', 'img-notifly')
        imgn.src = imgpnoti;
        nov.appendChild(imgn);

        const imgp = document.createElement('img');
        imgp.setAttribute('class', 'img-profile')
        imgp.src = imgpUrl;
        prof.appendChild(imgp);

        const navs = document.createElement('opdi-bar')
        const mapbas = document.createElement('side-map')

        const mapli = document.createElement('map-bar')
        mapli.setAttribute('id', 'map-bar')
        mapbas.appendChild(mapli)

        const mapa = document.createElement('a')
        mapa.innerText = 'Marketplace'
        mapli.appendChild(mapa)

        const basHom = document.createElement('bar-side')
        navs.appendChild(basHom)

        const likHome = document.createElement('a')
        likHome.innerText = 'Home'
        basHom.appendChild(likHome)

        const basHom2 = document.createElement('bar-side')
        navs.appendChild(basHom2)

        const likHome2 = document.createElement('a')
        likHome2.innerText = 'Hall'
        basHom2.appendChild(likHome2)

        const basHom3 = document.createElement('bar-side')
        navs.appendChild(basHom3)

        const likHome3 = document.createElement('a')
        likHome3.innerText = 'Hall'
        basHom3.appendChild(likHome3)

        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'style.css');

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(shd);
        shadow.appendChild(navs);
        shadow.appendChild(mapbas);
    }
}

// Define the new element
customElements.define('opdi-app', OpdiApp);
