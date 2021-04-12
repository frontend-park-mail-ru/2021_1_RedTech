import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

import HomeView from './HomeView.pug';
import Header from '../../components/Header/Header.pug'
import HomeContent from '../../components/HomeContent/HomeContent.pug'
import ErrorPage from '../../components/ErrorPage/ErrorPage.pug'
import Loader from '../../components/Loader/Loader.pug'
import { Events } from '../../consts/events.js';

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
        const template = Loader;
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:InfoForHeader');
        this.eventBus.emit('homepage:getMainPageContent');
    }

    /**
     * Render header from pug template.
     * @param {Object} data - Contains flag of authorizing.
     */
    renderHeader = (data) => {
        const template = Header(data);
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

        const template = HomeContent(this._data);
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
        const template = ErrorPage();
        APPLICATION.innerHTML = template;
    }

    /**
     * Set event listeners for header.
     */
    setEventListenersForHeader = () => {
        const removeAllListeners = () => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
            profileLink?.removeEventListener(('click'), profileLinkHandler);
            loginPage?.removeEventListener(('click'), loginPageHandler);
            logoutPage?.removeEventListener(('click'), logoutPageHandler);
        };

        const profileLinkHandler = (event) => {
            this.eventBus.emit('homepage:removeEventListeners');
            this.eventBus.emit('profile:removeEventListeners');
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
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const topFilmSeriesHandler = (event) => {
            window.scrollTo(0, 0);
            removeEventListeners();

            const target = event.target.closest('.item__film-card');
            event.preventDefault();

            if (target) {
                const transmitData = {
                    path: target.getAttribute('href'),
                }

                console.log(transmitData);
                this.eventBus.emit(Events.PathChanged, transmitData);
            }
        };

        const newFilmSeriesHandler = (event) => {
            window.scrollTo(0, 0);
            removeEventListeners();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                const transmitData = {
                    path: target.getAttribute('href'),
                }

                console.log(transmitData);
                this.eventBus.emit(Events.PathChanged, transmitData);
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
