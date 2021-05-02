import { eventBus } from '../modules/eventBus.js';
import { MediatekaView } from '../views/MediatekaView/MediatekaView.js';
import { MediatekaPageModel } from '../models/mediatekaPage.js';
import Controller from './controller.js';

/** Class representing mediateka page controller. */
export class MediatekaPageController extends Controller {
    constructor() {
        super();
        this.eventBus = eventBus;
        this.model = new MediatekaPageModel(this.eventBus);
        this.view = new MediatekaView(this.eventBus);
    }
}
