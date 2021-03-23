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
        let headerIcons = {};
        getCurrentUser().then((idUser) => {
            const profileView = new ProfileView({
                data: {
                    idUser,
                }
            });
            const logInView = new LogInView();
            const detailComponent = new DetailComponent();
            
            if (idUser) {
                headerIcons = [
                    {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
                    {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
                    {id: 'profilePage', href: '#', src: '../../assets/profile.png', alt: ''},
                    {id: 'logoutPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
                ];
            } else {
                headerIcons = [
                    {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
                    {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
                    {id: 'loginPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
                ];
            }

            this._data = {headerIcons};

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
            
            const profileLink = document.getElementById('profilePage');
            profileLink?.addEventListener(('click'), profileLinkHandler);

            const loginPage = document.getElementById('loginPage');
            loginPage?.addEventListener(('click'), loginPageHandler);

            const logoutPage = document.getElementById('logoutPage');
            logoutPage?.addEventListener(('click'), logoutPageHandler);

            const [linkFilm] = document.getElementsByClassName('film_link_1');
            linkFilm?.addEventListener(('click'), linkFilmHandler);
        });
    }
}
