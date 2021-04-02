import EventBus from '../modules/eventBus.js';
import { DetailPageModel } from '../models/detailPage.js';
import { DetailPageView } from '../views/DetailView/DetailView.js';

export class DetailPageController {
    constructor() {
        this.eventBus = EventBus;
        this.model = new DetailPageModel(this.eventBus);
        this.view = new DetailPageView(this.eventBus);
    }
}