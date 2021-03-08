import { APPLICATION } from '../../main.js';
import { SignUpView } from '../SignUp/SignUp.js';
import { isValidForm } from '../../utils/isValidForm.js';

<<<<<<< HEAD
const configForLogin = {
    inputs: [
        {
            id: 'email',
            placeholder: 'Email',
            type: 'email',
            class: 'input-field__input',
        },
        {
            id: 'password',
            placeholder: 'Пароль',
            type: 'password',
            class: 'input-field__input',
        }
    ],
    networksAuth: [
        {
            src: 'img/google.svg',
        },
        {
            src: 'img/facebook.svg',
        },
        {
            src: 'img/vk.svg',
        }
    ],
    buttonName: 'Войти'
}

=======
>>>>>>> write_template_login_register_RT-29
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

<<<<<<< HEAD
        const [form] = document.getElementsByTagName('form');
        const aTag = document.getElementsByClassName('have-acc__link');

        form.addEventListener(('submit'), event => {
            event.preventDefault();
            isValidForm(form);
        })

        aTag.item(0).addEventListener(('click'), event => {
=======
        const [aTag] = document.getElementsByClassName('have-acc__link');

        aTag.addEventListener(('click'), event => {
>>>>>>> write_template_login_register_RT-29
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();
        })
    }
}
