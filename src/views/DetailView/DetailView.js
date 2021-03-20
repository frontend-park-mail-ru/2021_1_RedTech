import { APPLICATION } from '../../main.js';
import { ProfileView } from '../Profile/Profile.js';
import { LogInView } from '../LogIn/LogIn.js';
import { getCurrentUser, getDetailFilmPage, getLogout } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';
import { filmJsonToFilm } from '../../modules/adapters.js';

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
     * Render html film detail page from pug template to parent.
     */
    async render() {

        let {status: responseStatus, parsedJson: responseBody} = await getCurrentUser();
        const idUser = responseBody.id;
        let headerIcons = {};

        if (responseStatus === 200) {
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

        let response = await getDetailFilmPage();

        responseStatus = response.status;
        responseBody = response.parsedJson;

        let film = {};
        if (responseStatus === 200) {
            film = filmJsonToFilm(responseBody);
            this._data = {
                headerIcons,
                filmData: film,
            };
            const template = puglatizer.DetailView.DetailView(this._data);
            APPLICATION.innerHTML = template;
        }

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), async event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const profileView = new ProfileView({
                data: {
                    idUser: idUser,
                }
            });
            await profileView.render();
        });

        const loginPage = document.getElementById('loginPage');
        loginPage?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const logInView = new LogInView();
            logInView.render();
        });

        const [aMain] = document.getElementsByClassName('homePage');
        aMain?.addEventListener(('click'), async event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const homeComponent = new HomeComponent();
            homeComponent.render();
        });

        const logoutPage = document.getElementById('logoutPage');
        logoutPage?.addEventListener(('click'), async event => {
            event.preventDefault();

            let responseStatus = await getLogout();

            if (responseStatus === 200) {
                APPLICATION.innerHTML = '';

                const homeView = new HomeComponent();
                await homeView.render();
            }
        });
    }
}
