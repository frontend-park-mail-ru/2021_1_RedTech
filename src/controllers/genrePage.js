import { eventBus } from '../modules/eventBus.js';
import { GenrePageModel } from '../models/genrePage.js';
import { GenrePageView } from '../views/GenreView/GenreView.js';
import Controller from './controller.js';

/** Class representing genre page model. */
export class GenrePageController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new GenrePageModel(this.eventBus);
        this.view = new GenrePageView(this.eventBus);
    }
}