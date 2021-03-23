import { APPLICATION } from '../../main.js';
import { SignUpView } from '../SignUp/SignUp.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { postUserForLogin } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';

/** Class representing a login page view. */
export class LogInView {
    /**
     * Create a login page view.
     * @param {Object} data - Parameters for render login view.
     */
    constructor({ data = {} } = {}) {
        this._data = data;
    }

    /**
     * Render html login page from pug template.
     */
    render() {
        const homeComponent = new HomeComponent();
        const signUpView = new SignUpView();

        const template = puglatizer.LogIn.LogIn();
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const formHandler = (event) => {
            event.preventDefault();
            const isValid = isValidForm(form);

            if (isValid) {
                postUserForLogin(
                    document?.getElementById('email').value,
                    document?.getElementById('password').value
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
            event.preventDefault();
            form?.removeEventListener(('submit'), formHandler);
            aTag?.removeEventListener(('click'), aTagHandler);

            APPLICATION.innerHTML = '';

            signUpView.render();
        };

        form?.addEventListener(('submit'), formHandler);

        aTag?.addEventListener(('click'), aTagHandler);
    }
}
