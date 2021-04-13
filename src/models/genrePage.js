/** Class representing home page model. */
import { getGenreFilms, getGenres, getGenreSeries } from '../modules/http.js';

export class GenrePageModel {
    /**
     * Create a genre page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('genrepage:getPageContent', this.getPageContent);
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
                    this.eventBus.emit('genrepage:renderContent', content, data.genre);
                    this.eventBus.emit('genrepage:setEventListeners');
                }).catch(() => {
                    this.eventBus.emit('homepage:renderErrorPage');
                });
            } else {
                genres.forEach((genre) => {
                    if (genre.name.toLowerCase() === data.id) {
                        data.genre = genre.label_rus;
                        return;
                    }
                });
                getGenreSeries(data.id).then((content) => {
                    this.eventBus.emit('genrepage:renderContent', content, data.genre);
                    this.eventBus.emit('genrepage:setEventListeners');
                }).catch(() => {
                    this.eventBus.emit('homepage:renderErrorPage');
                });
            }
        });

    }
}
