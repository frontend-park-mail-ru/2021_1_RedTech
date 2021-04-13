/** Class representing favourites page model. */
import { getCurrentUser, getFavourites } from '../modules/http.js';

export class FavouritesPageModel {
    /**
     * Create a favourites page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('favouritespage:getPageContent', this.getPageContent);
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
                    console.log(data);
                    this.eventBus.emit('favouritespage:renderContent', data);
                    this.eventBus.emit('genrepage:setEventListeners');
                }).catch(() => {
                    this.eventBus.emit('homepage:renderErrorPage');
                });
            } else {
                const data = {
                    isAuthorized: false,
                };
                this.eventBus.emit('homepage:renderHeader', data);
            }
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    }
}
