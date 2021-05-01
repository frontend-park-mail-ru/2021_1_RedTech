import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';
import { UserModel } from '../models/user.js';

/** Class representing user controller. */
export class UserController extends Controller {
    constructor() {
        super();
        this.eventBus = eventBus;
        this.model = new UserModel(this.eventBus);
    }
}
