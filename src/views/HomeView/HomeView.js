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
        this.eventBus.on('homepage:setEventListenersForHeader', this.setEventListenersForHeader.bind(this));
        this.eventBus.on('homepage:renderContent', this.renderContent.bind(this));
    }
    /**
     * Render html home page from pug template.
     */
    render() {
        const template = puglatizer.views.HomeView.HomeView(this._data);
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:getCurrentUser');
        this.setEventListeners.bind(this)();
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
    renderContent() {
        const template = puglatizer.components.HomeContent.HomeContent();
        const [content] = document.getElementsByClassName('content');
        content.innerHTML = template;
        this.setEventListeners.bind(this)();
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

            this.eventBus.emit('homepage:renderContent');
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

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), profileLinkHandler);

        const loginPage = document.getElementById('loginPage');
        loginPage?.addEventListener(('click'), loginPageHandler);

        const logoutPage = document.getElementById('logoutPage');
        logoutPage?.addEventListener(('click'), logoutPageHandler);

        const [aMain] = document.getElementsByClassName('homePage');
        aMain?.addEventListener(('click'), aMainHandler);
    }

    /**
     * Set event listeners.
     */
    setEventListeners() {
        const linkFilmHandler = (event) => {
            linkFilm?.removeEventListener(('click'), linkFilmHandler);

            event.preventDefault();

            this.eventBus.emit('detailpage:getDetailsAboutFilm');
        };

        const [linkFilm] = document.getElementsByClassName('film_link_1');
        linkFilm?.addEventListener(('click'), linkFilmHandler);

        const removeEventListeners = () => {
            linkFilm?.removeEventListener(('click'), linkFilmHandler);
        };

        this.eventBus.on('homepage:removeEventListeners', removeEventListeners);
    }
}
