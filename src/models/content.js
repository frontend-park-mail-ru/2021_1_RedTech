import Events from '../consts/events.js';
import { getCurrentUser, postAddToFavourites, postDislike, postLike, postRemoveFromFavourites } from '../modules/http.js';
import Routes from '../consts/routes.js';

export class ContentModel {
    /**
     * Create a content model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.Content.AddToFavourites, this.addToFavourite);
        this.eventBus.on(Events.Content.RemoveFromFavourites, this.removeFromFavourite);
        this.eventBus.on(Events.Content.Like, this.like);
        this.eventBus.on(Events.Content.Dislike, this.dislike);
    }

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
                this.eventBus.emit(Events.PathChanged, Routes.LoginPage);
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
                this.eventBus.emit(Events.PathChanged, Routes.LoginPage);
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
                this.eventBus.emit(Events.PathChanged, Routes.LoginPage);
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
                this.eventBus.emit(Events.PathChanged, Routes.LoginPage);
            }
        });
    }
}
