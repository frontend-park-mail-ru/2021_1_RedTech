import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';
import { ActorPageModel } from '../models/actorPage.js';
import { ActorView } from '../views/ActorView/ActorView.js';

/** Class representing actor page controller. */
export class ActorPagePageController extends Controller {
    constructor() {
        super();
        this.eventBus = eventBus;
        this.model = new ActorPageModel(this.eventBus);
        this.view = new ActorView(this.eventBus);
    }
}