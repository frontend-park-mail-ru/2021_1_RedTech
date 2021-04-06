import eventBus from '../modules/eventBus.js';
import { ProfileModel } from '../models/profile.js';
import { ProfileView } from '../views/Profile/Profile.js';

export class ProfileController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new ProfileModel(this.eventBus);
        this.view = new ProfileView(this.eventBus);
    }
}
