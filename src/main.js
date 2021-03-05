import {SignUpView} from "./views/SignUp/SignUp.js";
import {LogInView} from "./views/LogIn/LogIn.js";
import {validateForm} from "./utils/validator.js";

const APPLICATION = document.getElementById('app');

const CONFIG = {
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
        open
    },
    login: {
        href: '/login',
        text: 'Войти',
        open
    }
}

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

/**
 * Render signup page and check validation of form.
 */
CONFIG.signup.open = () => {
    APPLICATION.innerHTML = '';

    const signUpView = new SignUpView({
        parent: APPLICATION,
        data: configForSignUp
    });
    signUpView.render();

    const form = document.getElementsByTagName('form')[0];
    validateForm(form);
}

/**
 * Render login page and check validation of form.
 */
CONFIG.login.open = () => {
    APPLICATION.innerHTML = '';

    const logInView = new LogInView({
        parent: APPLICATION,
        data: configForLogin
    });
    logInView.render();

    const form = document.getElementsByTagName('form')[0];
    validateForm(form);
}

const menuPage = () => {
    APPLICATION.innerHTML = '';

    Object
        .entries(CONFIG)
        .map(([configKey, {text, href}]) => {
            const menuItem = document.createElement('a');
            menuItem.href = href;
            menuItem.textContent = text;
            menuItem.dataset.section = configKey;

            return menuItem;
        })
        .forEach(element => APPLICATION.appendChild(element))
    ;
}

menuPage();

APPLICATION.addEventListener(('click'), event => {
    const {target} = event;

    if (target instanceof HTMLAnchorElement) {
        event.preventDefault();
        CONFIG[target.dataset.section].open();
    }
});
