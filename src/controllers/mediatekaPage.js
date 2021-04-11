import { eventBus } from '../modules/eventBus.js';
import { MediatekaView } from '../views/MediatekaView/MediatekaView.js';
import { MediatekaPageModel } from '../models/mediatekaPage.js';

/** Class representing mediateka page model. */
export class MediatekaPageController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new MediatekaPageModel(this.eventBus);
        this.view = new MediatekaView(this.eventBus);
    }
}
