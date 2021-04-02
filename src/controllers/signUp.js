import eventBus from '../modules/eventBus.js';
import { SignUpModel } from '../models/signUp.js';
import { SignUpView } from '../views/SignUp/SignUp.js';

export class SignUpController {
    constructor() {
        this.eventBus = eventBus;
        this.model = new SignUpModel(this.eventBus);
        this.view = new SignUpView(this.eventBus);
    }
}