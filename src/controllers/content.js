import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';
import { ContentModel } from '../models/content.js';

/** Class representing content controller. */
export class ContentController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new ContentModel(this.eventBus);
    }
}
