import {getCurrentUser, getLogout} from '../modules/http.js';

export class HomePageModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('homepage:getCurrentUser', this.getCurrentUser.bind(this));
        this.eventBus.on('homepage:logout', this.logout.bind(this));
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
            this.eventBus.emit('homepage:render');
        });
    }
}