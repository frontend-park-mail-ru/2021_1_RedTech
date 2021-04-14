import { eventBus } from '../modules/eventBus.js';
import { SignUpModel } from '../models/signUp.js';
import { SignUpView } from '../views/SignUp/SignUp.js';
import Controller from './controller.js';

/** Class representing signup page model. */
export class SignUpController extends Controller {
    constructor() {
        super(new Controller());
        this.eventBus = eventBus;
        this.model = new SignUpModel(this.eventBus);
        this.view = new SignUpView(this.eventBus);
    }
}
