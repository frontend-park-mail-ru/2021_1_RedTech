import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import { scrollToTop } from '../../modules/utils.js';

/** Class representing home page view. */
export class HomePageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('homepage:render', this.render);
        this.eventBus.on('homepage:renderHeader', this.renderHeader);
        this.eventBus.on('homepage:setEventListeners', this.setEventListeners);
        this.eventBus.on('homepage:setEventListenersForHeader', this.setEventListenersForHeader);
        this.eventBus.on('homepage:renderContent', this.renderContent);
        this.eventBus.on('homepage:renderErrorPage', this.renderErrorPage);
    }
    /**
     * Render html home page from pug template.
     */
    render = () => {
        const template = puglatizer.components.Loader.Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:InfoForHeader');
        this.eventBus.emit('homepage:getMainPageContent');
    }

    /**
     * Render header from pug template.
     * @param {Object} data - Contains flag of authorizing.
     */
    renderHeader = (data) => {
        const template = puglatizer.components.Header.Header(data);
        const [header] = document.getElementsByTagName('header');
        if (header) {
            header.outerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }
    /**
     * Render content home page from pug template to content div.
     */
    renderContent = (cardFilms, newFilms, newSeries) => {
        this._data = {
            cardFilms,
            newFilms,
            newSeries,
        };
        const template = puglatizer.components.HomeContent.HomeContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }

    /**
     * Render error page from pug template.
     */
    renderErrorPage = () => {
        const template = puglatizer.components.ErrorPage.ErrorPage();
        APPLICATION.innerHTML = template;
    }

    /**
     * Set event listeners for header.
     */
    setEventListenersForHeader = () => {
        const removeAllListeners = () => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            this.eventBus.emit('mediateka:removeEventListener');
            this.eventBus.emit('genrepage:removeEventListener');
            this.eventBus.emit('detailpage:removeEventListeners');
            profileLink?.removeEventListener(('click'), profileLinkHandler);
            loginPage?.removeEventListener(('click'), loginPageHandler);
            logoutPage?.removeEventListener(('click'), logoutPageHandler);
            homeLink.forEach((element) => {
                element?.removeEventListener(('click'), aMainHandler);
            });
            filmPage?.removeEventListener(('click'), filmPageHandler);
            seriesPage?.removeEventListener(('click'), filmPageHandler);
        };

        const aMainHandler = (event) => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            this.eventBus.emit('mediateka:removeEventListener');
            this.eventBus.emit('genrepage:removeEventListener');
            this.eventBus.emit('detailpage:removeEventListeners');
            event.preventDefault();

            this.eventBus.emit('homepage:getMainPageContent');
        };

        const filmPageHandler = (event) => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            this.eventBus.emit('mediateka:removeEventListener');
            this.eventBus.emit('genrepage:removeEventListener');
            this.eventBus.emit('detailpage:removeEventListeners');
            event.preventDefault();

            const data = {
                isFilm: false
            };

            if (event.target.className.includes('filmPage')) {
                data.isFilm = true;
            }

            this.eventBus.emit('mediateka:getPageContent', data);
        };

        const profileLinkHandler = (event) => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            this.eventBus.emit('mediateka:removeEventListener');
            this.eventBus.emit('genrepage:removeEventListener');
            this.eventBus.emit('detailpage:removeEventListeners');
            event.preventDefault();

            this.eventBus.emit('profile:getInfoAboutCurrentUser');
        };
        const loginPageHandler = (event) => {
            removeAllListeners();
            event.preventDefault();

            this.eventBus.emit('login:render');
        };
        const logoutPageHandler = (event) => {
            removeAllListeners();
            event.preventDefault();

            this.eventBus.emit('homepage:logout');
        };

        const profileLink = document.querySelector('.js-profile-page');
        profileLink?.addEventListener(('click'), profileLinkHandler);

        const loginPage = document.querySelector('.js-login-page');
        loginPage?.addEventListener(('click'), loginPageHandler);

        const logoutPage = document.querySelector('.js-logout-page');
        logoutPage?.addEventListener(('click'), logoutPageHandler);

        const filmPage = document.querySelector('.js-films-link');
        filmPage?.addEventListener(('click'), filmPageHandler);

        const seriesPage = document.querySelector('.js-serials-link');
        seriesPage?.addEventListener(('click'), filmPageHandler);

        const homeLink = document.querySelectorAll('.js-home-link');
        homeLink.forEach((element) => {
            element?.addEventListener(('click'), aMainHandler);
        });
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const topMediaImgs = document.querySelectorAll('.item__card-image');
        const newMediaImgs = document.querySelectorAll('.item__suggestion__image');

        topMediaImgs.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = 'img/not-found.jpeg';
            });
        });

        newMediaImgs.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = 'img/not-found.jpeg';
            });
        });

        const topFilmSeriesHandler = (event) => {
            scrollToTop();
            removeEventListeners();

            const target = event.target.closest('.item__film-card');
            event.preventDefault();

            if (target) {
                this.eventBus.emit('detailpage:getInfoAboutFilm', target.id.substr('top'.length));
            }
        };

        const newFilmSeriesHandler = (event) => {
            scrollToTop();
            removeEventListeners();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                this.eventBus.emit('detailpage:getInfoAboutFilm', target.id.substr('suggest'.length));
            }
        };

        const [filmContainer] = document.getElementsByClassName('container');
        filmContainer?.addEventListener(('click'), topFilmSeriesHandler);

        const [newFilms] = document.getElementsByClassName('new_films');
        newFilms?.addEventListener(('click'), newFilmSeriesHandler);

        const [newSeries] = document.getElementsByClassName('new_series');
        newSeries?.addEventListener(('click'), newFilmSeriesHandler);

        const removeEventListeners = () => {
            filmContainer?.removeEventListener(('click'), topFilmSeriesHandler);
            newSeries?.removeEventListener(('click'), newFilmSeriesHandler);
            newFilms?.removeEventListener(('click'), newFilmSeriesHandler);
        };

        this.eventBus.on('homepage:removeEventListeners', removeEventListeners);
    }
}
