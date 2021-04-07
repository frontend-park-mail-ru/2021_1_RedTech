import { isValidForm } from '../utils/isValidForm.js';
import { postUserForSignUp } from '../modules/http.js';

/** Class representing signup page model. */
export class SignUpModel {
    /**
     * Create a signup page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('signup:signUpUser', this.signUpUser);
    }

    /**
     * Signup user and in success case render home page.
     * @param {HTMLFontElement} form - Form for signup, need to validation
     * @param {string} email - User email, need to post request.
     * @param {string} password - User password, need to post request.
     * @param {string} confirmPassword - User confirm password, need to post request.
     */
    signUpUser = (form, login, email, password, confirmPassword) => {
        const isValid = isValidForm(form);

        if (isValid) {
            postUserForSignUp(
                login,
                email,
                password,
                confirmPassword
            ).then((responseFlag) => {
                if (responseFlag) {
                    this.eventBus.emit('signup:removeEventListeners');
                    this.eventBus.emit('homepage:render');
                } else {
                    this.eventBus.emit('homepage:renderErrorPage');
                }
            }).catch(() => {
                this.eventBus.emit('homepage:renderErrorPage');
            });
        }
    }
}
