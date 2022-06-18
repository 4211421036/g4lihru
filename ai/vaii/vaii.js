const template = document.createElement('template');
template.innerHTML = `
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0px;
            border: 0;
            overflow: hidden;
            /*  Disable scrollbars */
            display: block;
            /* No floating content on sides */
        }

        .float {
            position: fixed;
            bottom: 40px;
            right: 40px;
            text-align: center;
            overflow: hidden;
        }

        .float1 {
            position: fixed;
            bottom: 288px;
            right: 40px;
            text-align: center;
            overflow: hidden;
        }

        .my-float {
            margin-top: 22px;
        }
    </style>
    <div class="float">
        <iframe class="my-float" id="myvaii" style="cursor: -webkit-grab; cursor: grab;" src="https://g4lihru.me/ai/vaii/v" width="256" height="256" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
    </div>
    <div class="float1">
        <iframe class="my-float" id="vaiical" style="cursor: -webkit-grab; cursor: grab;" src="https://g4lihru.me/ai/vaii/vaii-call" width="177" height="176" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
    </div>
    <script>
        vaiical.onmousedown = function(event) {
            vaiical.style.position = 'absolute';
            vaiical.style.zIndex = 1000;
            document.body.appendChild(vaiical);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                vaiical.style.left = pageX - vaiical.offsetWidth / 2 + 'px';
                vaiical.style.top = pageY - vaiical.offsetHeight / 2 + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            vaiical.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                vaiical.onmouseup = null;
            };

        };


        vaiical.ondragstart = function() {
            return false;
        };
    </script>
    
    <script>
        myvaii.onmousedown = function(event) {
            myvaii.style.position = 'absolute';
            myvaii.style.zIndex = 1000;
            document.body.appendChild(vaiical);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                myvaii.style.left = pageX - myvaii.offsetWidth / 2 + 'px';
                myvaii.style.top = pageY - myvaii.offsetHeight / 2 + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            myvaii.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                myvaii.onmouseup = null;
            };

        };


        myvaii.ondragstart = function() {
            return false;
        };
    </script>
`;

class vaii extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
window.customElements.define('vaii-video', vaii);
