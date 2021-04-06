import {getCurrentUser, getLogout, getNewFilms, getNewSeries, getTopFilmsAndSeries} from '../modules/http.js';

export class HomePageModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('homepage:getCurrentUser', this.getCurrentUser.bind(this));
        this.eventBus.on('homepage:logout', this.logout.bind(this));
        this.eventBus.on('homepage:getMainPageFilms', this.getMainPageFilms.bind(this));
    }

    getMainPageFilms() {
        const topFilmsAndSeries = getTopFilmsAndSeries();
        const newFilms = getNewFilms();
        const newSeries = getNewSeries();
        Promise.all([topFilmsAndSeries, newFilms, newSeries]).then((values) => {
            this.eventBus.emit('homepage:renderContent', values[0], values[1], values[2]);
            this.eventBus.emit('homepage:setEventListeners');
        });
    }

    getCurrentUser() {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                this.eventBus.emit('homepage:renderHeader', true);
            } else {
                this.eventBus.emit('homepage:renderHeader', false);
            }
            this.eventBus.emit('homepage:setEventListenersForHeader');
        });
    }

    logout() {
        getLogout().then(() => {
            this.eventBus.emit('homepage:getMainPageFilms');
        });
    }
}
