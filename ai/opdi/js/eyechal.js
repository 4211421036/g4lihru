let opdi = document.createElement("opdi-app");
document.body.appendChild(opdi);
let cfg = document.createElement("script");
cfg.setAttribute("src", "../js/config.js"), document.body.appendChild(cfg);
let main = document.createElement("script");
main.setAttribute("src", "../js/main.js"), document.body.appendChild(main);

function back() {
    window.location.replace("/ai/opdi");
}

function eyetes() {
    window.location.replace("/ai/opdi/eyetes/");
}
function eyelans() {
    window.location.replace("/ai/opdi/eyelans/");
}
function eyefac() {
    window.location.replace("/ai/opdi/eyefac/");
}
function eyedoc() {
    window.location.replace("/ai/opdi/eyedoc/");
}
function eyevit() {
    window.location.replace("/ai/opdi/eyevit/");
}
function eyeglas() {
    window.location.replace("/ai/opdi/eyeglas/");
}
function eyeque() {
    window.location.replace("/ai/opdi/eyeque/");
}
function eyehel() {
    window.location.replace("/ai/opdi/eyehel/");
}
function eyechal() {
    window.location.replace("/ai/opdi/eyechal/");
}

function myFunction() { var e, t, n, a; for (e = document.getElementById("Input-Opdi").value.toUpperCase(), t = document.getElementById("map-bar").getElementsByTagName("bar-side"), a = 0; a < t.length; a++)((n = t[a].getElementsByTagName("a")[0]).textContent || n.innerText).toUpperCase().indexOf(e) > -1 ? t[a].style.display = "" : t[a].style.display = "none" }
class OpdiApp extends HTMLElement {
    constructor() {
        super();
        const e = this.attachShadow({ mode: "open" }),
            t = document.createElement("opdi-side");
        t.setAttribute("class", "screen");
        const r = document.createElement("odpi-icon");
        const tr = document.createElement("opdi-text");
        tr.setAttribute('class', 'scope-text'), tr.id = 'scope-tx', tr.innerText = 'pada fitur ini kamu diharuskan melakukan test mata yang tertera disini, kamu ada dites perhari seberapa sehat matamu challange ini hanya untuk visual acuity';
        r.appendChild(tr)
        const n = document.createElement("opdi-title");
        n.setAttribute("class", "profile"), t.appendChild(n);
        const l = document.createElement("opdi-back");
        l.setAttribute('onclick', 'back()'),
            t.appendChild(l);
        const k = document.createElement("opdi-logo");
        k.setAttribute('class', 'scope-log')
        t.appendChild(k);
        const j = document.createElement('opdi-text');
        j.setAttribute('class', 'logo-text'), j.innerText = 'CHALLANGE', k.appendChild(j)
        const i = document.createElement("opdi-search");
        let s, q, lp, xi, v, mi;
        i.setAttribute("class", "search"), t.appendChild(i), s = this.hasAttribute("img") ? this.getAttribute("img") : "../data/icon/profile.svg", lp = this.hasAttribute("img") ? this.getAttribute("img") : "../data/icon/search.svg", xi = this.hasAttribute("img") ? this.getAttribute("img") : "../data/icon/eyeim.svg",mi = this.hasAttribute("img") ? this.getAttribute("img") : "../data/icon/eyecha.svg", v = this.hasAttribute("img") ? this.getAttribute("img") : "../data/icon/back.svg", q = this.hasAttribute("img") ? this.getAttribute("img") : "../data/icon/eyechco.svg";
        const c = document.createElement("input");
        c.setAttribute("class", "img-search"), c.type = "text", c.onkeyup = "myFunction()", c.placeholder = "Search Menu", c.title = "Search", c.setAttribute("id", "Input-Opdi"), i.appendChild(c);
        const um = document.createElement("img");
        um.setAttribute("class", "scope-ico",), um.id = 'scope-co',
            um.alt = "Logo", um.src = mi, r.appendChild(um);
        const uv = document.createElement("img");
        uv.setAttribute("class", "back", ), uv.id = 'back',
            uv.alt = "cricle", uv.src = v, l.appendChild(uv);
        const ui = document.createElement("img");
        ui.setAttribute("class", "circ", ), ui.id = 'circ',
            ui.alt = "cricle", ui.src = xi, n.appendChild(ui);
        const m = document.createElement("img");
        m.setAttribute("class", "img-profile myprofile", ), m.id = 'profile',
            m.alt = "profile", m.src = s, n.appendChild(m);
        const w = document.createElement("img");
        w.setAttribute("class", "logo-gla"), w.alt = "profile", w.src = q, k.appendChild(w);
        const lo = document.createElement("img");
        lo.setAttribute("class", "img-searc"), lo.id = "img-sear"
        lo.alt = "search", lo.src = lp, i.appendChild(lo);
        const T = document.createElement("link");
        T.setAttribute("rel", "stylesheet"), T.setAttribute("href", "style.css"), e.appendChild(T), e.appendChild(t), e.appendChild(r)
    }
}
customElements.define("opdi-app", OpdiApp);
