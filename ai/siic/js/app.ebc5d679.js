(function(t) {
    function e(e) {
        for (var n,
                c,
                r = e[0],
                s = e[1],
                l = e[2],
                u = 0, p = []; u < r.length; u++)
            c = r[u],
            Object.prototype.hasOwnProperty.call(a, c) && a[c] && p.push(a[c][0]),
            a[c] = 0;
        for (n in s)
            Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
        d && d(e);
        while (p.length) p.shift()();
        return i.push.apply(i, l || []), o()
    }

    function o() {
        for (var t, e = 0; e < i.length; e++) {
            for (
                var o = i[e],
                    n = !0, r = 1; r < o.length; r++) {
                var s = o[r];
                0 !== a[s] && (n = !1)
            }
            n && (i.splice(e--, 1), t = c(c.s = o[0]))
        }
        return t
    }
    var n = {},
        a = {
            app: 0
        },
        i = [];

    function c(e) {
        if (n[e]) return n[e].exports;
        var o = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(
                o.exports,
                o,
                o.exports,
                c
            ),
            o.l = !0,
            o.exports
    }
    c.m = t,
        c.c = n,
        c.d = function(t, e, o) {
            c.o(t, e) || Object.defineProperty(t,
                e, {
                    enumerable: !0,
                    get: o
                })
        },
        c.r = function(t) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
        }, c.t = function(t, e) {
            if (1 & e && (t = c(t)), 8 & e)
                return t;
            if (4 & e && "object" === typeof t && t && t.__esModule)
                return t;
            var o = Object.create(null);
            if (c.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var n in t) c.d(o, n, function(e) {
                    return t[e]
                }.bind(null, n));
            return o
        }, c.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t["default"]
            } : function() { return t };
            return c.d(e, "a", e), e
        },
        c.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, c.p = "/";
    var r = window["webpackJsonp"] = window["webpackJsonp"] || [],
        s = r.push.bind(r);
    r.push = e, r = r.slice();
    for (var l = 0; l < r.length; l++) e(r[l]);
    var d = s;
    i.push([0, "chunk-vendors"]), o()
})({
    0: function(t, e, o) {
        t.exports = o("cd49")
    },
    "5c8b": function(t, e, o) {},
    9433: function(t, e, o) {
        "use strict";
        o("5c8b")
    },
    ab7c: function(t, e, o) {},
    cd49: function(t, e, o) {
        "use strict";
        o.r(e);
        o("e260"), o("e6cf"), o("cca6"), o("a79d");
        var n = o("7a23"),
            a = Object(n["h"])("span", {
                style: {}
            }, "Feature SIIC", -1),
            i = Object(n["g"])("Berikut adalah Feature SIIC ", -1);

        function c(t, e, o, c, r, s) {
            var l = Object(n["p"])("swipe-modal");
            return Object(n["k"])(), Object(n["e"])(n["a"], null, [Object(n["h"])("button", { onClick: e[1] || (e[1] = function(e) { return t.data.showSwipeModal = "open" }) }, "Lihat Selengkapnya"), Object(n["h"])(l, {
                "modal-state": t.data.showSwipeModal,
                "onUpdate:modal-state": e[3] || (e[3] =
                    function(e) {
                        return t.data.showSwipeModal = e
                    })
            }, {
                header: Object(n["r"])((
                    function() { return [a] })),
                body: Object(n["r"])((
                    function() { return [i] })),
                footer: Object(n["r"])
                    ((function() {
                        return [Object(n["h"])("button", {
                            style: {
                                background: "Transparent",
                                border: "none",
                            },
                            onClick: e[2] || (e[2] = function() {
                                var e;
                                return t.methods.buttonClickedInModal && (e = t.methods).buttonClickedInModal.apply(e, arguments)
                            })
                        }, " Tutup ")]
                    })),
                _: 1
            }, 8, ["modal-state"])], 64)
        }
        var r = Object(n["s"])("data-v-51142bf6");
        Object(n["m"])("data-v-51142bf6");
        var s = {
                class: "swipe-modal__content"
            },
            l = {
                key: 0,
                class: "swipe-modal__swipe-line",
                style: {
                    background: "#11101d"
                }
            },
            d = {
                class: "swipe-modal__content__header"
            };
        Object(n["l"])();
        var u = r(
                (function(t, e, o, a, i, c) {
                    return Object(n["k"])(),
                        Object(n["e"])
                        (n["a"],
                            null, [Object(n["h"])
                                (n["b"], {
                                    name: "swipe-overflow"
                                }, {
                                    default: r(
                                        (function() {
                                            return [t.computedProperties.modalOpened ? (Object(n["k"])(), Object(n["e"])
                                                ("div", {
                                                    key: 0,
                                                    class: "swipe-modal__overflow",
                                                    onClick: e[1] || (e[1] = function() {
                                                        var e;
                                                        return t.methods.closeModal && (e = t.methods).closeModal.apply(e, arguments)
                                                    }),
                                                    onTouchmove: e[2] || (
                                                        e[2] = function(t) {
                                                            return t.preventDefault()
                                                        })
                                                }, null, 32)) : Object(n["f"])("", !0)]
                                        })),
                                    _: 1
                                }),
                                Object(n["h"])
                                ("div", {
                                    class: "swipe-modal__wrap",
                                    onTouchmove: e[4] || (e[4] = function() {
                                        var e;
                                        return t.methods.touchmove && (e = t.methods).touchmove.apply(e, arguments)
                                    }),
                                    onTouchstart: e[5] || (e[5] = function() {
                                        var e;
                                        return t.methods.touchstart && (e = t.methods).touchstart.apply(e, arguments)
                                    }),
                                    onTouchend: e[6] || (e[6] = function() {
                                        var e;
                                        return t.methods.touchend && (e = t.methods).touchend.apply(e, arguments)
                                    }),
                                    style: [{
                                        bottom: "-".concat(t.data.modalPosition, "px"),
                                        transition: t.computedProperties.actualAnimation
                                    }],
                                    onClick: e[7] || (e[7] = function(e) {
                                        return t.$emit("modal-click")
                                    })
                                }, [Object(n["h"])
                                    ("div", s, [t.showSwipeLine && t.data.mobileDevice ? (Object(n["k"])(),
                                            Object(n["e"])
                                            ("div", l)) : Object(n["f"])
                                        ("", !0), t.data.mobileDevice ? Object(n["f"])
                                        ("", !0) : (Object(n["k"])(), Object(n["e"])
                                            ("div", {
                                                key: 1,
                                                onClick: e[3] || (e[3] = function() {
                                                    var e;
                                                    return t.methods.closeModal && (e = t.methods).closeModal.apply(e, arguments)
                                                }),
                                                class: "swipe-modal__close-icon"
                                            })),
                                        Object(n["h"])("div", d, [
                                            Object(n["o"])(t.$slots, "header")
                                        ]), Object(n["h"])("div", {
                                            class: ["swipe-modal__content__body", [t.bodyClassesList]]
                                        }, [Object(n["o"])(t.$slots, "body")], 2),
                                        Object(n["h"])
                                        ("div", {
                                            class: ["swipe-modal__content__footer", [t.footerClassesList]]
                                        }, [
                                            Object(n["o"])(t.$slots, "footer")
                                        ], 2)
                                    ])
                                ], 36)
                            ], 64)
                })),
            p = { open: "open", closed: "closed" },
            m = 500,
            b = function(t, e) { t.emit("update:modal-state", e) },
            f = function(t) { return t.modalPosition < t.bottomPositionPrev },
            h = function() {
                var t = !1;
                return function(e) {
                        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
                    }
                    (navigator.userAgent || navigator.vendor || window.opera), t
            },
            v = Object(n["i"])({
                name: "SwipeModal",
                props: {
                    modalState: { type: String, default: "" },
                    bodyClassesList: { type: String, default: "" },
                    footerClassesList: { type: String, default: "" },
                    showSwipeLine: { type: Boolean, default: !0 }
                },
                setup: function(t, e) {
                    var o = Object(n["n"])({
                            positionStart: 0,
                            modalPosition: m,
                            bottomPositionPrev: 0,
                            movingUp: !1,
                            touchStart: !1,
                            clickInsideModal: !1,
                            mobileDevice: !1
                        }),
                        a = Object(n["n"])({
                            modalOpened: Object(n["c"])
                                (
                                    (function() { return t.modalState === p.open })
                                ),
                            actualAnimation: Object(n["c"])
                                (
                                    (function() { return o.touchStart ? "all 0s linear" : "all .3s ease-in" })
                                )
                        });
                    Object(n["j"])
                        ((function() {
                            o.mobileDevice = h()
                        }));
                    var i = {
                        closeModal: function() {
                            b(e, p.closed),
                                i.setBodyStyle(),
                                i.setBottomPosition(m)
                        },
                        setBottomPosition: function(t) {
                            o.modalPosition = t,
                                o.bottomPositionPrev = t
                        },
                        openModal: function() {
                            b(e, p.open),
                                i.setBottomPosition(0)
                        },
                        touchstart: function(t) {
                            o.touchStart = !0,
                                o.positionStart = t.touches[0].clientY,
                                o.clickInsideModal = !0
                        },
                        touchmove: function(t) {
                            t.preventDefault();
                            var e = t.touches[0].clientY,
                                n = e - o.positionStart;
                            o.clickInsideModal = !1,
                                o.positionStart = e,
                                o.modalPosition += n,
                                o.movingUp = f(o),
                                o.bottomPositionPrev = o.modalPosition
                        },
                        touchend: function() {
                            o.clickInsideModal ? o.touchStart = !1 : (o.movingUp ? i.openModal() : i.closeModal(),
                                setTimeout((function() { o.touchStart = !1 }), 100))
                        },
                        setBodyStyle: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "auto";
                            document.getElementsByTagName("body")[0].style.overflow = t
                        }
                    };
                    return Object(n["q"])((function() {
                        return t.modalState
                    }), (function(t) { "open" === t ? i.openModal() : i.closeModal() })), {
                        data: o,
                        computedProperties: a,
                        methods: i
                    }
                }
            });
        o("cea7");
        v.render = u, v.__scopeId = "data-v-51142bf6";
        var w = v,
            g = Object(n["i"])({
                name: "App",
                setup: function() {
                    var t = Object(n["n"])({ showSwipeModal: "" }),
                        e = {
                            buttonClickedInModal: function() {
                                console.log("button clicked in modal"),
                                    t.showSwipeModal = "closed"
                            }
                        };
                    return {
                        data: t,
                        methods: e
                    }
                },
                components: {
                    SwipeModal: w
                }
            });
        o("9433");
        g.render = c;
        var j = g;
        Object(n["d"])(j).mount("#app")
    },
    cea7: function(t, e, o) {
        "use strict";
        o("ab7c")
    }
});
//# sourceMappingURL=app.ebc5d679.js.map
