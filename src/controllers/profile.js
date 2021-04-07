import { eventBus } from '../modules/eventBus.js';
import { ProfileModel } from '../models/profile.js';
import { ProfileView } from '../views/Profile/Profile.js';
import Controller from './controller.js';

export class ProfileController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new ProfileModel(this.eventBus);
        this.view = new ProfileView(this.eventBus);
    }
}
