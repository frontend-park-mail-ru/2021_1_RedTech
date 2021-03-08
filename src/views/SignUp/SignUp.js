import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';

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

        const [aTag] = document.getElementsByClassName('have-acc__link');

        aTag.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const loginView = new LogInView();
            loginView.render();
        })
    }
}
