(() => {
    "use strict";
    const e = (e, n, o) => {
            const i = e.attachShadow({ mode: "open" }),
                s = document.createElement("template");
            s.innerHTML = '<style>@import "styles.css";' + o + "</style>" + t(n, e);
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
    const k = Object.freeze({ Home: { path: "/", component: "vaii-media-home", title: "Home" }, Room: { path: "/room", component: "vaii-media-room", title: "Room" }, About: { path: "/about", component: "vaii-media-about", title: "About" } });

    function H(e, t) { if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e }
    var L = 0;

    function A(e) { return "__private_" + L++ + "_" + e }
    var S = A("WebRTCService"),
        D = A("bc"),
        V = A("gotoRoomPage");
    class B extends HTMLElement {
        constructor() { super(), Object.defineProperty(this, V, { value: U }), Object.defineProperty(this, S, { writable: !0, value: new T }), Object.defineProperty(this, D, { writable: !0, value: void 0 }), e(this, '<button class="button"\n style="position: absolute; top: 1rem; right: 8rem;"\n onclick="this.newRoom()">New Room</button>\n<div>\n  <input\n    is="text-input"\n    id="roomIdInput"\n    class="input"\n    type="text"\n    placeholder="Room ID"\n style="position: absolute; top: 1rem; right: 22rem;"\n    autofocus\n  />\n  <button class="button"\n style="position: absolute; top: 1rem; right: 15rem;"\n onclick="this.joinRoom()">Join Room</button>\n<svg\n viewBox="0 0 16 16" \n width="24px" \n height="24px" \n xmlns="http://www.w3.org/2000/svg" \n stroke="none" \n stroke-width="0.5" \n fill="white" \n class="vaii-notifer">\n<vaii-menu-notifer>\n</vaii-menu-notifer>\n<path\n d="M8.00001 2C5.51473 2 3.50001 4.01472 3.50001 6.5V8.9014L2.5357 11.3145C2.47415 11.4685 2.49299 11.643 2.58601 11.7804C2.67904 11.9177 2.83412 12 3 12H6C6 13.1084 6.89164 14 8 14C9.10836 14 10 13.1084 10 12H13C13.1659 12 13.321 11.9177 13.414 11.7804C13.507 11.643 13.5259 11.4685 13.4643 11.3145L12.5 8.9014V6.5C12.5 4.01472 10.4853 2 8.00001 2ZM9 12C9 12.5561 8.55607 13 8 13C7.44393 13 7 12.5561 7 12H9ZM4.50001 6.5C4.50001 4.567 6.06701 3 8.00001 3C9.933 3 11.5 4.567 11.5 6.5V8.9976C11.5 9.06116 11.5121 9.12413 11.5357 9.18315L12.2617 11H3.73826L4.46431 9.18315C4.48789 9.12413 4.50001 9.06116 4.50001 8.9976V6.5Z">\n</path>\n<button\n id="notifer">\nNotifikasi\n</button>\n</svg>\n</div>\n\n<button class="button"\n style="position: absolute; bottom: 1rem;"\n onclick="this.gotoAboutPage()">About</button>\n', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n\n#roomIdInput {\n  min-width: 300px;\n}\n") }
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
        constructor() { super(), Object.defineProperty(this, de, { value: pe }), Object.defineProperty(this, ce, { value: le }), Object.defineProperty(this, ie, { writable: !0, value: void 0 }), Object.defineProperty(this, se, { writable: !0, value: new T }), Object.defineProperty(this, ae, { writable: !0, value: void 0 }), Object.defineProperty(this, re, { writable: !0, value: !1 }), e(this, '<h1>Welcome to the room <span id="roomID"></span></h1>\n<vaii-media-room-video id="video"></vaii-media-room-video>\n\n', ":host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\nh1 {\n  text-align: center;\n}\n") }
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
            const e = document.createElement("vaii-media-room-chat");
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
        constructor() { super(), Object.defineProperty(this, we, { writable: !0, value: void 0 }), Object.defineProperty(this, ve, { writable: !0, value: void 0 }), e(this, '<div class="videos-container">\n  <video id="localVideo" autoplay></video>\n  <video id="remoteVideo" autoplay></video>\n <iframe id="vaiiVideo" src="https://g4lihru.me/ai/vaii/v" width="256" height="256" scrolling="no" allow="autoplay" frameBorder="0"></iframe>\n</div>\n', ".videos-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n\n  width: 800px;\n}\n\n#remoteVideo {\n  position: fixed;\n bottom: 288px;\n  right: 40px;\n  width: 250px;\n}\n#vaiiVideo {\n  position: fixed;\n bottom: 40px;\n  right: 40px;\n}\n#localVideo {\n display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 250px;\n}\n") }
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
    class Oe extends HTMLElement {  
        constructor() { super(); this.attachShadow({ mode: 'open' }); this.close = this.close.bind(this);}
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (oldValue !== newValue) {
              this[attrName] = this.hasAttribute(attrName);
            }
        }  
        connectedCallback() {
            const { shadowRoot } = this;
            shadowRoot.innerHTML = `<style>
              .wrapper {
                opacity: 0;
                transition: visibility 0s, opacity 0.25s ease-in;
              }
              .wrapper:not(.open) {
                visibility: hidden;
              }
              .wrapper.open {
                align-items: center;
                display: flex;
                justify-content: center;
                height: 100vh;
                position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                opacity: 1;
                visibility: visible;
              }
              .overlay {
                background: rgba(0, 0, 0, 0.8);
                height: 100%;
                position: fixed;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                width: 100%;
              }
              .dialog {
                background: #ffffff;
                max-width: 600px;
                padding: 1rem;
                position: fixed;
              }
              button {
                all: unset;
                cursor: pointer;
                font-size: 1.25rem;
                position: absolute;
                  top: 1rem;
                  right: 1rem;
              }
              button:focus {
                border: 2px solid blue;
              }
            </style>
            <div class="wrapper">
            <div class="overlay"></div>
              <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
                <button class="close" aria-label="Close">✖️</button>
                <h1 id="title">Hello world</h1>
                <div id="content" class="content">
                  <p>This is content in the body of our modal</p>
                </div>
              </div>
            </div>`;


            shadowRoot.querySelector('button').addEventListener('click', this.close);
            shadowRoot.querySelector('.overlay').addEventListener('click', this.close);
            this.open = this.open;
        }
  
       disconnectedCallback() { this.shadowRoot.querySelector('button').removeEventListener('click', this.close); this.shadowRoot.querySelector('.overlay').removeEventListener('click', this.close);}
  
       get open() {
         return this.hasAttribute('open');
       }
  
  
       set open(isOpen) {
         const { shadowRoot } = this;
         shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
         shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
         if (isOpen) {
           this._wasFocused = document.activeElement;
           this.setAttribute('open', '');
           document.addEventListener('keydown', this._watchEscape);
           this.focus();
           shadowRoot.querySelector('button').focus();
         } else {
           this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
           this.removeAttribute('open');
           document.removeEventListener('keydown', this._watchEscape);
           this.close();
         }
       }


       close() {
         if (this.open !== false) {
           this.open = false;
         }
         const closeEvent = new CustomEvent('notifer-closed');
         this.dispatchEvent(closeEvent);
       }

       _watchEscape(event) {
         if (event.key === 'Escape') {
             this.close();   
         }
       }
    }

const button = document.getElementById('notifer');
button.addEventListener('click', () => {
  document.querySelector('vaii-menu-notifer').open = true;
})
    firebase.initializeApp({ apiKey: "AIzaSyCgTQkGRQBqmvCY4u6wuJ1MTVQ7YPViUig", authDomain: "web-components-webrtc.firebaseapp.com", databaseURL: "https://web-components-webrtc.firebaseio.com", projectId: "web-components-webrtc", storageBucket: "web-components-webrtc.appspot.com", messagingSenderId: "57628399273", appId: "1:57628399273:web:c01bfb9b6cf5d164007bb8" }), window.customElements.define("vaii-media-router", F), window.customElements.define("vaii-media-home", B), window.customElements.define("vaii-media-about", Ie), window.customElements.define("vaii-media-room", he), window.customElements.define("vaii-media-room-video", be),  window.customElements.define("vaii-room-chat", Pe),  window.customElements.define('vaii-menu-notifer', Oe);, window.customElements.define("text-input", Te, { extends: "input" })
})();
//# sourceMappingURL=main.bundle.js.map
