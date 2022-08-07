let opdi = document.createElement("opdi-app");
document.body.appendChild(opdi);
let cfg = document.createElement("script");
cfg.setAttribute("src", "js/config.js"), document.body.appendChild(cfg);
let main = document.createElement("script");
main.setAttribute("src", "js/main.js"), document.body.appendChild(main);

function eyetes() {
    window.location.replace("/ai/opdi/eyetes/");
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
        const n = document.createElement("opdi-profile");
        n.setAttribute("class", "profile"), t.appendChild(n);
        const k = document.createElement("opdi-logo");
        t.appendChild(k);
        const j = document.createElement('opdi-text');
        j.setAttribute('class', 'logo-text'), j.innerText = 'EyeTest', k.appendChild(j)
        const z = document.createElement('opdi-username');
        z.innerText = 'Hallo\nJaga Kesehatan Matamu Ya', k.appendChild(z)
        const a = document.createElement("opdi-notifly");
        a.setAttribute("class", "notifly"), t.appendChild(a);
        const i = document.createElement("opdi-search");
        let d, s, q, lp;
        i.setAttribute("class", "search"), t.appendChild(i), d = this.hasAttribute("img") ? this.getAttribute("img") : "data/icon/notifly.svg", s = this.hasAttribute("img") ? this.getAttribute("img") : "data/icon/profile.svg", lp = this.hasAttribute("img") ? this.getAttribute("img") : "data/icon/search.svg", q = this.hasAttribute("img") ? this.getAttribute("img") : "data/icon/logo.svg";
        const c = document.createElement("input");
        c.setAttribute("class", "img-search"), c.type = "text", c.onkeyup = "myFunction()", c.placeholder = "Search Menu", c.title = "Search", c.setAttribute("id", "Input-Opdi"), i.appendChild(c);
        const l = document.createElement("img");
        l.setAttribute("class", "img-notifly"), l.alt = "Notifly", l.src = d, a.appendChild(l);
        const m = document.createElement("img");
        m.setAttribute("class", "img-profile myprofile", ), m.id = 'profile',
            m.alt = "profile", m.src = s, n.appendChild(m);
        const w = document.createElement("img");
        w.setAttribute("class", "img-logo"), w.alt = "profile", w.src = q, k.appendChild(w);
        const r = document.createElement("opdi-bar");
        r.setAttribute("class", "bar-op op-di");
        const h = document.createElement("bar-side");
        h.setAttribute("class", "items"), r.appendChild(h);
        const b = document.createElement("a");
        b.href = "#file", b.innerText = "File", h.appendChild(b);
        const g = document.createElement("bar-side");
        g.setAttribute("class", "items"), r.appendChild(g);
        const E = document.createElement("a");
        E.href = "#chat", E.innerText = "Chat", g.appendChild(E);
        const lo = document.createElement("img");
        lo.setAttribute("class", "img-searc"), lo.id = "img-sear", lo.alt = "search", lo.src = lp, i.appendChild(lo);
        const y = document.createElement("bar-side");
        y.setAttribute("class", "items"), r.appendChild(y);
        const f = document.createElement("a");
        f.href = "#news", f.innerText = "News", y.appendChild(f);
        const C = document.createElement("bar-side");
        C.setAttribute("class", "items"), r.appendChild(C);
        const A = document.createElement("a");
        A.href = "#howto", A.innerText = "How to", C.appendChild(A);
        const AB = document.createElement("a");
        const AC = document.createElement("bar-side");
        AC.setAttribute("class", "items"), r.appendChild(AC);
        AB.href = "#reward", AB.innerText = "Reward", AC.appendChild(AB);
        const T = document.createElement("link");
        T.setAttribute("rel", "stylesheet"), T.setAttribute("href", "style.css"), e.appendChild(T), e.appendChild(t), e.appendChild(r)
    }
}
customElements.define("opdi-app", OpdiApp);
