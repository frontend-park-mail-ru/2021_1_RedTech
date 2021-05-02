import { getGenreFilms, getGenres, getGenreSeries } from '../modules/http.js';
import Events from '../consts/events.js';

/** Class representing genre page model. */
export class GenrePageModel {
    /**
     * Create a genre page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.GenrePage.GetPageContent, this.getPageContent);
    }

    /**
     * Get info for genre page about films/series and emit render content.
     */
    getPageContent = (data) => {
        getGenres().then((genres) => {
            if (data.isFilm) {
                genres.forEach((genre) => {
                    if (genre.name.toLowerCase() === data.id) {
                        data.genre = genre.label_rus;
                        return;
                    }
                });
                getGenreFilms(data.id).then((content) => {
                    this.eventBus.emit(Events.GenrePage.Render.Content, content, data.genre);
                    this.eventBus.emit(Events.GenrePage.SetEventListeners);
                }).catch(() => {
                    this.eventBus.emit(Events.Homepage.Render.ErrorPage);
                });
            } else {
                genres.forEach((genre) => {
                    if (genre.name.toLowerCase() === data.id) {
                        data.genre = genre.label_rus;
                        return;
                    }
                });
                getGenreSeries(data.id).then((content) => {
                    this.eventBus.emit(Events.GenrePage.Render.Content, content, data.genre);
                    this.eventBus.emit(Events.GenrePage.SetEventListeners);
                }).catch(() => {
                    this.eventBus.emit(Events.Homepage.Render.ErrorPage);
                });
            }
        });
    }
}
