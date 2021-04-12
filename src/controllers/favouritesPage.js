import { FavouritesPageModel } from '../models/favouritesPage.js';
import { FavouritesView } from '../views/FavouritesView/FavouritesView.js';
import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';

/** Class representing favourites page model. */
export class FavouritesPageController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new FavouritesPageModel(this.eventBus);
        this.view = new FavouritesView(this.eventBus);
    }
}