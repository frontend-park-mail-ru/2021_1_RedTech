import { SignUpView } from './views/SignUp/SignUp.js';
import { LogInView } from './views/LogIn/LogIn.js';

export const APPLICATION = document.getElementById('app');

const MENU = {
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

/**
 * Render signup page
 */
MENU.signup.open = () => {
    APPLICATION.innerHTML = '';

    const signUpView = new SignUpView();
    signUpView.render();
}

/**
 * Render login page
 */
MENU.login.open = () => {
    APPLICATION.innerHTML = '';

    const logInView = new LogInView();
    logInView.render();
}

const menuPage = () => {
    APPLICATION.innerHTML = '';

    Object
        .entries(MENU)
        .map(([configKey, {text, href}]) => {
            const menuItem = document.createElement('a');
            menuItem.className = 'main-page__href';
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
        MENU[target.dataset.section].open();
    }
});
