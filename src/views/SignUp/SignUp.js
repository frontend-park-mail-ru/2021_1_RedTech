import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { isValidForm } from '../../utils/isValidForm.js';

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

        form.addEventListener(('submit'), event => {
            event.preventDefault();
            isValidForm(form);
        })

        aTag.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const loginView = new LogInView();
            loginView.render();
        })
    }
}
