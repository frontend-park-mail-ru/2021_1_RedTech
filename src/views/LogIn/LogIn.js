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
     * Render html login page from pug template to parent.
     */
    render() {
        const template = puglatizer.LogIn.LogIn();
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        form?.addEventListener(('submit'), async event => {
            event.preventDefault();
            const isValid = isValidForm(form);
            let responseStatus;
            
            if (isValid) {
                responseStatus = await postUserForLogin(
                    document.getElementById('email').value,
                    document.getElementById('password').value
                );
            }
             
            if (responseStatus === 200) {
                APPLICATION.innerHTML = '';

                const homeComponent = new HomeComponent({
                    parent: APPLICATION
                });

                await homeComponent.render();
            }
        });

        aTag?.addEventListener(('click'), event => {
            event.preventDefault();
            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();
        });
    }
}
