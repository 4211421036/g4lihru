let opdi = document.createElement("opdi-app");
document.body.appendChild(opdi);
let cfg = document.createElement("script");
cfg.setAttribute("src", "js/config.js"), document.body.appendChild(cfg);
let main = document.createElement("script");
main.setAttribute("src", "js/main.js"), document.body.appendChild(main);


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
        let d, s, q;
        i.setAttribute("class", "search"), t.appendChild(i), d = this.hasAttribute("img") ? this.getAttribute("img") : "notifly.svg", s = this.hasAttribute("img") ? this.getAttribute("img") : "profile.svg", q = this.hasAttribute("img") ? this.getAttribute("img") : "logo.svg";
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
        b.href = "#map", b.innerText = "Maps", h.appendChild(b);
        const g = document.createElement("bar-side");
        g.setAttribute("class", "items"), r.appendChild(g);
        const E = document.createElement("a");
        E.href = "#chat", E.innerText = "Chat", g.appendChild(E);
        const y = document.createElement("bar-side");
        y.setAttribute("class", "items"), r.appendChild(y);
        const f = document.createElement("a");
        f.href = "#news", f.innerText = "News", y.appendChild(f);
        const C = document.createElement("bar-side");
        C.setAttribute("class", "items"), r.appendChild(C);
        const A = document.createElement("a");
        A.href = "#pdf", A.innerText = "File PDF", C.appendChild(A);
        const T = document.createElement("link");
        T.setAttribute("rel", "stylesheet"), T.setAttribute("href", "style.css"), e.appendChild(T), e.appendChild(t), e.appendChild(r)
    }
}
customElements.define("opdi-app", OpdiApp);
