import { APPLICATION } from '../../main.js';
import { SignUpView } from '../SignUp/SignUp.js';
import { validateForm } from "../../utils/validateForm.js";

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

/** Class representing a login page view. */
export class LogInView {
    /**
     * Create a login page view.
     * @param {HTMLElement} parent - Parent of signup view in DOM.
     * @param {Object} data - Parameters for render signup view.
     */
    constructor({
                    data = {},
                } = {})
    {
        this._data = data;
    }

    /**
     * Render html login page from pug template to parent.
     */
    render() {
        const template = puglatizer.LogIn.LogIn(configForLogin);
        APPLICATION.innerHTML = template;

        const aTag = document.getElementsByClassName('have-acc__link');

        aTag.item(0).addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();

            const [form] = document.getElementsByTagName('form');
            validateForm(form);
        })
    }
}
