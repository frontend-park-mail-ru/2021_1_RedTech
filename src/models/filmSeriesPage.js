import { getNewFilms, getNewSeries, getTopFilms, getTopSeries } from '../modules/http.js';

/** Class representing film/series page model. */
export class FilmSeriesPageModel {
    /**
     * Create a film/series page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('film-seriespage:getPageContent', this.getPageContent);
    }

    /**
     * Get info for film/series page about films/series and emit render content.
     */
    getPageContent = (data) => {
        let topContent, newContent;

        if (data.isFilm) {
            topContent = getTopFilms();
            newContent = getNewFilms();

        } else {
            topContent = getTopSeries();
            newContent = getNewSeries();
        }
        Promise.all([topContent, newContent]).then((values) => {
            [data.cardContent, data.newContent] = values;
            this.eventBus.emit('film-seriespage:renderContent', data);
            this.eventBus.emit('film-seriespage:setEventListeners', data);
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    }
}
