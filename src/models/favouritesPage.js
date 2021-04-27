/** Class representing favourites page model. */
import { getCurrentUser, getFavourites } from '../modules/http.js';
import Events from '../consts/events';

export class FavouritesPageModel {
    /**
     * Create a favourites page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.FavouritesPage.GetPageContent, this.getPageContent);
    }

    /**
     * Get info for favourites page emit render content.
     */
    getPageContent = () => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                getFavourites(idUser).then((contentData) => {
                    const data = {
                        contentData: contentData ?? [],
                        genreTitle: 'Избранное'
                    };
                    this.eventBus.emit(Events.FavouritesPage.Render.Content, data);
                    this.eventBus.emit(Events.GenrePage.SetEventListeners);
                }).catch(() => {
                    this.eventBus.emit(Events.Homepage.Render.ErrorPage);
                });
            } else {
                const data = {
                    isAuthorized: false,
                };
                this.eventBus.emit(Events.Homepage.Render.Header, data);
            }
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }
}
