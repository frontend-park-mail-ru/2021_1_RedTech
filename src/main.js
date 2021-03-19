import { asyncGetUsing } from './modules/http.js';
import { DetailComponent } from './views/DetailView/DetailView.js';
import { HomeComponent } from './views/HomeView/HomeView.js';
import { ProfileView } from './views/Profile/Profile.js';
import { SignUpView } from './views/SignUp/SignUp.js';
import { LogInView } from './views/LogIn/LogIn.js';
import { currentUrl, URLS } from './modules/urls.js';
import { filmJsonToFilm } from './modules/adapters.js';

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



/**
 * Render home page with all recomended content.
 */
export function homePage() {
    APPLICATION.innerHTML = '';
    let data = {};

    if (localStorage.getItem('ID') != null) {
        data = {
            isLogined: true,
            headerIcons: [
                {className: 'js-profile-page', href: '#', title: 'Профиль', alt: ''},
                {className: 'js-favourite-page', href: '#', title: 'Избранное', alt: ''},
                {className: 'js-logout-page', href: '#', title: 'Выйти', alt: ''},
            ],
        };
    } else {
        data = {
            isLogined: false,
        };
    }

    const formComponent = new HomeComponent({
        parent: APPLICATION,
        data: data,
    });
    formComponent.render();
}

/**
 * Render detail page with detail information about media.
 */
export function detailPage() {
    APPLICATION.innerHTML = '';

    let data = {};

    if (localStorage.getItem('ID') != null) {
        data = {
            isLogined: true,
            headerIcons: [
                {className: 'js-profile-page', href: '#', title: 'Профиль', alt: ''},
                {className: 'js-favourite-page', href: '#', title: 'Избранное', alt: ''},
                {className: 'js-logout-page', href: '#', title: 'Выйти', alt: ''},
            ],
        };
    } else {
        data = {
            isLogined: false,
        };
    }

    const params = {
        url: URLS.api.media,
        method: 'GET',
    };

    let film = {};

    asyncGetUsing(params).then(({status, parsedJson}) => {
        if (status < 300) {
            film = filmJsonToFilm(parsedJson);
            data.filmData = film;
        }
    }).then(() => {
        const formComponent = new DetailComponent({
            parent: APPLICATION,
            data: data,
        });
        formComponent.render();
    });
}

APPLICATION.addEventListener(('click'), event => {
    const { target } = event;

    const [mainPageHref] = APPLICATION.getElementsByClassName('main-page__href');

    if (target instanceof HTMLAnchorElement && APPLICATION.contains(mainPageHref)) {
        event.preventDefault();
        MENU[target.dataset.section].open();
    }
});

homePage();
