import {
    getCurrentUser,
    getDetailFilm,
    postAddToFavourites, postDislike,
    postLike,
    postRemoveFromFavourites
} from '../modules/http.js';

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
        this.eventBus.on('detailpage:like', this.like);
        this.eventBus.on('detailpage:dislike', this.dislike);
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
        getCurrentUser().then((idUser) => {
            if (idUser) {
                postAddToFavourites(filmId).then(() => {
                    this.eventBus.emit('detailpage:changeIconOfFav');
                });
            }
        });
    }

    /**
     * Remove film film favourites.
     * @param {string} filmId - Film id, needed to remove from favourites.
     */
    removeFromFavourite = (filmId) => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                postRemoveFromFavourites(filmId).then(() => {
                    this.eventBus.emit('detailpage:changeIconOfFav');
                });
            }
        });
    }

    /**
     * Like film.
     * @param {string} filmId - Film id, needed to like.
     */
    like = (filmId) => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                postLike(filmId).then(() => {
                    const data = {
                        isLike: true,
                    };
                    this.eventBus.emit('detailpage:changeIconOfLike', data);
                });
            }
        });
    }

    /**
     * Dislike film.
     * @param {string} filmId - Film id, needed to dislike.
     */
    dislike = (filmId) => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                postDislike(filmId).then(() => {
                    const data = {
                        isLike: false,
                    };
                    this.eventBus.emit('detailpage:changeIconOfLike', data);
                });
            }
        });
    }
}
