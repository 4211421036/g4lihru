(() => {
    "use strict";
    const e = (e, n, o) => {
            const i = e.attachShadow({ mode: "open" }),
                s = document.createElement("template");
            s.innerHTML = '<style>@import "index.js"; @import "styles.css";' + o + "</style>" + t(n, e);
            const a = s.content;
            i.appendChild(a.cloneNode(!0))
        },
        t = (e, t) => {
            const n = (Window.lastComponentId ? Window.lastComponentId : 0) + 1;
            Window.lastComponentId = n;
            const o = "component" + n;
            return Window[o] = t, e.replaceAll("this.", "Window." + o + ".")
        };

    function n(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var o = 0;

    function i(e) { return "__private_" + o++ + "_" + e }
    var s = i("instance"),
        a = i("myDataChannel"),
        r = i("callbackOnMessage");
    class c {
        constructor() {
            if (Object.defineProperty(this, a, { writable: !0, value: void 0 }), Object.defineProperty(this, r, { writable: !0, value: void 0 }), n(c, s)[s]) return n(c, s)[s];
            n(c, s)[s] = this
        }
        getNewMessages(e) { n(this, r)[r] = e }
        setupDataChannel(e) { e.ondatachannel = e => { e.channel.onmessage = e => { n(this, r)[r] && n(this, r)[r](e.data) } }, n(this, a)[a] = e.createDataChannel("myDataChannel") }
        sendChatMessage(e) { n(this, a)[a].send(e) }
    }

    function d(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    Object.defineProperty(c, s, { writable: !0, value: void 0 });
    var h = 0;

    function l(e) { return "__private_" + h++ + "_" + e }
    const p = Object.freeze({ Room: "room", ICE: "ice" });
    var u = l("instance"),
        m = l("firestore");
    class f {
        constructor() {
            if (Object.defineProperty(this, m, { writable: !0, value: void 0 }), d(f, u)[u]) return d(f, u)[u];
            d(f, u)[u] = this, d(this, m)[m] = firebase.firestore()
        }
        async newRoom() { return (await d(this, m)[m].collection(p.Room).add({ open: !0, hostOffer: null, guestAnswer: null })).id }
        async roomExist(e) { return (await d(this, m)[m].collection(p.Room).doc(e).get()).exists }
        async saveOffer(e, t) { await d(this, m)[m].collection(p.Room).doc(e).update({ hostOffer: { type: t.type, sdp: t.sdp } }) }
        async saveAnswer(e, t) { await d(this, m)[m].collection(p.Room).doc(e).update({ guestAnswer: { type: t.type, sdp: t.sdp } }) }
        async saveIce(e, t, n) { await d(this, m)[m].collection(p.Room).doc(e).collection(p.ICE).add({ ice: t, fromHost: n }) }
        getRoomUpdates(e, t) { d(this, m)[m].collection(p.Room).doc(e).onSnapshot((e => { t(e.data()) })) }
        getRoomIceUpdates(e, t, n) { d(this, m)[m].collection(p.Room).doc(e).collection(p.ICE).where("fromHost", "==", t).onSnapshot((e => { e.docChanges().forEach((e => { "added" === e.type && n(e.doc.data().ice) })) })) }
    }

    function w(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    Object.defineProperty(f, u, { writable: !0, value: void 0 });
    var v = 0;

    function b(e) { return "__private_" + v++ + "_" + e }
    var g = b("instance"),
        y = b("firebaseService"),
        O = b("dataChannelService"),
        C = b("myRtcConnection"),
        R = b("roomID"),
        j = b("isHost"),
        P = b("connected"),
        x = b("haveAnswered"),
        E = b("addHostOffer"),
        I = b("addGuestAnswer");
    class T {
        constructor() {
            if (Object.defineProperty(this, I, { value: M }), Object.defineProperty(this, E, { value: _ }), Object.defineProperty(this, y, { writable: !0, value: new f }), Object.defineProperty(this, O, { writable: !0, value: new c }), Object.defineProperty(this, C, { writable: !0, value: void 0 }), Object.defineProperty(this, R, { writable: !0, value: void 0 }), Object.defineProperty(this, j, { writable: !0, value: null }), Object.defineProperty(this, P, { writable: !0, value: !1 }), Object.defineProperty(this, x, { writable: !0, value: !1 }), w(T, g)[g]) return w(T, g)[g];
            w(T, g)[g] = this
        }
        getIsHost() { return w(this, j)[j] }
        getRoomId() { return w(this, R)[R] }
        async newRoom() { w(this, R)[R] = await w(this, y)[y].newRoom(), w(this, j)[j] = !0 }
        async joinRoom(e) { const t = await w(this, y)[y].roomExist(e); return t && (w(this, j)[j] = !1, w(this, R)[R] = e), t }
        setupPeerConnection(e, t) { w(this, C)[C] = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun2.1.google.com:19302" }] }), e.getTracks().forEach((e => { w(this, C)[C].addTrack(e, new MediaStream) })), w(this, C)[C].ontrack = e => { t(e.streams[0]), w(this, P)[P] = !0 }, w(this, C)[C].onicecandidate = e => { e.candidate && w(this, y)[y].saveIce(w(this, R)[R], e.candidate.toJSON(), w(this, j)[j]) }, w(this, O)[O].setupDataChannel(w(this, C)[C]) }
        async createAndSaveOffer() {
            const e = await w(this, C)[C].createOffer();
            await w(this, C)[C].setLocalDescription(e), w(this, y)[y].saveOffer(w(this, R)[R], e)
        }
        async connectToOtherPerson() { w(this, y)[y].getRoomUpdates(w(this, R)[R], (e => { e.guestAnswer && w(this, j)[j] && w(this, I)[I](e.guestAnswer), !e.hostOffer || w(this, x)[x] || w(this, j)[j] || w(this, E)[E](e.hostOffer) })), w(this, y)[y].getRoomIceUpdates(w(this, R)[R], !w(this, j)[j], (async e => { await w(this, C)[C].addIceCandidate(new RTCIceCandidate(e)) })), w(this, j)[j] && await this.createAndSaveOffer() }
    }
    Object.defineProperty(T, g, { writable: !0, value: void 0 });
    var _ = async function(e) {
            w(this, x)[x] = !0, await w(this, C)[C].setRemoteDescription(e);
            const t = await w(this, C)[C].createAnswer();
            await w(this, C)[C].setLocalDescription(t), await w(this, y)[y].saveAnswer(w(this, R)[R], t)
        },
        M = async function(e) { await w(this, C)[C].setRemoteDescription(e) };
    const k = Object.freeze({ Home: { path: "/", component: "vaii-page-home", title: "Home" }, Room: { path: "/room", component: "vaii-page-room", title: "Room" }, About: { path: "/about", component: "vaii-page-about", title: "About" } });

    function H(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var L = 0;

    function A(e) { return "__private_" + L++ + "_" + e }
    var S = A("WebRTCService"),
        D = A("bc"),
        V = A("gotoRoomPage");
    class B extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, V, { value: U }), Object.defineProperty(this, S, { writable: !0, value: new T }), Object.defineProperty(this, D, { writable: !0, value: void 0 }), e(this, '<h1>Start new room</h1>\n<button class="button" onclick="this.newRoom()">New Room</button>\n<h1>Join Room</h1>\n<div>\n  <input\n    is="text-input"\n    id="roomIdInput"\n    class="input"\n    type="text"\n    placeholder="Room ID"\n    autofocus\n  />\n  <button class="button" onclick="this.joinRoom()">Join Room</button>\n</div>\n<h1>About</h1>\n<button class="button" onclick="this.gotoAboutPage()">About</button>\n', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n\n#roomIdInput {\n  min-width: 300px;\n}\n") }
        connectedCallback() { H(this, D)[D] = new BroadcastChannel("room-auto-join"), H(this, D)[D].onmessage = e => { this.shadowRoot.getElementById("roomIdInput").value = e.data, this.joinRoom() } }
        disconnectedCallback() { H(this, D)[D].close() }
        async newRoom() { await H(this, S)[S].newRoom(), H(this, V)[V]() }
        async joinRoom() {
            const e = this.shadowRoot.getElementById("roomIdInput").value;
            e ? await H(this, S)[S].joinRoom(e) ? H(this, V)[V]() : alert(" Room not found") : alert("No Room")
        }
        gotoAboutPage() {
            const e = new CustomEvent("ChangePage", { detail: k.About });
            this.dispatchEvent(e)
        }
    }
    var U = function() {
        const e = new CustomEvent("ChangePage", { detail: k.Room });
        this.dispatchEvent(e)
    };

    function W(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var N = 0;

    function z(e) { return "__private_" + N++ + "_" + e }
    var J = z("currentPage"),
        G = z("defaultPage"),
        Q = z("renderCorrectPage"),
        Y = z("gotoNewPage"),
        $ = z("addCurrentPageToHistory"),
        q = z("getCurrentPageFromUrl");
    class F extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, q, { value: ee }), Object.defineProperty(this, $, { value: Z }), Object.defineProperty(this, Y, { value: X }), Object.defineProperty(this, Q, { value: K }), Object.defineProperty(this, J, { writable: !0, value: void 0 }), Object.defineProperty(this, G, { writable: !0, value: k.Home }), e(this, "", ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n") }
        connectedCallback() { W(this, J)[J] = W(this, q)[q](), W(this, Q)[Q](), window.addEventListener("popstate", (e => { e.state ? W(this, J)[J] = e.state : W(this, J)[J] = W(this, G)[G], W(this, Q)[Q]() })) }
    }
    var K = function() {
            const e = "CurrentPage",
                t = this.shadowRoot.getElementById(e);
            t && this.shadowRoot.removeChild(t);
            const n = document.createElement(W(this, J)[J].component);
            n.id = e, n.addEventListener("ChangePage", (e => W(this, Y)[Y](e.detail))), this.shadowRoot.appendChild(n);
            const o = W(this, J)[J].title;
            document.title = o
        },
        X = function(e) { W(this, J)[J] = e, W(this, $)[$](), W(this, Q)[Q]() },
        Z = function() { history.pushState(W(this, J)[J], W(this, J)[J].title, window.location.origin + W(this, J)[J].path) },
        ee = function() {
            for (const e in k)
                if (k[e].path === window.location.pathname) return k[e];
            return W(this, G)[G]
        };

    function te(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var ne = 0;

    function oe(e) { return "__private_" + ne++ + "_" + e }
    var ie = oe("localVideoStream"),
        se = oe("webRTCService"),
        ae = oe("roomID"),
        re = oe("connected"),
        ce = oe("returnToHome"),
        de = oe("getDesiredCameraId");
    class he extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, de, { value: pe }), Object.defineProperty(this, ce, { value: le }), Object.defineProperty(this, ie, { writable: !0, value: void 0 }), Object.defineProperty(this, se, { writable: !0, value: new T }), Object.defineProperty(this, ae, { writable: !0, value: void 0 }), Object.defineProperty(this, re, { writable: !0, value: !1 }), e(this, '<h1>Welcome to the room <span id="roomID"></span></h1>\n<vaii-room-video id="video"></vaii-room-video>\n\n', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n") }
        connectedCallback() {
            if (!te(this, se)[se].getRoomId()) return te(this, ce)[ce](), !1;
            te(this, ae)[ae] = te(this, se)[se].getRoomId(), this.shadowRoot.getElementById("roomID").innerText = te(this, ae)[ae], te(this, se)[se].getIsHost() && (this.addRoomIdToClipboard(), this.sendBcMessageWithRoomId()), this.setupVideo()
        }
        async addRoomIdToClipboard() { await navigator.clipboard.writeText(te(this, ae)[ae]) }
        sendBcMessageWithRoomId() {
            const e = new BroadcastChannel("room-auto-join");
            e.postMessage(te(this, ae)[ae]), e.close()
        }
        async setupVideo() {
            const e = await navigator.mediaDevices.enumerateDevices();
            let t = { width: { ideal: 720 }, height: { ideal: 480 }, frameRate: { ideal: 30 } };
            const n = te(this, de)[de](e);
            n && (t = {...t, deviceId: n.deviceId });
            const o = { video: t, audio: !1 };
            navigator.mediaDevices.getUserMedia(o).then((e => this.onUserAllowVideo(e)), (e => { console.warn(e), alert("Can't get camera 😞") }))
        }
        onRemoteVideo(e) { this.shadowRoot.getElementById("video").setRemoteVideo(e), te(this, re)[re] = !0, this.showChat() }
        onUserAllowVideo(e) { te(this, ie)[ie] = e, te(this, se)[se].setupPeerConnection(te(this, ie)[ie], this.onRemoteVideo.bind(this)), this.shadowRoot.getElementById("video").setLocalVideo(te(this, ie)[ie]), te(this, se)[se].connectToOtherPerson() }
        showChat() {
            const e = document.createElement("vaii-room-chat");
            this.shadowRoot.appendChild(e)
        }
    }
    var le = function() {
            const e = new CustomEvent("ChangePage", { detail: k.Home });
            this.dispatchEvent(e)
        },
        pe = function(e) { const t = e.find((e => "Logi Capture" === e.label)); if (te(this, se)[se].getIsHost()) return t; return e.find((e => "Microsoft® LifeCam Studio(TM) (045e:0772)" === e.label)) || t };

    function ue(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var me = 0;

    function fe(e) { return "__private_" + me++ + "_" + e }
    var we = fe("localVideoStream"),
        ve = fe("remoteVideoStream");
    class be extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, we, { writable: !0, value: void 0 }), Object.defineProperty(this, ve, { writable: !0, value: void 0 }), e(this, '<div class="videos-container">\n   <vaii-play disabled id="play" class="play icon-play"></vaii-play>\n <vaii-ground id="background" class="background">\n <div class="wave one"></div>\n <div class="wave two"></div>\n <div class="wave three"></div>\n </vaii-ground>\n <vaii-load id="loader" class="loader"></vaii-load>\n <vaii-status id="status" class="status"></vaii-status>\n <vaii-bar id="menubar" class="menubar">\n <div id="btnDisplay" class="icon">\n <div class="icon-binoculars"></div>display</div>\n <div id="btnImage" class="icon">\n <div class="icon-brush">\n</div>input</div>\n <div id="btnProcess" class="icon">\n <div class="icon-stats">\n</div>options</div>\n <div id="btnModel" class="icon">\n <div class="icon-games">\n</div>models</div>\n <div id="chatVAII" class="icon">\n <div id="myBtn" class="icon-record">\n</div>Start</div>\n <div id="btnStart" class="icon">\n <div class="icon-webcam">\n</div>\n<span id="btnStartText">start video</span>\n</div>\n </vaii-bar>\n <vaii-media id="media">\n <canvas id="canvas" class="canvas" style="position:absolute;\n left:0px;\n top:0px;\n"></canvas>\n <vaii-video></vaii-video>\n <video id="video" playsinline class="video"></video>\n<video id="localVideo" autoplay muted></video>\n </vaii-media>\n <vaii-compare-container id="compare-container" class="compare-image">\n <canvas id="compare-canvas" width="256" height="256"></canvas>\n <div id="similarity"></div>\n </vaii-compare-container>\n <vaii-segmen-container id="segmentation-container" class="compare-image">\n <canvas id="segmentation-mask" width="256" height="256" style="width: 256px; height: 256px;"></canvas>\n <canvas id="segmentation-canvas" width="256" height="256 " style="width: 256px; height: 256px;"></canvas>\n </vaii-segmen-container>\n <vaii-samp-container id="samples-container" class="samples-container"></vaii-samp-container>\n <vaii-hint id="hint" class="hint"></vaii-hint>\n <vaii-log id="log" class="log"></vaii-log>\n <vaii-results id="results" class="results"></vaii-results>\n <vaii-transcript id="transcript"></vaii-transcript>\n</div>\n', ".videos-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n\n  width: 800px;\n}\n\n#remoteVideo {\n  width: 100%;\n  max-height: 800px;\n}\n#localVideo {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 250px;\n}\n @font-face { font-family: 'Lato';\n font-display: swap;\n font-style: normal;\n font-weight: 100;\n src: local('Lato'), url('../assets/lato-light.woff2') ;\n html { font-family: 'Lato', 'Segoe UI';\n font-size: 16px;\n font-variant: small-caps;\n ;\n body { margin: 0;\n background: black;\n color: white;\n overflow-x: hidden;\n width: 100vw;\n height: 100vh;\n ;\n body::-webkit-scrollbar { display: none;\n ;\n hr { width: 100%;\n ;\n .play { position: absolute;\n width: 256px;\n height: 256px;\n z-index: 9;\n bottom: 15%;\n left: 50%;\n margin-left: -125px;\n display: none;\n filter: grayscale(1);\n ;\n .play:hover { filter: grayscale(0);\n ;\n .btn-background { fill:grey;\n cursor: pointer;\n opacity: 0.6;\n ;\n .btn-background:hover { opacity: 1;\n ;\n .btn-foreground { fill:white;\n cursor: pointer;\n opacity: 0.8;\n ;\n .btn-foreground:hover { opacity: 1;\n ;\n .status { position: absolute;\n width: 100vw;\n bottom: 10%;\n text-align: center;\n font-size: 3rem;\n font-weight: 100;\n text-shadow: 2px 2px #303030;\n ;\n .thumbnail { margin: 8px;\n box-shadow: 0 0 4px 4px dimgrey;\n ;\n .thumbnail:hover { box-shadow: 0 0 8px 8px dimgrey;\n filter: grayscale(1);\n }\n .log { position: absolute;\n bottom: 0;\n margin: 0.4rem 0.4rem 0 0.4rem;\n font-size: 0.9rem;\n }\n .menubar { width: 100vw;\n background: #303030;\n display: flex;\n justify-content: space-evenly;\n text-align: center;\n padding: 8px;\n cursor: pointer;\n }\n .samples-container { display: flex;\n flex-wrap: wrap;\n }\n .video { display: none;\n }\n .canvas { margin: 0 auto;\n }\n .bench { position: absolute;\n right: 0;\n bottom: 0;\n }\n .compare-image { width: 256px;\n position: absolute;\n top: 150px;\n left: 30px;\n box-shadow: 0 0 2px 2px black;\n background: black;\n display: none;\n }\n .loader { width: 300px;\n height: 300px;\n border: 3px solid transparent;\n border-radius: 50%;\n border-top: 4px solid #f15e41;\n animation: spin 4s linear infinite;\n position: absolute;\n bottom: 15%;\n left: 50%;\n margin-left: -150px;\n z-index: 15;\n }\n .loader::before, .loader::after { content: "";\n position: absolute;\n top: 6px;\n bottom: 6px;\n left: 6px;\n right: 6px;\n border-radius: 50%;\n border: 4px solid transparent;\n }\n .loader::before { border-top-color: #bad375;\n animation: 3s spin linear infinite;\n }\n .loader::after { border-top-color: #26a9e0;\n animation: spin 1.5s linear infinite;\n }\n @keyframes spin { from { transform: rotate(0deg);\n }\n to { transform: rotate(360deg);\n }\n }\n .wave { position: fixed;\n top: 0;\n left: -90%;\n width: 100vw;\n height: 100vh;\n border-radius: 10%;\n opacity: .3;\n z-index: -1;\n }\n .wave.one { animation: rotate 10000ms infinite linear;\n background: #2F4F4F;\n }\n .wave.two { animation: rotate 15000ms infinite linear;\n background: #1F3F3F;\n }\n .wave.three { animation: rotate 20000ms infinite linear;\n background: #0F1F1F;\n }\n @keyframes rotate { from { transform: rotate(0deg);\n }\n from { transform: rotate(360deg);\n }\n }\n .button { text-shadow: 2px 2px black;\n display: flex;\n }\n .button:hover { text-shadow: -2px -2px black;\n color: lightblue;\n }\n .button::before { display: inline-block;\n font-style: normal;\n font-variant: normal;\n text-rendering: auto;\n -webkit-font-smoothing: antialiased;\n font-family: "FA";\n font-weight: 900;\n font-size: 2.4rem;\n margin-right: 0.4rem;\n }\n .button-display::before { content: "\f8c4";\n }\n .button-image::before { content: "\f3f2";\n }\n .button-process::before { content: "\f3f0";\n }\n .button-model::before { content: "\f2c2";\n }\n .button-start::before { content: "\f144";\n }\n .button-stop::before { content: "\f28b";\n }\n .icon { width: 180px;\n text-align: -webkit-center;\n text-align: -moz-center;\n filter: grayscale(1);\n }\n .icon:hover { background: #505050;\n filter: grayscale(0);\n }\n .hint { opacity: 0;\n transition-duration: 0.5s;\n transition-property: opacity;\n font-style: italic;\n position: fixed;\n top: 5rem;\n padding: 8px;\n margin: 8px;\n box-shadow: 0 0 2px 2px #303030;\n }\n .input-file { align-self: center;\n width: 5rem;\n }\n .results { position: absolute;\n left: 0;\n top: 5rem;\n background: #303030;\n width: 20rem;\n height: 90%;\n font-size: 0.8rem;\n overflow-y: auto;\n display: none }\n .results::-webkit-scrollbar { background-color: #303030;\n }\n .results::-webkit-scrollbar-thumb { background: black;\n border-radius: 10px;\n }\n .json-line { margin: 4px 0;\n display: flex;\n justify-content: flex-start;\n }\n .json {margin-right: 8px;\n margin-left: 8px;\n }\n .json-type { color: lightyellow;\n }\n .json-key {color: white;\n }\n .json-index { color: lightcoral;\n }\n .json-value {margin-left: 20px;\n }\n .json-number { color: lightgreen;\n }\n .json-boolean { color: lightyellow;\n }\n .json-string { color: lightblue;\n }\n .json-size { color: gray;\n }\n .hide {display: none;\n }\n .fas { display: inline-block;width: 0;height: 0;\n border-style: solid;\n }\n .fa-caret-down { border-width: 10px 8px 0 8px;\n  border-color: white transparent }\n .fa-caret-right {border-width: 10px 0 8px 10px;\n  border-color: transparent transparent transparent white;\n  }") }
        setLocalVideo(e) { ue(this, we)[we] = e, this.shadowRoot.getElementById("localVideo").srcObject = ue(this, we)[we] }
        setRemoteVideo(e) { ue(this, ve)[ve] = e, this.shadowRoot.getElementById("remoteVideo").srcObject = ue(this, ve)[ve] }
    }

    function ge(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var ye = 0;

    function Oe(e) { return "__private_" + ye++ + "_" + e }
    var Ce = Oe("webRTCService"),
        Re = Oe("DataChannelService"),
        je = Oe("chatMessageText");
    class Pe extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, Ce, { writable: !0, value: new T }), Object.defineProperty(this, Re, { writable: !0, value: new c }), Object.defineProperty(this, je, { writable: !0, value: "" }), e(this, '<h1>Chat!</h1>\n<div class="chat-container">\n  <div id="chatList"></div>\n  <div class="inputs-container">\n    <input\n      id="chatMessage"\n      class="input"\n      type="text"\n      placeholder="Room ID"\n      onchange="this.chatMessageChange(this)"\n      autofocus\n    />\n    <button class="button" onclick="this.sendChatMessage()">Send message</button>\n  </div>\n</div>\n', ":host {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.inputs-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.input {\n  min-width: 300px;\n  margin-right: 5px;\n}\n\n.chat-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n#chatList {\n  min-width: 300px;\n  min-height: 50px;\n  margin-right: 5px;\n  border: 1px solid #ffffff;\n  padding: 5px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.my-message,\n.other-message {\n  border-radius: 18px;\n  padding: 8px 12px;\n  margin: 5px 2px;\n  display: inline-block;\n}\n.my-message {\n  background-color: rgb(0, 132, 255);\n  text-align: right;\n\n  margin-left: auto;\n}\n\n.other-message {\n  background-color: rgb(62, 64, 66);\n  margin-right: auto;\n}\n") }
        connectedCallback() { ge(this, Re)[Re].getNewMessages((e => { this.addMessageToChat(e, !1) })) }
        chatMessageChange(e) { ge(this, je)[je] = e.value }
        sendChatMessage() { ge(this, Re)[Re].sendChatMessage(ge(this, je)[je]), this.addMessageToChat(ge(this, je)[je], !0), ge(this, je)[je] = "", this.shadowRoot.getElementById("chatMessage").value = ge(this, je)[je] }
        addMessageToChat(e, t) {
            const n = t ? "You: " : "Guest: ",
                o = t ? "my-message" : "other-message ",
                i = this.shadowRoot.getElementById("chatList"),
                s = `<div class="${o}"><b>${n}</b>${e}</div>`;
            i.innerHTML = i.innerHTML + s
        }
    }
    var xe = 0,
        Ee = "__private_" + xe++ + "_goHomeEvent";
    class Ie extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, Ee, { writable: !0, value: new CustomEvent("ChangePage", { detail: k.Home }) }), e(this, '<h1>Welcome to about page!</h1>\n<img src="assets/pondus.jpg" class="img">\n<button class="button" onclick="this.back()">Back</button>', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n\n.input {\n  min-width: 300px;\n}\n\n.img {\n  max-width: 800px;\n  margin-bottom: 20px;\n}") }
        back() { this.dispatchEvent(function(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }(this, Ee)[Ee]) }
    }
    class Te extends HTMLInputElement {
        constructor() { super() }
        connectedCallback() { this.validate(), this.addEventListener("keyup", this.validate.bind(this)) }
        disconnectedCallback() { this.removeEventListener("keyup", this.validate.bind(this)) }
        validate() { this.value ? this.style.border = "" : this.style.border = "2px solid red" }
    }
    firebase.initializeApp({ apiKey: "AIzaSyCgTQkGRQBqmvCY4u6wuJ1MTVQ7YPViUig", authDomain: "web-components-webrtc.firebaseapp.com", databaseURL: "https://web-components-webrtc.firebaseio.com", projectId: "web-components-webrtc", storageBucket: "web-components-webrtc.appspot.com", messagingSenderId: "57628399273", appId: "1:57628399273:web:c01bfb9b6cf5d164007bb8" }), customElements.define("vaii-page", F), customElements.define("vaii-page-home", B), customElements.define("vaii-page-about", Ie), customElements.define("vaii-page-room", he), customElements.define("vaii-room-video", be), customElements.define("vaii-room-chat", Pe), customElements.define("text-input", Te, { extends: "input" })
})();
//# sourceMappingURL=main.bundle.js.map
