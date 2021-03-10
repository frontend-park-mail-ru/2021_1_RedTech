import { APPLICATION } from '../../main.js';
import { SignUpView } from '../SignUp/SignUp.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { asyncGetUsing } from '../../modules/http.js';

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

        form?.addEventListener(('submit'), event => {
            event.preventDefault();
            const isValid = isValidForm(form);

            if (isValid) {
                let params = {
                    url: 'http://89.208.198.192:8081/api/users/login',
                    method: 'POST',
                    credentials: 'include',
                    body: {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
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

            const params = {
                url: 'http://89.208.198.192:8081/api/me',
                method: 'GET',
                credentials: 'include',
            };

            console.log(params.url);
            asyncGetUsing(params).then(({status, parsedJson}) => {
                console.log(status);
                console.log(parsedJson);
            });

            // APPLICATION.innerHTML = '';
            //
            // const signUpView = new SignUpView();
            // signUpView.render();
        });
    }
}
