import { isValidForm } from '../utils/isValidForm.js';
import { postUserForLogin } from '../modules/http.js';

export class LogInModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('login:postUser', this.postUser.bind(this));
    }

    postUser(form, email, password) {
        const isValid = isValidForm(form);

        if (isValid) {
            postUserForLogin(
                email,
                password
            ).then((responseFlag) => {
                if (responseFlag) {
                    this.eventBus.emit('login:removeEventListeners');
                    this.eventBus.emit('homepage:render');
                }
            });
        }
    }
}
