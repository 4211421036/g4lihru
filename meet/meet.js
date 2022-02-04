const template = document.createElement('template');
template.innerHTML = `
<style>
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.container {
  width: 100%;
}
.justify-center {
  justify-content: center;
}
.items-center {
  align-items: center;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.font-bold {
  font-weight: 700;
}

.flex {
  display: flex;
}
.uppercase {
  text-transform: uppercase;
}
.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
<div class="container mx-auto">
	<div class="flex justify-center items-center py-4">
		<h1 class="text-2xl font-bold uppercase"></h1>
	</div>
</div>
`;

class meet extends HTMLElement {
    constructor() {
        super();
	this.showVideo = true;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
	this.shadowRoot.querySelector('h1').innerText = this.getAttribute('meet');
}

window.customElements.define('pljr-header', meet);
