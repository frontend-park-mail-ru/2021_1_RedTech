import {APPLICATION, homePage} from '../../main.js';
import {SignUpView} from '../SignUp/SignUp.js';
// import {HomeComponent} from '../HomeView/HomeView.js';


export class DetailComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.DetailView.DetailView(this._data);
        //console.log(template())
        this._parent.innerHTML = template;

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();
        });

        const [aMain] = document.getElementsByClassName('homePage');
        aMain?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            homePage();
        });
    }
}


