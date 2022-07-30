let login = document.createElement("opdi-app")
document.body.appendChild(login);

let tit = document.createElement('title')
tit.innerText = 'hallo'
document.head.appendChild(tit)

let mtu = document.createElement('meta')
mtu.setAttribute('charset', 'UTF-8')
document.head.appendChild(mtu)

let mtp = document.createElement('meta')
mtp.setAttribute('http-equiv', 'X-UA-Compatible')
mtp.setAttribute('content', 'IE=edge')
document.head.appendChild(mtp)

let mtv = document.createElement('meta')
mtv.setAttribute('name', 'viewport')
mtv.setAttribute('content', 'width=device-width, initial-scale=1.0')
document.head.appendChild(mtv)


// Create a class for the element
class OpdiApp extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });


        // Create form
        const form = document.createElement('opdi-form');
        form.setAttribute('class', 'registration-form');

        const header = document.createElement('opdi-header');
        header.setAttribute('class', 'header');

        const sign = document.createElement('opdi-form-sign');
        sign.setAttribute('class', 'btn btn-tab btn-ripple active');
        sign.setAttribute('data-target-tab', '#signin');
        sign.textContent = 'SIGN IN'

        const signup = document.createElement('opdi-form-signup');
        signup.setAttribute('class', 'btn btn-tab btn-ripple');
        signup.setAttribute('data-target-tab', '#signup');
        signup.textContent = 'SIGN UP'

        const bod = document.createElement('opdi-body');
        bod.setAttribute('class', 'body');

        const content = document.createElement('opdi-content');
        content.setAttribute('class', 'content active');
        content.setAttribute('id', '#signin');

        const h1 = document.createElement('h1');
        h1.textContent = 'Sign in to your acccount';

        const p = document.createElement('p');
        p.setAttribute('class', 'gray');
        p.textContent = 'Sign in to access all free resources';

        const formred = document.createElement('form');

        const ind = document.createElement('opdi-input-gruop');
        ind.setAttribute('class', 'input-gruop');

        const inp = document.createElement('input');
        inp.setAttribute('type', 'text');
        inp.setAttribute('name', ' ');
        inp.setAttribute('id', 'email-signin');
        inp.setAttribute('class', 'input-elem');
        inp.setAttribute('placeholder', ' ');
        inp.setAttribute('autocomplete', 'off');

        const lab = document.createElement('label');
        lab.setAttribute('for', 'email-signin');
        lab.textContent = 'Email'

        const inn = document.createElement('opdi-input-gruop');
        inn.setAttribute('class', 'input-gruop');

        const inl = document.createElement('input');
        inl.setAttribute('type', 'password');
        inl.setAttribute('name', ' ');
        inl.setAttribute('id', 'email-signin');
        inl.setAttribute('class', 'input-elem');
        inl.setAttribute('placeholder', ' ');
        inl.setAttribute('autocomplete', 'off');

        const lab2 = document.createElement('label');
        lab2.setAttribute('for', 'email-signin');
        lab2.textContent = 'Password'

        const iv = document.createElement('i');
        iv.setAttribute('class', 'fas fa-eye-slash eye')

        const agg = document.createElement('opdi-agree');
        agg.setAttribute('class', 'agreements')

        const aid = document.createElement('input');
        aid.setAttribute('type', 'checkbox');
        aid.setAttribute('name', ' ');
        aid.setAttribute('id', 'rem_pass');

        const lab3 = document.createElement('label');
        lab3.setAttribute('for', 'rem_pass')
        lab3.setAttribute('class', 'grey')
        lab3.textContent = 'Remember Password'

        const sinf = document.createElement('opdi-content')

        const h1f = document.createElement('h1')
        h1f.textContent = 'REGISTER'

        const pf = document.createElement('p')
        pf.setAttribute('class', 'grey')
        pf.textContent = 'You can use this account to log in to any of our products'

        const formredf = document.createElement('form');

        const indf = document.createElement('opdi-input-gruop');
        indf.setAttribute('class', 'input-gruop');

        const inpf = document.createElement('input');
        inpf.setAttribute('type', 'text');
        inpf.setAttribute('name', ' ');
        inpf.setAttribute('id', 'name');
        inpf.setAttribute('class', 'input-elem');
        inpf.setAttribute('placeholder', ' ');
        inpf.setAttribute('autocomplete', 'off');

        const inpif = document.createElement('input');
        inpif.setAttribute('type', 'email');
        inpif.setAttribute('name', ' ');
        inpif.setAttribute('id', 'email');
        inpif.setAttribute('class', 'input-elem');
        inpif.setAttribute('placeholder', ' ');
        inpif.setAttribute('autocomplete', 'off');

        const labif = document.createElement('label');
        labif.setAttribute('for', 'name');
        labif.textContent = 'Name'

        const labf = document.createElement('label');
        labf.setAttribute('for', 'email');
        labf.textContent = 'Email'

        const innf = document.createElement('opdi-input-gruop');
        inn.setAttribute('class', 'input-gruop');

        const inlf = document.createElement('input');
        inlf.setAttribute('type', 'password');
        inlf.setAttribute('name', ' ');
        inlf.setAttribute('id', 'password');
        inlf.setAttribute('class', 'input-elem');
        inlf.setAttribute('placeholder', ' ');
        inlf.setAttribute('autocomplete', 'off');

        const lab2f = document.createElement('label');
        lab2.setAttribute('for', 'email-signin');
        lab2.textContent = 'Password'

        const ivf = document.createElement('i');
        ivf.setAttribute('class', 'fas fa-eye-slash eye')

        const aggf = document.createElement('opdi-agree');
        agg.setAttribute('class', 'agreements')

        const aidf = document.createElement('input');
        aidf.setAttribute('type', 'checkbox');
        aidf.setAttribute('name', ' ');
        aidf.setAttribute('id', 'terms');

        const lab3f = document.createElement('label');
        lab3f.setAttribute('for', 'terms')
        lab3f.setAttribute('class', 'grey')
        lab3f.textContent = 'Agree to our conditions'

        const bty = document.createElement('button');
        bty.classList = 'btn btn-register'
        bty.textContent = 'Sign Up'

        const loader = document.createElement('opdi-loader');

        let imgUrl;
        if (this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'https://raw.githubusercontent.com/FaiezWaseem/Video-Point/master/assets/images/71814-loading-dots.gif';
        }

        const img = document.createElement('img');
        img.src = imgUrl;

        const h1load = document.createElement('h1')
        h1load.textContent = 'Authenticating Please Wait ...'

        const spanload = document.createElement('span')
        spanload.textContent = 'Please Do not Close The Window While Authenticating... '

        loader.appendChild(img);
        loader.appendChild(h1load);
        loader.appendChild(spanload);


        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'login.css');

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(form);
        shadow.appendChild(loader);
        form.appendChild(header);
        form.appendChild(bod);
        header.appendChild(sign);
        header.appendChild(signup);
        bod.appendChild(content);
        content.appendChild(h1);
        content.appendChild(p);
        content.appendChild(formred);
        content.appendChild(formredf);
        formred.appendChild(ind);
        formred.appendChild(inn);
        inn.appendChild(inl);
        inn.appendChild(lab2);
        inn.appendChild(iv);
        formred.appendChild(agg);
        agg.appendChild(aid);
        agg.appendChild(lab3);
        ind.appendChild(inp);
        ind.appendChild(lab);
        formredf.appendChild(indf);
        formredf.appendChild(innf);
        innf.appendChild(inlf);
        innf.appendChild(lab2f);
        innf.appendChild(ivf);
        formredf.appendChild(aggf);
        formredf.appendChild(bty);
        aggf.appendChild(aidf);
        aggf.appendChild(lab3f);
        indf.appendChild(inpf);
        indf.appendChild(labif);
        indf.appendChild(inpif);
        indf.appendChild(labf);
    }
}

// Define the new element
customElements.define('opdi-app', OpdiApp);
