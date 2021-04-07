import { eventBus } from '../modules/eventBus.js';
import { LogInView } from '../views/LogIn/LogIn.js';
import { LogInModel } from '../models/logIn.js';
import Controller from './controller.js';

export class LogInController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new LogInModel(this.eventBus);
        this.view = new LogInView(this.eventBus);
    }
}
