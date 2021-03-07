import { APPLICATION } from '../../main.js';

const configForLogin = {
    inputs: [
        {
            placeholder: 'Email',
            type: 'email',
        },
        {
            placeholder: 'Пароль',
            type: 'password',
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
    }
}
