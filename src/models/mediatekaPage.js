import { getGenres, getNewFilms, getNewSeries, getTopFilms, getTopSeries } from '../modules/http.js';

/** Class representing film/series page model. */
export class MediatekaPageModel {
    /**
     * Create a film/series page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('mediateka:getPageContent', this.getPageContent);
    }

    /**
     * Get info for film/series page about films/series and emit render content.
     */
    getPageContent = (data) => {
        let topContent, newContent;

        const genres = getGenres();
        if (data.isFilm) {
            topContent = getTopFilms();
            newContent = getNewFilms();

        } else {
            topContent = getTopSeries();
            newContent = getNewSeries();
        }
        Promise.all([topContent, newContent, genres]).then((values) => {
            [data.cardContent, data.newContent, data.genres] = values;
            this.eventBus.emit('mediateka:renderContent', data);
            this.eventBus.emit('mediateka:setEventListeners', data);
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    }
}
