import { eventBus } from '../modules/eventBus.js';
import { HomePageModel } from '../models/homePage.js';
import { HomePageView } from '../views/HomeView/HomeView.js';
import Controller from './controller.js';

export class HomePageController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new HomePageModel(this.eventBus);
        this.view = new HomePageView(this.eventBus);
    }
}
