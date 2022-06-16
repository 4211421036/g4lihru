'use strict';

class OneDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.close = this.close.bind(this);
  }
  
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
    <div class="wrapper">
    <div class="overlay"></div>
      <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
        <button class="close" aria-label="Close">✖</button>
            <div id="myModal" class="modal" align="center">
                <!-- Modal content -->
                <div class="modal-dialog">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <header class="modal-header">
                            <div class="mx-auto">
                                <div align="center" class="py-4">
                                    <h1 align="center" style="font-size: 42px; color: black;">Record VAII</h1>
                                </div>
                            </div>
                        </header>
                        <main class="modal-body overflow-hidden">
                            <div class="container mx-auto py-8 px-4">
                                <h2 class="text-xl font-light mb-4">
                                    Record
                                </h2>

                                <video src="" autplay class="video-feedback w-full h-auto col-xs-12 col-sm-6 col-md-8 col-xs-6 col-md-4"></video>

                                <div class="flex flex-wrap -mx-4 mb-8">
                                    <button class="start-recording mx-4 flex-1 bg-gradient-to-br from-purple-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50">
                                                        Record Screen VAII
                                                      </button>
                                    <button class="stop-recording mx-4 flex-1 bg-gradient-to-br from-purple-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50" disabled>
                                                        Stop Recording
                                                      </button>
                                </div>

                                <div class="recorded-video-wrap hidden">
                                    <h2 class="text-xl text-gray-500 uppercase font-light mb-4">
                                        Hasil Record VAII
                                    </h2>

                                    <video src="" class="recorded-video w-full h-auto col-xs-12 col-sm-6 col-md-8 col-xs-6 col-md-4"></video>
                                    <div class="flex flex-wrap -mx-4">
                                        <a class="download-video text-center mx-4 flex-1 bg-gradient-to-br from-purple-500 to to-pink-500 p-4 uppercase text-lg font-bold transition-all duration-300 hover:opacity-90 disabled:opacity-50" disabled>
                                                          Download
                                                        </a>
                                        <button type="button " class="btn btn-success" onclick="upload()">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <script src="https://g4lihru.me/meet/dist/main.js"></script>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    
    
    shadowRoot.querySelector('button').addEventListener('click', this.close);
    shadowRoot.querySelector('.overlay').addEventListener('click', this.close);
    this.open = this.open;
  }
  
  disconnectedCallback() {
    this.shadowRoot.querySelector('button').removeEventListener('click', this.close);
    this.shadowRoot.querySelector('.overlay').removeEventListener('click', this.close);
  }
  
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

customElements.define('vaii-media-record', OneDialog);

const a = document.getElementById('myBtn');
a.addEventListener('click', () => {
  document.querySelector('vaii-menu-notifer').open = true;
})
