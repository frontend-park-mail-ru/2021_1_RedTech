import { eventBus } from '../modules/eventBus.js';
import { FilmSeriesPageView } from '../views/FilmPageView/FilmSeriesPageView.js';
import { FilmSeriesPageModel } from '../models/filmSeriesPage.js';

export class FilmSeriesPageController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new FilmSeriesPageModel(this.eventBus);
        this.view = new FilmSeriesPageView(this.eventBus);
    }
}
