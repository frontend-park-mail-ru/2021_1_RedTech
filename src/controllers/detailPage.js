import { eventBus } from '../modules/eventBus.js';
import { DetailPageModel } from '../models/detailPage.js';
import { DetailPageView } from '../views/DetailView/DetailView.js';
import Controller from './controller.js';

/** Class representing detail page about film model. */
export class DetailPageController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new DetailPageModel(this.eventBus);
        this.view = new DetailPageView(this.eventBus);
    }
}
