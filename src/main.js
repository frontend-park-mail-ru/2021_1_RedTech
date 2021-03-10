import { SignUpView } from './views/SignUp/SignUp.js';
import { LogInView } from './views/LogIn/LogIn.js';
import { HomeComponent } from './views/HomeView/HomeView.js';
import { DetailComponent } from './views/DetailView/DetailView.js';
import { asyncGetUsing } from './modules/http.js';
import { URLS } from './modules/urls.js';
import { ProfileView } from './views/Profile/Profile.js';

export const APPLICATION = document.getElementById('app');
export const USER = {
    ID: 1,
};

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

export function homePage() {
    APPLICATION.innerHTML = '';

    const formComponent = new HomeComponent({
        parent: APPLICATION,
    });
    formComponent.render();
}

export function detailPage() {
    APPLICATION.innerHTML = '';

    let params = {
        url: URLS.api.media,
        method: 'GET',
    };

    let film = {};

    asyncGetUsing(params).then(({status, parsedJson}) => {
        if (status < 300) {
            film.mainImageSrc = './assets/gravity.jpg';
            film.mediaTitle = parsedJson.title;
            film.mediaTag = 'Сериал';
            film.mediaRank = 'Положительных оценок ' + `${parsedJson.rating}` ?? '';
            film.mediaYear = 2016;
            film.mediaGenres = parsedJson.genres ?? '';
            film.mediaDirector = 'Алекс Хирш';
            film.mediaCountry = parsedJson.countries ?? '';
            film.mediaActors = parsedJson.actors ?? '';
            film.mediaDescription = parsedJson.description ?? '';

            const formComponent = new DetailComponent({
                parent: APPLICATION,
                data: {
                    filmData: film,
                }
            });
            formComponent.render();
        }
    });
}

const menuPage = () => {
    APPLICATION.innerHTML = '';
    Object
        .entries(MENU)
        .forEach(([menuKey, {text, href}]) => {
            const menuItem = document.createElement('a');
            menuItem.className = 'main-page__href';
            menuItem.href = href;
            menuItem.textContent = text;
            menuItem.dataset.section = menuKey;
            APPLICATION.appendChild(menuItem);
        })
    ;
};

APPLICATION.addEventListener(('click'), event => {
    const { target } = event;

    const [mainPageHref] = APPLICATION.getElementsByClassName('main-page__href');

    if (target instanceof HTMLAnchorElement && APPLICATION.contains(mainPageHref)) {
        event.preventDefault();
        MENU[target.dataset.section].open();
    }
});

menuPage();
