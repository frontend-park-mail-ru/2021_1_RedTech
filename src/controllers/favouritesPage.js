import { FavouritesPageModel } from '../models/favouritesPage.js';
import { FavouritesView } from '../views/FavouritesView/FavouritesView.js';
import { eventBus } from '../modules/eventBus.js';

/** Class representing favourites page model. */
export class FavouritesPageController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new FavouritesPageModel(this.eventBus);
        this.view = new FavouritesView(this.eventBus);
    }
}