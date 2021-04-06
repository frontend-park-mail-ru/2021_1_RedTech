import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing home page view. */
export class HomePageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} data - Parameters for home page view.
     */
    constructor(eventBus, { data = [] } = {}) {
        super(eventBus, data);
        this.eventBus.on('homepage:render', this.render.bind(this));
        this.eventBus.on('homepage:renderHeader', this.renderHeader.bind(this));
        this.eventBus.on('homepage:setEventListeners', this.setEventListeners.bind(this));
        this.eventBus.on('homepage:setEventListenersForHeader', this.setEventListenersForHeader.bind(this));
        this.eventBus.on('homepage:renderContent', this.renderContent.bind(this));
    }
    /**
     * Render html home page from pug template.
     */
    render() {
        this._data = {
            cardFilms: [],
            newFilms: [],
            newSeries: [],
        };
        const template = puglatizer.views.HomeView.HomeView(this._data);
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:getCurrentUser');
        this.eventBus.emit('homepage:getMainPageFilms');
    }

    /**
     * Render header from pug template.
     * @param {boolean} isAuthorized - Flag of authorizing.
     */
    renderHeader(isAuthorized) {
        const data = { isAuthorized: isAuthorized };
        const template = puglatizer.components.Header.Header(data);
        const [header] = document.getElementsByTagName('header');
        header.outerHTML = template;
    }
    /**
     * Render content home page from pug template to content div.
     */
    renderContent(cardFilms, newFilms, newSeries) {
        this._data = {
            cardFilms,
            newFilms,
            newSeries,
        };
        const template = puglatizer.components.HomeContent.HomeContent(this._data);
        const [content] = document.getElementsByClassName('content');
        content.innerHTML = template;
    }

    /**
     * Set event listeners for header.
     */
    setEventListenersForHeader() {
        const removeAllListeners = () => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            profileLink?.removeEventListener(('click'), profileLinkHandler);
            loginPage?.removeEventListener(('click'), loginPageHandler);
            logoutPage?.removeEventListener(('click'), logoutPageHandler);
            aMain?.removeEventListener(('click'), aMainHandler);
        };

        const aMainHandler = (event) => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            event.preventDefault();

            this.eventBus.emit('homepage:getMainPageFilms');
        };

        const profileLinkHandler = (event) => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            event.preventDefault();

            this.eventBus.emit('profile:getCurrentUser');
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

        const [aMain] = document.getElementsByClassName('homePage');
        aMain?.addEventListener(('click'), aMainHandler);
    }

    /**
     * Set event listeners.
     */
    setEventListeners() {
        const topFilmSeriesHandler = (event) => {
            window.scrollTo(0, 0);
            removeEventListeners();

            const target = event.target.closest('.item__film-card');
            event.preventDefault();

            if (target) {
                this.eventBus.emit('detailpage:getDetailsAboutFilm', target.id.substr('top'.length));
            }
        };

        const newFilmSeriesHandler = (event) => {
            window.scrollTo(0, 0);
            removeEventListeners();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                this.eventBus.emit('detailpage:getDetailsAboutFilm', target.id.substr('suggest'.length));
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
