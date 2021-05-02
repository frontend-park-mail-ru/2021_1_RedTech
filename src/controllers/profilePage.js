import { eventBus } from '../modules/eventBus.js';
import { ProfileModel } from '../models/profilePage.js';
import { ProfileView } from '../views/Profile/Profile.js';
import Controller from './controller.js';

/** Class representing profile page controller. */
export class ProfileController extends Controller {
    constructor() {
        super();
        this.eventBus = eventBus;
        this.model = new ProfileModel(this.eventBus);
        this.view = new ProfileView(this.eventBus);
    }
}
