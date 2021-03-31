import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { ProfileView } from '../Profile/Profile.js';
import { getCurrentUser, getLogout } from '../../modules/http.js';
import { DetailComponent } from '../DetailView/DetailView.js';

/** Class representing home page view. */
export class HomeComponent {
    /**
     * Create a home page view.
     * @param {Object} data - Parameters for home page view.
     */
    constructor({
        data = [],
    } = {}) {
        this._data = data;
    }
    /**
     * Render html home page from pug template.
     */
    render() {
        getCurrentUser().then((idUser) => {
            const headerIcons = [];
            const profileView = new ProfileView({
                data: {
                    idUser,
                }
            });
            const logInView = new LogInView();
            const detailComponent = new DetailComponent();

            if (idUser) {
                this._data.isLogined = true;
                headerIcons.push(
                    {className: 'js-profile-page', href: '', title: 'Профиль', alt: ''},
                    {className: 'js-logout-page', href: '', title: 'Выйти', alt: ''},
                );
            } else {
                this._data.isLogined = false;
            }

            this._data.headerIcons = headerIcons;

            const template = puglatizer.HomeView.HomeView(this._data);
            APPLICATION.innerHTML = template;

            const profileLinkHandler = (event) => {
                profileLink?.removeEventListener(('click'), profileLinkHandler);
                loginPage?.removeEventListener(('click'), loginPageHandler);
                logoutPage?.removeEventListener(('click'), logoutPageHandler);
                linkFilm?.removeEventListener(('click'), linkFilmHandler);

                event.preventDefault();

                APPLICATION.innerHTML = '';

                profileView.render();
            };

            const loginPageHandler = (event) => {
                profileLink?.removeEventListener(('click'), profileLinkHandler);
                loginPage?.removeEventListener(('click'), loginPageHandler);
                logoutPage?.removeEventListener(('click'), logoutPageHandler);
                linkFilm?.removeEventListener(('click'), linkFilmHandler);

                event.preventDefault();

                APPLICATION.innerHTML = '';

                logInView.render();
            };
            const logoutPageHandler = (event) => {
                event.preventDefault();

                getLogout().then((responseStatus) => {
                    if (responseStatus) {
                        profileLink?.removeEventListener(('click'), profileLinkHandler);
                        loginPage?.removeEventListener(('click'), loginPageHandler);
                        logoutPage?.removeEventListener(('click'), logoutPageHandler);
                        linkFilm?.removeEventListener(('click'), linkFilmHandler);
                        APPLICATION.innerHTML = '';

                        this.render();
                    }
                });
            };
            const linkFilmHandler = (event) => {
                profileLink?.removeEventListener(('click'), profileLinkHandler);
                loginPage?.removeEventListener(('click'), loginPageHandler);
                logoutPage?.removeEventListener(('click'), logoutPageHandler);
                linkFilm?.removeEventListener(('click'), linkFilmHandler);

                event.preventDefault();

                APPLICATION.innerHTML = '';

                detailComponent.render();
            };

            const profileLink = document.querySelector('.js-profile-page');
            profileLink?.addEventListener(('click'), profileLinkHandler);

            const loginPage = document.querySelector('.js-login-page');
            loginPage?.addEventListener(('click'), loginPageHandler);

            const logoutPage = document.querySelector('.js-logout-page');
            logoutPage?.addEventListener(('click'), logoutPageHandler);

            const linkFilm = document.querySelector('.js-film-card-link');
            linkFilm?.addEventListener(('click'), linkFilmHandler);
        });
    }
}

