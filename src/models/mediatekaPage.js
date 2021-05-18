import { getGenres, getNewFilms, getNewSeries, getTopFilms, getTopSeries } from '../modules/http.js';
import Events from '../consts/events.js';

/** Class representing film/series page model. */
export class MediatekaPageModel {
    /**
     * Create a film/series page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.MediatekaPage.GetPageContent, this.getPageContent);
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
            this.eventBus.emit(Events.MediatekaPage.Render.Content, data);
            this.eventBus.emit(Events.MediatekaPage.SetEventListeners, data);
            this.eventBus.emit(Events.SliderActions);
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }
}
