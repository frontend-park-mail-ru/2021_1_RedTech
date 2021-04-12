import { getDetailFilm, postAddToFavourites, postRemoveFromFavourites } from '../modules/http.js';

/** Class representing detail page about film model. */
export class DetailPageModel {
    /**
     * Create a detail page about film model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('detailpage:getInfoAboutFilm', this.getInfoAboutFilm);
        this.eventBus.on('detailpage:addToFavourites', this.addToFavourite);
        this.eventBus.on('detailpage:removeFromFavourites', this.removeFromFavourite);
    }

    /**
     * Get info for detail page about film and emit render content.
     * @param {string} filmId - Film id, needed to get info about film.
     */
    getInfoAboutFilm = (filmId) => {
        getDetailFilm(filmId).then((film) => {
            if (film) {
                this.eventBus.emit('detailpage:renderDetailsAboutFilm', film);
                this.eventBus.emit('detailpage:setEventListeners');
            } else {
                this.eventBus.emit('homepage:renderErrorPage');
            }
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    };

    /**
     * Add film to favourites.
     * @param {string} filmId - Film id, needed to add to favourites.
     */
    addToFavourite = (filmId) => {
        postAddToFavourites(filmId).then(() => {
            this.eventBus.emit('detailpage:changeIconOfFav');
        });
    }

    /**
     * Remove film film favourites.
     * @param {string} filmId - Film id, needed to remove from favourites.
     */
    removeFromFavourite = (filmId) => {
        postRemoveFromFavourites(filmId).then(() => {
            this.eventBus.emit('detailpage:changeIconOfFav');
        });
    }
}
