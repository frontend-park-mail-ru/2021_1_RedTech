import { isValidForm } from '../utils/isValidForm.js';
import { postUserForLogin } from '../modules/http.js';

/** Class representing login page model. */
export class LogInModel {
    /**
     * Create a login page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('login:loginUser', this.loginUser);
    }

    /**
     * Login user and in success case render home page.
     * @param {HTMLFontElement} form - Form for login, need to validation
     * @param {string} email - User email, need to post request.
     * @param {string} password - User password, need to post request.
     */
    loginUser = (form, email, password) => {
        const isValid = isValidForm(form);

        if (isValid) {
            postUserForLogin(
                email,
                password
            ).then((responseFlag) => {
                if (responseFlag) {
                    this.eventBus.emit('login:removeEventListeners');
                    this.eventBus.emit('homepage:render');
                } else {
                    this.eventBus.emit('login:render');
                }
            }).catch(() => {
                this.eventBus.emit('login:render');
            });
        }
    }
}
