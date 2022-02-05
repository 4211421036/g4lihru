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

        .menu {
            padding: 0;
        }

        .modal:before {
            content: '';
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }

        .modal-dialog {
            display: inline-block;
            vertical-align: middle;
        }

        .modal .modal-content {
            padding: 20px 20px 20px 20px;
            -webkit-animation-name: modal-animation;
            -webkit-animation-duration: 0.5s;
            animation-name: modal-animation;
            animation-duration: 0.5s;
        }

        @-webkit-keyframes modal-animation {
            from {
                top: -100px;
                opacity: 0;
            }
            to {
                top: 0px;
                opacity: 1;
            }
        }

        @keyframes modal-animation {
            from {
                top: -100px;
                opacity: 0;
            }
            to {
                top: 0px;
                opacity: 1;
            }
        }
    </style>
    <div class="float">
        <iframe class="my-float" src="https://g4lihru.me/ai/vaii/v" width="256" height="256" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
    </div>
    <div class="float1">
        <iframe class="my-float" src="https://g4lihru.me/vcs" width="177" height="176" scrolling="no" allow="autoplay" frameBorder="0"></iframe>
    </div>
    <script type="text/javascript">
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            btn.onclick = function() {
                modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
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
