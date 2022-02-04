const template = document.createElement('template');
template.innerHTML = `
<style>
        .home-section {
            position: relative;
            background: #E4E9F7;
            min-height: 100vh;
            top: 0;
            left: 78px;
            width: calc(100% - 78px);
            transition: all 0.5s ease;
            z-index: 2;
        }
        .card {
	    font-family: 'Arial', sans-serif;
	    background: #f4f4f4;
	    width: 100%;
            grid-gap: 10px;
            margin-bottom: 15px;
	    border-bottom: coral 5px solid;
	}

	.card video {
	    width: 100%;
            height: 100%;
	}
        .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px
        }

        .sidebar.open~.home-section {
            left: 250px;
            width: calc(100% - 250px);
        }
        
        .home-section .text {
            display: inline-block;
            color: #11101d;
            font-size: 25px;
            font-weight: 500;
            margin: 18px
        }
        
        @media (max-width: 420px) {
            .sidebar li .tooltip {
                display: none;
            }
        }
</style>
<body>
        <section class="home-section">
            <div class="text">
                <h3></h3>
            </div>
	    <pljr-post class="posts row mt-4" id="posts">
		<div class="card">
    		    <video class='image_Preview'></video>
  		</div>
            </pljr-post>
            <script src="https://g4lihriu.web.app/defualt.js"></script>
            <script src="https://g4lihriu.web.app/pelajaran.js"></script>
        </section>
</body>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase.js"></script>
<script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBvETFg2V6QYmU_TvHN3BWz1TTy4ryZqGM",
        authDomain: "g4lihriu.firebaseapp.com",
        databaseURL: "https://g4lihriu-default-rtdb.firebaseio.com",
        projectId: "g4lihriu",
        storageBucket: "g4lihriu.appspot.com",
        messagingSenderId: "387783527536",
        appId: "1:387783527536:web:8df38ac72783aea162b8b5",
        measurementId: "G-DCSX3TS7ZS"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
</script>        
`;

class plvideo extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('video').src = this.getAttribute('avatar');
    }
}

window.customElements.define('pljr-video', plvideo);
