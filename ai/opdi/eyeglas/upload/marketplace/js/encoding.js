!function(n){"use strict";function e(n,e,r){return e<=n&&n<=r}function r(n){if(void 0===n)return{};if(n===Object(n))return n;throw TypeError("Could not convert argument to dictionary")}function i(n){return 0<=n&&n<=127}function t(n){this.tokens=[].slice.call(n),this.tokens.reverse()}function o(n,e){if(n)throw TypeError("Decoder error");return e||65533}function s(n){throw TypeError("The code point "+n+" could not be encoded.")}function a(n){return n=String(n).trim().toLowerCase(),Object.prototype.hasOwnProperty.call(J,n)?J[n]:null}function u(n,e){return e&&e[n]||null}function l(n,e){var r=e.indexOf(n);return-1===r?null:r}function f(e){if(!("encoding-indexes"in n))throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?");return n["encoding-indexes"][e]}function c(n,e){if(!(this instanceof c))throw TypeError("Called as a function. Did you forget 'new'?");n=void 0!==n?String(n):q,e=r(e),this._encoding=null,this._decoder=null,this._ignoreBOM=!1,this._BOMseen=!1,this._error_mode="replacement",this._do_not_flush=!1;var i=a(n);if(null===i||"replacement"===i.name)throw RangeError("Unknown encoding: "+n);if(!N[i.name])throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");var t=this;return t._encoding=i,Boolean(e.fatal)&&(t._error_mode="fatal"),Boolean(e.ignoreBOM)&&(t._ignoreBOM=!0),Object.defineProperty||(this.encoding=t._encoding.name.toLowerCase(),this.fatal="fatal"===t._error_mode,this.ignoreBOM=t._ignoreBOM),t}function d(e,i){if(!(this instanceof d))throw TypeError("Called as a function. Did you forget 'new'?");i=r(i),this._encoding=null,this._encoder=null,this._do_not_flush=!1,this._fatal=Boolean(i.fatal)?"fatal":"replacement";var t=this;if(Boolean(i.NONSTANDARD_allowLegacyEncoding)){var o=a(e=void 0!==e?String(e):q);if(null===o||"replacement"===o.name)throw RangeError("Unknown encoding: "+e);if(!G[o.name])throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");t._encoding=o}else t._encoding=a("utf-8"),void 0!==e&&"console"in n&&console.warn("TextEncoder constructor called with encoding label, which is ignored.");return Object.defineProperty||(this.encoding=t._encoding.name.toLowerCase()),t}function h(n){var r=n.fatal,i=0,t=0,s=0,a=128,u=191;this.handler=function(n,l){if(l===P&&0!==s)return s=0,o(r);if(l===P)return D;if(0===s){if(e(l,0,127))return l;if(e(l,194,223))s=1,i=31&l;else if(e(l,224,239))224===l&&(a=160),237===l&&(u=159),s=2,i=15&l;else{if(!e(l,240,244))return o(r);240===l&&(a=144),244===l&&(u=143),s=3,i=7&l}return null}if(!e(l,a,u))return i=s=t=0,a=128,u=191,n.prepend(l),o(r);if(a=128,u=191,i=i<<6|63&l,(t+=1)!==s)return null;var f=i;return i=s=t=0,f}}function g(n){n.fatal,this.handler=function(n,r){if(r===P)return D;if(M(r))return r;var i,t;e(r,128,2047)?(i=1,t=192):e(r,2048,65535)?(i=2,t=224):e(r,65536,1114111)&&(i=3,t=240);for(var o=[(r>>6*i)+t];i>0;){var s=r>>6*(i-1);o.push(128|63&s),i-=1}return o}}function p(n,e){var r=e.fatal;this.handler=function(e,t){if(t===P)return D;if(i(t))return t;var s=n[t-128];return null===s?o(r):s}}function _(n,e){e.fatal,this.handler=function(e,r){if(r===P)return D;if(M(r))return r;var i=l(r,n);return null===i&&s(r),i+128}}function b(n){var r=n.fatal,t=0,s=0,a=0;this.handler=function(n,l){if(l===P&&0===t&&0===s&&0===a)return D;var c;if(l!==P||0===t&&0===s&&0===a||(t=0,s=0,a=0,o(r)),0!==a){c=null,e(l,48,57)&&(c=function(n){if(n>39419&&n<189e3||n>1237575)return null;if(7457===n)return 59335;var e,r=0,i=0,t=f("gb18030-ranges");for(e=0;e<t.length;++e){var o=t[e];if(!(o[0]<=n))break;r=o[0],i=o[1]}return i+n-r}(10*(126*(10*(t-129)+s-48)+a-129)+l-48));var d=[s,a,l];return t=0,s=0,a=0,null===c?(n.prepend(d),o(r)):c}if(0!==s)return e(l,129,254)?(a=l,null):(n.prepend([s,l]),t=0,s=0,o(r));if(0!==t){if(e(l,48,57))return s=l,null;var h=t,g=null;t=0;var p=l<127?64:65;return(e(l,64,126)||e(l,128,254))&&(g=190*(h-129)+(l-p)),null===(c=null===g?null:u(g,f("gb18030")))&&i(l)&&n.prepend(l),null===c?o(r):c}return i(l)?l:128===l?8364:e(l,129,254)?(t=l,null):o(r)}}function w(n,e){n.fatal,this.handler=function(n,r){if(r===P)return D;if(M(r))return r;if(58853===r)return s(r);if(e&&8364===r)return 128;var i=l(r,f("gb18030"));if(null!==i){var t=i%190;return[L(i/190)+129,t+(t<63?64:65)]}if(e)return s(r);i=function(n){if(59335===n)return 7457;var e,r=0,i=0,t=f("gb18030-ranges");for(e=0;e<t.length;++e){var o=t[e];if(!(o[1]<=n))break;r=o[1],i=o[0]}return i+n-r}(r);var o=L(i/10/126/10),a=L((i-=10*o*126*10)/10/126),u=L((i-=10*a*126)/10);return[o+129,a+48,u+129,i-10*u+48]}}function m(n){var r=n.fatal,t=0;this.handler=function(n,s){if(s===P&&0!==t)return t=0,o(r);if(s===P&&0===t)return D;if(0!==t){var a=t,l=null;t=0;var c=s<127?64:98;switch((e(s,64,126)||e(s,161,254))&&(l=157*(a-129)+(s-c)),l){case 1133:return[202,772];case 1135:return[202,780];case 1164:return[234,772];case 1166:return[234,780]}var d=null===l?null:u(l,f("big5"));return null===d&&i(s)&&n.prepend(s),null===d?o(r):d}return i(s)?s:e(s,129,254)?(t=s,null):o(r)}}function v(n){n.fatal,this.handler=function(n,e){if(e===P)return D;if(M(e))return e;var r=function(n){var e=R=R||f("big5").map((function(n,e){return e<5024?null:n}));return 9552===n||9566===n||9569===n||9578===n||21313===n||21317===n?e.lastIndexOf(n):l(n,e)}(e);if(null===r)return s(e);var i=L(r/157)+129;if(i<161)return s(e);var t=r%157;return[i,t+(t<63?64:98)]}}function y(n){var r=n.fatal,t=!1,s=0;this.handler=function(n,a){if(a===P&&0!==s)return s=0,o(r);if(a===P&&0===s)return D;if(142===s&&e(a,161,223))return s=0,65216+a;if(143===s&&e(a,161,254))return t=!0,s=a,null;if(0!==s){var l=s;s=0;var c=null;return e(l,161,254)&&e(a,161,254)&&(c=u(94*(l-161)+(a-161),f(t?"jis0212":"jis0208"))),t=!1,e(a,161,254)||n.prepend(a),null===c?o(r):c}return i(a)?a:142===a||143===a||e(a,161,254)?(s=a,null):o(r)}}function x(n){n.fatal,this.handler=function(n,r){if(r===P)return D;if(M(r))return r;if(165===r)return 92;if(8254===r)return 126;if(e(r,65377,65439))return[142,r-65377+161];8722===r&&(r=65293);var i=l(r,f("jis0208"));return null===i?s(r):[L(i/94)+161,i%94+161]}}function O(n){var r=n.fatal,i=0,t=1,s=2,a=3,l=4,c=5,d=6,h=i,g=i,p=0,_=!1;this.handler=function(n,b){switch(h){default:case i:return 27===b?(h=c,null):e(b,0,127)&&14!==b&&15!==b&&27!==b?(_=!1,b):b===P?D:(_=!1,o(r));case t:return 27===b?(h=c,null):92===b?(_=!1,165):126===b?(_=!1,8254):e(b,0,127)&&14!==b&&15!==b&&27!==b&&92!==b&&126!==b?(_=!1,b):b===P?D:(_=!1,o(r));case s:return 27===b?(h=c,null):e(b,33,95)?(_=!1,65344+b):b===P?D:(_=!1,o(r));case a:return 27===b?(h=c,null):e(b,33,126)?(_=!1,p=b,h=l,null):b===P?D:(_=!1,o(r));case l:if(27===b)return h=c,o(r);if(e(b,33,126)){h=a;var w=u(94*(p-33)+b-33,f("jis0208"));return null===w?o(r):w}return b===P?(h=a,n.prepend(b),o(r)):(h=a,o(r));case c:return 36===b||40===b?(p=b,h=d,null):(n.prepend(b),_=!1,h=g,o(r));case d:var m=p;p=0;var v=null;if(40===m&&66===b&&(v=i),40===m&&74===b&&(v=t),40===m&&73===b&&(v=s),36!==m||64!==b&&66!==b||(v=a),null!==v){h=h=v;var y=_;return _=!0,y?o(r):null}return n.prepend([m,b]),_=!1,h=g,o(r)}}}function k(n){n.fatal;var e=0,r=1,i=2,t=e;this.handler=function(n,o){if(o===P&&t!==e)return n.prepend(o),t=e,[27,40,66];if(o===P&&t===e)return D;if(!(t!==e&&t!==r||14!==o&&15!==o&&27!==o))return s(65533);if(t===e&&M(o))return o;if(t===r&&(M(o)&&92!==o&&126!==o||165==o||8254==o)){if(M(o))return o;if(165===o)return 92;if(8254===o)return 126}if(M(o)&&t!==e)return n.prepend(o),t=e,[27,40,66];if((165===o||8254===o)&&t!==r)return n.prepend(o),t=r,[27,40,74];8722===o&&(o=65293);var a=l(o,f("jis0208"));return null===a?s(o):t!==i?(n.prepend(o),t=i,[27,36,66]):[L(a/94)+33,a%94+33]}}function E(n){var r=n.fatal,t=0;this.handler=function(n,s){if(s===P&&0!==t)return t=0,o(r);if(s===P&&0===t)return D;if(0!==t){var a=t,l=null;t=0;var c=s<127?64:65,d=a<160?129:193;if((e(s,64,126)||e(s,128,252))&&(l=188*(a-d)+s-c),e(l,8836,10715))return 48508+l;var h=null===l?null:u(l,f("jis0208"));return null===h&&i(s)&&n.prepend(s),null===h?o(r):h}return i(s)||128===s?s:e(s,161,223)?65216+s:e(s,129,159)||e(s,224,252)?(t=s,null):o(r)}}function j(n){n.fatal,this.handler=function(n,r){if(r===P)return D;if(M(r)||128===r)return r;if(165===r)return 92;if(8254===r)return 126;if(e(r,65377,65439))return r-65377+161;8722===r&&(r=65293);var i=function(n){return(K=K||f("jis0208").map((function(n,r){return e(r,8272,8835)?null:n}))).indexOf(n)}(r);if(null===i)return s(r);var t=L(i/188),o=i%188;return[t+(t<31?129:193),o+(o<63?64:65)]}}function B(n){var r=n.fatal,t=0;this.handler=function(n,s){if(s===P&&0!==t)return t=0,o(r);if(s===P&&0===t)return D;if(0!==t){var a=t,l=null;t=0,e(s,65,254)&&(l=190*(a-129)+(s-65));var c=null===l?null:u(l,f("euc-kr"));return null===l&&i(s)&&n.prepend(s),null===c?o(r):c}return i(s)?s:e(s,129,254)?(t=s,null):o(r)}}function S(n){n.fatal,this.handler=function(n,e){if(e===P)return D;if(M(e))return e;var r=l(e,f("euc-kr"));return null===r?s(e):[L(r/190)+129,r%190+65]}}function T(n,e){var r=n>>8,i=255&n;return e?[r,i]:[i,r]}function I(n,r){var i=r.fatal,t=null,s=null;this.handler=function(r,a){if(a===P&&(null!==t||null!==s))return o(i);if(a===P&&null===t&&null===s)return D;if(null===t)return t=a,null;var u;if(u=n?(t<<8)+a:(a<<8)+t,t=null,null!==s){var l=s;return s=null,e(u,56320,57343)?65536+1024*(l-55296)+(u-56320):(r.prepend(T(u,n)),o(i))}return e(u,55296,56319)?(s=u,null):e(u,56320,57343)?o(i):u}}function U(n,r){r.fatal,this.handler=function(r,i){if(i===P)return D;if(e(i,0,65535))return T(i,n);var t=T(55296+(i-65536>>10),n),o=T(56320+(i-65536&1023),n);return t.concat(o)}}function C(n){n.fatal,this.handler=function(n,e){return e===P?D:i(e)?e:63360+e-128}}function A(n){n.fatal,this.handler=function(n,r){return r===P?D:M(r)?r:e(r,63360,63487)?r-63360+128:s(r)}}"undefined"!=typeof module&&module.exports&&!n["encoding-indexes"]&&(n["encoding-indexes"]=require("./encoding-indexes.js")["encoding-indexes"]);var L=Math.floor,M=i,P=-1;t.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return this.tokens.length?this.tokens.pop():P},prepend:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.push(e.pop());else this.tokens.push(n)},push:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.unshift(e.shift());else this.tokens.unshift(n)}};var D=-1,F=[{encodings:[{labels:["unicode-1-1-utf-8","utf-8","utf8"],name:"UTF-8"}],heading:"The Encoding"},{encodings:[{labels:["866","cp866","csibm866","ibm866"],name:"IBM866"},{labels:["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],name:"ISO-8859-2"},{labels:["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],name:"ISO-8859-3"},{labels:["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],name:"ISO-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],name:"ISO-8859-5"},{labels:["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],name:"ISO-8859-6"},{labels:["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],name:"ISO-8859-7"},{labels:["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],name:"ISO-8859-8"},{labels:["csiso88598i","iso-8859-8-i","logical"],name:"ISO-8859-8-I"},{labels:["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],name:"ISO-8859-10"},{labels:["iso-8859-13","iso8859-13","iso885913"],name:"ISO-8859-13"},{labels:["iso-8859-14","iso8859-14","iso885914"],name:"ISO-8859-14"},{labels:["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],name:"ISO-8859-15"},{labels:["iso-8859-16"],name:"ISO-8859-16"},{labels:["cskoi8r","koi","koi8","koi8-r","koi8_r"],name:"KOI8-R"},{labels:["koi8-ru","koi8-u"],name:"KOI8-U"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],name:"windows-874"},{labels:["cp1250","windows-1250","x-cp1250"],name:"windows-1250"},{labels:["cp1251","windows-1251","x-cp1251"],name:"windows-1251"},{labels:["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],name:"windows-1252"},{labels:["cp1253","windows-1253","x-cp1253"],name:"windows-1253"},{labels:["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],name:"windows-1254"},{labels:["cp1255","windows-1255","x-cp1255"],name:"windows-1255"},{labels:["cp1256","windows-1256","x-cp1256"],name:"windows-1256"},{labels:["cp1257","windows-1257","x-cp1257"],name:"windows-1257"},{labels:["cp1258","windows-1258","x-cp1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy single-byte encodings"},{encodings:[{labels:["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],name:"GBK"},{labels:["gb18030"],name:"gb18030"}],heading:"Legacy multi-byte Chinese (simplified) encodings"},{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"Big5"}],heading:"Legacy multi-byte Chinese (traditional) encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"EUC-JP"},{labels:["csiso2022jp","iso-2022-jp"],name:"ISO-2022-JP"},{labels:["csshiftjis","ms932","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],name:"Shift_JIS"}],heading:"Legacy multi-byte Japanese encodings"},{encodings:[{labels:["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],name:"EUC-KR"}],heading:"Legacy multi-byte Korean encodings"},{encodings:[{labels:["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr"],name:"replacement"},{labels:["utf-16be"],name:"UTF-16BE"},{labels:["utf-16","utf-16le"],name:"UTF-16LE"},{labels:["x-user-defined"],name:"x-user-defined"}],heading:"Legacy miscellaneous encodings"}],J={};F.forEach((function(n){n.encodings.forEach((function(n){n.labels.forEach((function(e){J[e]=n}))}))}));var K,R,G={},N={},q="utf-8";Object.defineProperty&&(Object.defineProperty(c.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),Object.defineProperty(c.prototype,"fatal",{get:function(){return"fatal"===this._error_mode}}),Object.defineProperty(c.prototype,"ignoreBOM",{get:function(){return this._ignoreBOM}})),c.prototype.decode=function(n,e){var i;i="object"==typeof n&&n instanceof ArrayBuffer?new Uint8Array(n):"object"==typeof n&&"buffer"in n&&n.buffer instanceof ArrayBuffer?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(0),e=r(e),this._do_not_flush||(this._decoder=N[this._encoding.name]({fatal:"fatal"===this._error_mode}),this._BOMseen=!1),this._do_not_flush=Boolean(e.stream);for(var o,s=new t(i),a=[];;){var u=s.read();if(u===P)break;if((o=this._decoder.handler(s,u))===D)break;null!==o&&(Array.isArray(o)?a.push.apply(a,o):a.push(o))}if(!this._do_not_flush){do{if((o=this._decoder.handler(s,s.read()))===D)break;null!==o&&(Array.isArray(o)?a.push.apply(a,o):a.push(o))}while(!s.endOfStream());this._decoder=null}return function(n){return!function(n,e){return-1!==n.indexOf(e)}(["UTF-8","UTF-16LE","UTF-16BE"],this._encoding.name)||this._ignoreBOM||this._BOMseen||(n.length>0&&65279===n[0]?(this._BOMseen=!0,n.shift()):n.length>0&&(this._BOMseen=!0)),function(n){for(var e="",r=0;r<n.length;++r){var i=n[r];i<=65535?e+=String.fromCharCode(i):(i-=65536,e+=String.fromCharCode(55296+(i>>10),56320+(1023&i)))}return e}(n)}.call(this,a)},Object.defineProperty&&Object.defineProperty(d.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),d.prototype.encode=function(n,e){n=void 0===n?"":String(n),e=r(e),this._do_not_flush||(this._encoder=G[this._encoding.name]({fatal:"fatal"===this._fatal})),this._do_not_flush=Boolean(e.stream);for(var i,o=new t(function(n){for(var e=String(n),r=e.length,i=0,t=[];i<r;){var o=e.charCodeAt(i);if(o<55296||o>57343)t.push(o);else if(56320<=o&&o<=57343)t.push(65533);else if(55296<=o&&o<=56319)if(i===r-1)t.push(65533);else{var s=e.charCodeAt(i+1);if(56320<=s&&s<=57343){var a=1023&o,u=1023&s;t.push(65536+(a<<10)+u),i+=1}else t.push(65533)}i+=1}return t}(n)),s=[];;){var a=o.read();if(a===P)break;if((i=this._encoder.handler(o,a))===D)break;Array.isArray(i)?s.push.apply(s,i):s.push(i)}if(!this._do_not_flush){for(;(i=this._encoder.handler(o,o.read()))!==D;)Array.isArray(i)?s.push.apply(s,i):s.push(i);this._encoder=null}return new Uint8Array(s)},G["UTF-8"]=function(n){return new g(n)},N["UTF-8"]=function(n){return new h(n)},"encoding-indexes"in n&&F.forEach((function(n){"Legacy single-byte encodings"===n.heading&&n.encodings.forEach((function(n){var e=n.name,r=f(e.toLowerCase());N[e]=function(n){return new p(r,n)},G[e]=function(n){return new _(r,n)}}))})),N.GBK=function(n){return new b(n)},G.GBK=function(n){return new w(n,!0)},G.gb18030=function(n){return new w(n)},N.gb18030=function(n){return new b(n)},G.Big5=function(n){return new v(n)},N.Big5=function(n){return new m(n)},G["EUC-JP"]=function(n){return new x(n)},N["EUC-JP"]=function(n){return new y(n)},G["ISO-2022-JP"]=function(n){return new k(n)},N["ISO-2022-JP"]=function(n){return new O(n)},G.Shift_JIS=function(n){return new j(n)},N.Shift_JIS=function(n){return new E(n)},G["EUC-KR"]=function(n){return new S(n)},N["EUC-KR"]=function(n){return new B(n)},G["UTF-16BE"]=function(n){return new U(!0,n)},N["UTF-16BE"]=function(n){return new I(!0,n)},G["UTF-16LE"]=function(n){return new U(!1,n)},N["UTF-16LE"]=function(n){return new I(!1,n)},G["x-user-defined"]=function(n){return new A(n)},N["x-user-defined"]=function(n){return new C(n)},n.TextEncoder||(n.TextEncoder=d),n.TextDecoder||(n.TextDecoder=c),"undefined"!=typeof module&&module.exports&&(module.exports={TextEncoder:n.TextEncoder,TextDecoder:n.TextDecoder,EncodingIndexes:n["encoding-indexes"]})}(this||{});