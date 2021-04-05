import { getDetailFilmPage } from '../modules/http.js';

export class DetailPageModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('detailpage:getDetailsAboutFilm', this.getDetailsAboutFilm.bind(this));
    }

    getDetailsAboutFilm(filmId) {
        getDetailFilmPage(filmId).then((film) => {
            this.eventBus.emit('detailpage:renderDetailsAboutFilm', film);
        });
    }
}