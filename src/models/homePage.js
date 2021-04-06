import { getCurrentUser, getLogout, getNewFilms, getNewSeries, getTopFilmsAndSeries } from '../modules/http.js';

/** Class representing home page model. */
export class HomePageModel {
    /**
     * Create a home page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('homepage:InfoForHeader', this.getInfoForHeader);
        this.eventBus.on('homepage:logout', this.logout);
        this.eventBus.on('homepage:getMainPageContent', this.getMainPageContent);
    }

    /**
     * Get info for main page about films, series and emit render content.
     */
    getMainPageContent = () => {
        const topFilmsAndSeries = getTopFilmsAndSeries();
        const newFilms = getNewFilms();
        const newSeries = getNewSeries();
        Promise.all([topFilmsAndSeries, newFilms, newSeries]).then((values) => {
            this.eventBus.emit('homepage:renderContent', values[0], values[1], values[2]);
            this.eventBus.emit('homepage:setEventListeners');
        });
    }

    /**
     * Get info for main page about header and emit render header.
     */
    getInfoForHeader = () => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                this.eventBus.emit('homepage:renderHeader', true);
            } else {
                this.eventBus.emit('homepage:renderHeader', false);
            }
            this.eventBus.emit('homepage:setEventListenersForHeader');
        });
    }

    /**
     * Logout user, and rerender home page.
     */
    logout = () => {
        getLogout().then(() => {
            this.eventBus.emit('homepage:render');
        });
    }
}
