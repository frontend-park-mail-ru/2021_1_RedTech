import EventBus from '../modules/eventBus.js';
import { HomePageModel } from '../models/homePage.js';
import { HomePageView } from '../views/HomeView/HomeView.js';

export class HomePageController {
    constructor() {
        this.eventBus = EventBus;
        this.model = new HomePageModel(this.eventBus);
        this.view = new HomePageView(this.eventBus);
    }
}