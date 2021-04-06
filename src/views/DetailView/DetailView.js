import { APPLICATION } from '../../main.js';
import { ProfileView } from '../Profile/Profile.js';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer.js';
import { LogInView } from '../LogIn/LogIn.js';
import { getCurrentUser, getDetailFilmPage, getLogout, getFilmStream } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';
import {currentUrl} from '../../modules/urls.js';

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
            const headerIcons = [];
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
                        isLogined: this._data.isLogined,
                        filmData: film,
                    };

                    const template = puglatizer.DetailView.DetailView(this._data);
                    APPLICATION.innerHTML = template;
                }
                const videoPlayer = new VideoPlayer('.video-player');

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

                let isLoadedVideo = false;
                const openPlayerHandler = (event) => {
                    event.preventDefault();

                    if (!isLoadedVideo) {
                        getFilmStream('1').then((filmPath) => {
                            videoPlayer.setSrc(`${currentUrl}${filmPath}`);
                            videoPlayer.visibleVideo();
                            isLoadedVideo = true;
                        });
                    } else {
                        videoPlayer.visibleVideo();
                    }
                };

                const closeOpenVideo = document.querySelector('.js-play-detail');
                closeOpenVideo.addEventListener(('click'), openPlayerHandler);

                const aMain = document.querySelector('.js-home-link');
                aMain?.addEventListener(('click'), aMainHandler);

                const profileLink = document.querySelector('.js-profile-page');
                profileLink?.addEventListener(('click'), profileLinkHandler);

                const loginPage = document.querySelector('.js-login-page');
                loginPage?.addEventListener(('click'), loginPageHandler);

                const logoutPage = document.querySelector('.js-logout-page');
                logoutPage?.addEventListener(('click'), logoutPageHandler);
            });
        });
    }
}
