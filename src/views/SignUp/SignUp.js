import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { isValidForm } from '../../utils/isValidForm.js';

const configForSignUp = {
    inputs: [
        {
            id: 'login',
            placeholder: 'Логин',
            type: 'text',
            class: 'input-field__input',
        },
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
        },
        {
            id: 'confirmPassword',
            placeholder: 'Подтвердите пароль',
            type: 'password',
            class: 'input-field__input',
        }
    ],
    buttonName: 'Зарегистрироваться'
}

/** Class representing a signup page view. */
export class SignUpView {
    /**
     * Create a signup page view.
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
     * Render html signup page from pug template to parent.
     */
    render() {
        const template = puglatizer.SignUp.SignUp(configForSignUp);
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const aTag = document.getElementsByClassName('have-acc__link');

        form.addEventListener(('submit'), event => {
            event.preventDefault();
            isValidForm(form);
        })

        aTag.item(0).addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const loginView = new LogInView();
            loginView.render();
        })
    }
}
