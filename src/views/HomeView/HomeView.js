import {APPLICATION, detailPage} from '../../main.js';
import { SignUpView } from '../SignUp/SignUp.js';
import {ProfileView} from '../Profile/Profile.js';
// import {DetailComponent} from '../DetailView/DetailView.js';

export class HomeComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.HomeView.HomeView();
        this._parent.innerHTML = template;

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new ProfileView();
            signUpView.render();
        });

        const favouriteLink = document.getElementById('favouritePage');
        favouriteLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();
        });

        const [linkFilm] = document.getElementsByClassName('film_link_1');
        linkFilm?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            detailPage();
        });
    }
}


