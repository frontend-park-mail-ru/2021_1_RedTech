import { APPLICATION } from '../../main.js';

const configForSignUp = {
    inputs: [
        {
            id: 'login',
            placeholder: 'Логин',
            type: 'text',
        },
        {
            id: 'email',
            placeholder: 'Email',
            type: 'email',
        },
        {
            id: 'password',
            placeholder: 'Пароль',
            type: 'password',
        },
        {
            id: 'confirmPassword',
            placeholder: 'Подтвердите пароль',
            type: 'password',
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
    }
}
