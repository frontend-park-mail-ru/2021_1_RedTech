import { getDetailFilm } from '../modules/http.js';

/** Class representing detail page about film model. */
export class DetailPageModel {
    /**
     * Create a detail page about film model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('detailpage:getInfoAboutFilm', this.getInfoAboutFilm);
    }

    /**
     * Get info for detail page about film and emit render content.
     * @param {string} filmId - Film id, needed to get info about film.
     */
    getInfoAboutFilm = (filmId) => {
        getDetailFilm(filmId).then((film) => {
            if (film) {
                this.eventBus.emit('detailpage:renderDetailsAboutFilm', film);
            } else {
                this.eventBus.emit('homepage:renderErrorPage');
            }
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    };
}
