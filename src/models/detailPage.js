import {
    getCurrentUser,
    getDetailFilm,
    postAddToFavourites, postDislike,
    postLike,
    postRemoveFromFavourites
} from '../modules/http.js';
import {Events} from '../consts/events';

/** Class representing detail page about film model. */
export class DetailPageModel {
    /**
     * Create a detail page about film model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.DetailPage.GetInfoAboutMovie, this.getInfoAboutFilm);
        this.eventBus.on(Events.DetailPage.AddToFavourites, this.addToFavourite);
        this.eventBus.on(Events.DetailPage.RemoveFromFavourites, this.removeFromFavourite);
        this.eventBus.on(Events.DetailPage.Like, this.like);
        this.eventBus.on(Events.DetailPage.Dislike, this.dislike);
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

    /**
     * Add film to favourites.
     * @param {string} filmId - Film id, needed to add to favourites.
     */
    addToFavourite = (filmId) => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                postAddToFavourites(filmId).then(() => {
                    this.eventBus.emit(Events.DetailPage.Change.IconOfFav);
                });
            } else {
                this.eventBus.emit(Events.PathChanged, { path: '/login' });
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
                    this.eventBus.emit(Events.DetailPage.Change.IconOfFav);
                });
            } else {
                this.eventBus.emit(Events.PathChanged, { path: '/login' });
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
                    this.eventBus.emit(Events.DetailPage.Change.IconOfLike, data);
                });
            } else {
                this.eventBus.emit(Events.PathChanged, { path: '/login' });
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
                    this.eventBus.emit(Events.DetailPage.Change.IconOfLike, data);
                });
            } else {
                this.eventBus.emit(Events.PathChanged, { path: '/login' });
            }
        });
    }
}
