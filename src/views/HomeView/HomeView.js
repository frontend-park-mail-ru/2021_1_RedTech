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
     * Render html home page from pug template to parent.
     */
    async render() {

        let {status: responseStatus, parsedJson: responseBody} = await getCurrentUser();
        
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

        this._data = { headerIcons };

        
        const template = puglatizer.HomeView.HomeView(this._data);
        APPLICATION.innerHTML = template;

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), async event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const profileView = new ProfileView({
                data: {
                    idUser: responseBody.id,
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

        const logoutPage = document.getElementById('logoutPage');
        logoutPage?.addEventListener(('click'), async event => {
            event.preventDefault();

            responseStatus = await getLogout();

            if (responseStatus === 200) {
                APPLICATION.innerHTML = '';

                await this.render();
            }
        });

        const [linkFilm] = document.getElementsByClassName('film_link_1');
        linkFilm?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            const detailComponent = new DetailComponent({
                parent: APPLICATION,
            });
            detailComponent.render();
        });
    }
}
