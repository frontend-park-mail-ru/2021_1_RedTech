import {APPLICATION, detailPage} from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { ProfileView } from '../Profile/Profile.js';

export class HomeComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {
        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.HomeView.HomeView(this._data);
        this._parent.innerHTML = template;

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new ProfileView();
            signUpView.render();
        });

        const loginPage = document.getElementById('loginPage');
        loginPage?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const logInView = new LogInView();
            logInView.render();
        });

        const logoutPage = document.getElementById('logoutPage');
        logoutPage?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            localStorage.removeItem('ID');
            const logInView = new LogInView();
            logInView.render();
        });

        const [linkFilm] = document.getElementsByClassName('film_link_1');
        linkFilm?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            detailPage();
        });
    }
}
