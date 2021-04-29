import { getDetailFilm } from '../modules/http.js';
import { Events } from '../consts/events.js';

/** Class representing detail page about film model. */
export class DetailPageModel {
    /**
     * Create a detail page about film model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.DetailPage.GetInfoAboutMovie, this.getInfoAboutFilm);
    }

    /**
     * Get info for detail page about film and emit render content.
     * @param {string} filmId - Film id, needed to get info about film.
     */
    getInfoAboutFilm = (filmId) => {
        getDetailFilm(filmId).then((film) => {
            if (film) {
                this.eventBus.emit(Events.DetailPage.Render.DetailsAboutFilm, film);
                this.eventBus.emit(Events.DetailPage.SetEventListeners);
            } else {
                this.eventBus.emit(Events.Homepage.Render.ErrorPage);
            }
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    };
}
