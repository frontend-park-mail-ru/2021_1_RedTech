import { eventBus } from '../modules/eventBus.js';
import { LogInView } from '../views/LogIn/LogIn.js';
import { LogInModel } from '../models/logIn.js';

export class LogInController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new LogInModel(this.eventBus);
        this.view = new LogInView(this.eventBus);
    }
}
