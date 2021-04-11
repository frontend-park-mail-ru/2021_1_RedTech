import { eventBus } from '../modules/eventBus.js';
import { GenrePageModel } from '../models/genrePage.js';
import { GenrePageView } from '../views/GenreView/GenreView.js';

/** Class representing genre page model. */
export class GenrePageController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new GenrePageModel(this.eventBus);
        this.view = new GenrePageView(this.eventBus);
    }
}