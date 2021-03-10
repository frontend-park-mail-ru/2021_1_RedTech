import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { asyncGetUsing } from '../../modules/http.js';

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
     * Render html signup page from pug template to parent.
     */
    render() {
        const template = puglatizer.SignUp.SignUp();
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const inputs = form.querySelectorAll('.input-wrapper__input');

        form?.addEventListener(('submit'), event => {
            event.preventDefault();
            const isValid = isValidForm(form)
            if (isValid) {
                let params = {
                    url: 'http://89.208.198.192:8081/api/users/signup',
                    method: 'POST',
                    body: {
                        username: document.getElementById('login').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        confirm_password: document.getElementById('confirmPassword').value
                    }
                };

                console.log(params.url);
                asyncGetUsing(params).then(({status, parsedJson}) => {
                    console.log(status);
                    console.log(parsedJson);
                });
            }
        });

        aTag?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const loginView = new LogInView();
            loginView.render();
        });
    }
}
