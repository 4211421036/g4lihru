const template = document.createElement('template');
template.innerHTML = `
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://g4lihru.me/345678987.css" />
    <link rel="stylesheet" href="https://g4lihru.me/09873234.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>
    <link rel="stylesheet" href="g4lihru.me/drive/video/video.css" />
        <div class="sidebar">
            <div class="logo-details">
                <i src="//g4lihru.me/drive/logo.png" class='bx-tada bx-rotate-90'></i>
                <div class="logo_name">Drive</div>
                <i class='bx bx-menu' id="btn"></i>
            </div>
            <ul class="nav-list">
                <li>
                    <i class='bx bx-search'></i>
                    <input class="search-input" id="fileSearch" type="text" placeholder="Search...">
                    <span class="tooltip">Search</span>
                </li>
                <li>
                    <a href="//g4lihru.me/drive/">
                        <i class='bx bxs-hdd bx-tada bx-rotate-90'></i>
                        <span class="links_name">Drive Saya</span>
                    </a>
                    <span class="tooltip">Drive Saya</span>
                </li>
                <li>
                    <a href="//g4lihru.me/drive/video/">
                        <i class='bx bxs-videos bx-tada bx-rotate-90'></i>
                        <span class="links_name">Video</span>
                    </a>
                    <span class="tooltip">Video</span>
                </li>
                <li>
                    <a href="//g4lihru.me/drive/pdf/">
                        <i class='bx bxs-file-pdf bx-tada bx-rotate-90'></i>
                        <span class="links_name">Pdf</span>
                    </a>
                    <span class="tooltip">Pdf</span>
                </li>
                <li>
                    <a href="//g4lihru.me/drive/img/">
                        <i class='bx bxs-file-image bx-tada bx-rotate-90'></i>
                        <span class="links_name">Gambar</span>
                    </a>
                    <span class="tooltip">Gambar</span>
                </li>
                <li>
                    <a href="//g4lihru.me/drive/audio/">
                        <i class='bx bx-podcast bx-tada'></i>
                        <span class="links_name">Audio</span>
                    </a>
                    <span class="tooltip">Audio</span>
                </li>
                <li>
                    <a href="//instagram.com/galih_ridho_utomo">
                        <i href="//instagram.com/galih_ridho_utomo" class='bx bxl-instagram-alt bx-tada bx-rotate-90' id="log_out"></i>
                        <span class="links_name">Instagram</span>
                    </a>
                    <span class="tooltip">Instagram</span>
                </li>
                <li class="profile">
                    <div class="profile-details">
                        <img src="https://g4lihru.me/345677.png" alt="profileImg">
                        <div class="name_job">
                            <div class="name">Galih Ridho Utomo</div>
                            <div class="job">Mahasiswa UNNES</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
`;

class plvideo extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }
}

window.customElements.define('pljr-side', plvideo);
