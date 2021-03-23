import { APPLICATION } from '../../main.js';
import { ProfileView } from '../Profile/Profile.js';
import { LogInView } from '../LogIn/LogIn.js';
import { getCurrentUser, getDetailFilmPage, getLogout } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';

/** Class representing film detail page view. */
export class DetailComponent {
    /**
     * Create a home page view.
     * @param {Object} data - Parameters for film detail page view.
     */
    constructor({
        data = [],
    } = {}) {
        this._data = data;
    }
    /**
     * Render html film detail page from pug template.
     */
    render() {
        getCurrentUser().then((idUser) => {
            let headerIcons = {};
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

            getDetailFilmPage().then((film) => {
                const profileView = new ProfileView({
                    data: {
                        idUser,
                    }
                });
                const logInView = new LogInView();
                const homeComponent = new HomeComponent();
                const homeView = new HomeComponent();

                if (film) {
                    this._data = {
                        headerIcons,
                        filmData: film,
                    };
                    const template = puglatizer.DetailView.DetailView(this._data);
                    APPLICATION.innerHTML = template;
                }

                const profileLinkHandler = (event) => {
                    profileLink?.removeEventListener(('click'), profileLinkHandler);
                    loginPage?.removeEventListener(('click'), loginPageHandler);
                    aMain?.removeEventListener(('click'), aMainHandler);
                    logoutPage?.removeEventListener(('click'), logoutPageHandler);

                    event.preventDefault();

                    APPLICATION.innerHTML = '';

                    profileView.render();
                };
                const loginPageHandler = (event) => {
                    profileLink?.removeEventListener(('click'), profileLinkHandler);
                    loginPage?.removeEventListener(('click'), loginPageHandler);
                    aMain?.removeEventListener(('click'), aMainHandler);
                    logoutPage?.removeEventListener(('click'), logoutPageHandler);

                    event.preventDefault();

                    APPLICATION.innerHTML = '';

                    logInView.render();
                };
                const aMainHandler = (event) => {
                    profileLink?.removeEventListener(('click'), profileLinkHandler);
                    loginPage?.removeEventListener(('click'), loginPageHandler);
                    aMain?.removeEventListener(('click'), aMainHandler);
                    logoutPage?.removeEventListener(('click'), logoutPageHandler);

                    event.preventDefault();

                    APPLICATION.innerHTML = '';

                    homeComponent.render();
                };
                const logoutPageHandler = (event) => {
                    event.preventDefault();

                    getLogout().then((responseStatus) => {
                        if (responseStatus) {
                            profileLink?.removeEventListener(('click'), profileLinkHandler);
                            loginPage?.removeEventListener(('click'), loginPageHandler);
                            aMain?.removeEventListener(('click'), aMainHandler);
                            logoutPage?.removeEventListener(('click'), logoutPageHandler);

                            APPLICATION.innerHTML = '';

                            homeView.render();
                        }
                    });
                };

                const profileLink = document?.getElementById('profilePage');
                profileLink?.addEventListener(('click'), profileLinkHandler);

                const loginPage = document.getElementById('loginPage');
                loginPage?.addEventListener(('click'), loginPageHandler);

                const [aMain] = document.getElementsByClassName('homePage');
                aMain?.addEventListener(('click'), aMainHandler);

                const logoutPage = document.getElementById('logoutPage');
                logoutPage?.addEventListener(('click'), logoutPageHandler);
            });
        });
    }
}
