customElements.define('recis-side', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
            .innerHTML = '<slot></slot>'
    }

    connectedCallback() {
        //mousedown anywhere
        this.mouse_down = ev => !this.contains(ev.target) && toggle_menu()

        //toggle menu and window listener 
        var toggle_menu = () => {
            if (this.classList.toggle('show'))
                window.addEventListener('mousedown', this.mouse_down)
            else
                window.removeEventListener('mousedown', this.mouse_down)
        }

        //click on menu
        this.addEventListener('click', toggle_menu)
    }

    disconnectedCallback() {
        this.removeEventListener('mousedown', this.mouse_down)
    }
})
