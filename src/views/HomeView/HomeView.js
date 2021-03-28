import {APPLICATION, detailPage, homePage} from '../../main.js';
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

        const [profileLink] = document.getElementsByClassName('js-profile-page');
        profileLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const profileView = new ProfileView();
            profileView.render();
        });

        const [aLogin] = document.getElementsByClassName('js-login-page');
        aLogin?.addEventListener(('click'), event => {
            event.preventDefault();

            localStorage.removeItem('ID');

            APPLICATION.innerHTML = '';
            const logInView = new LogInView();
            logInView.render();
        });

        const [aLogout] = document.getElementsByClassName('js-logout-page');
        aLogout?.addEventListener(('click'), event => {
            event.preventDefault();

            localStorage.removeItem('ID');

            APPLICATION.innerHTML = '';
            const logInView = new LogInView();
            logInView.render();
        });

        const [linkFilm] = document.getElementsByClassName('js-film-card-link');
        linkFilm?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            detailPage();
        });
    }
}
