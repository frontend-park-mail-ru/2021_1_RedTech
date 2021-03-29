import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { postUserForSignUp } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';

/** Class representing a signup page view. */
export class SignUpView {
    /**
     * Create a signup page view.
     * @param {Object} data - Parameters for render signup view.
     */
    constructor({ data = {} } = {}) {
        this._data = data;
    }

    /**
     * Render html signup page from pug template.
     */
    render() {
        const homeComponent = new HomeComponent();
        const loginView = new LogInView();

        const template = puglatizer.SignUp.SignUp();
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const formHandler = (event) => {
            event.preventDefault();
            const isValid = isValidForm(form);

            if (isValid) {
                postUserForSignUp(
                    document?.getElementById('login').value,
                    document?.getElementById('email').value,
                    document?.getElementById('password').value,
                    document?.getElementById('confirmPassword').value
                ).then((responseFlag) => {
                    if (responseFlag) {
                        form?.removeEventListener(('submit'), formHandler);
                        aTag?.removeEventListener(('click'), aTagHandler);

                        APPLICATION.innerHTML = '';

                        homeComponent.render();
                    }
                });
            }
        };

        const aTagHandler = (event) => {
            form?.removeEventListener(('submit'), formHandler);
            aTag?.removeEventListener(('click'), aTagHandler);
            event.preventDefault();

            APPLICATION.innerHTML = '';

            loginView.render();
        };

        form?.addEventListener(('submit'), formHandler);

        aTag?.addEventListener(('click'), aTagHandler);
    }
}
