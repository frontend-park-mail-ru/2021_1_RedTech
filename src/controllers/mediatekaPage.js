import { eventBus } from '../modules/eventBus.js';
import { MediatekaView } from '../views/MediatekaView/MediatekaView.js';
import { FilmSeriesPageModel } from '../models/filmSeriesPage.js';

export class FilmSeriesPageController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new FilmSeriesPageModel(this.eventBus);
        this.view = new MediatekaView(this.eventBus);
    }
}
