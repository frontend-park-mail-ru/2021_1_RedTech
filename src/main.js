import { DetailComponent } from './views/DetailView/DetailView.js';
import { HomeComponent } from './views/HomeView/HomeView.js';
import { ProfileView } from './views/Profile/Profile.js';
import { SignUpView } from './views/SignUp/SignUp.js';
import { LogInView } from './views/LogIn/LogIn.js';

export const APPLICATION = document.getElementById('app');

/**
 * Render signup page and check validation of form.
 */
const signUpPage = () => {
    APPLICATION.innerHTML = '';

    const signUpView = new SignUpView();
    signUpView.render();
};

/**
 * Render login page and check validation of form.
 */
const loginPage = () => {
    APPLICATION.innerHTML = '';

    const logInView = new LogInView();
    logInView.render();
};

/**
 * Render login page and check validation of form.
 */
const profilePage = () => {
    APPLICATION.innerHTML = '';

    const profileView = new ProfileView();
    profileView.render();
};

/**
 * Render home page with all recommended content.
 */
const homePage = () => {
    APPLICATION.innerHTML = '';

    const homeComponent = new HomeComponent();
    homeComponent.render();
};

/**
 * Render detail page with detail information about media.
 */
const detailPage = () => {
    APPLICATION.innerHTML = '';

    const formComponent = new DetailComponent();
    formComponent.render();
};

const MENU = {
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
        open: signUpPage,
    },
    login: {
        href: '/login',
        text: 'Войти',
        open: loginPage,
    },
    profile: {
        href: '/login',
        text: 'Профиль',
        open: profilePage,
    },
    home: {
        href: '/home',
        text: 'Домашняя страница',
        open: homePage,
    },
    detail: {
        href: '/detail',
        text: 'Детальная страница о кино',
        open: detailPage,
    }
};

APPLICATION.addEventListener(('click'), event => {
    const { target } = event;

    const [mainPageHref] = APPLICATION.getElementsByClassName('main-page__href');

    if (target instanceof HTMLAnchorElement && APPLICATION.contains(mainPageHref)) {
        event.preventDefault();
        MENU[target.dataset.section].open();
    }
});

homePage();
