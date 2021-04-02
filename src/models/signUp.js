import { isValidForm } from '../utils/isValidForm.js';
import { postUserForSignUp } from '../modules/http.js';

export class SignUpModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('signup:postUser', this.postUser.bind(this));
    }

    postUser(form, login, email, password, confirmPassword) {
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
                }
            });
        }
    }
}