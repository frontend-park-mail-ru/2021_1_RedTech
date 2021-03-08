import { SignUpView } from './views/SignUp/SignUp.js';
import { LogInView } from './views/LogIn/LogIn.js';
import { HomeComponent } from './views/HomeView/HomeView.js';
import { DetailComponent } from './views/DetailView/DetailView.js';
import { asyncGetUsing } from './modules/http.js';
import { URLS } from './modules/urls.js';
import { ProfileView } from './views/Profile/Profile.js';

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

function homePage() {
    APPLICATION.innerHTML = '';

    // let params = {
    //     url: 'https://jsonplaceholder.typicode.com/users',
    //     method: 'POST',
    //     body: {
    //         name: 'Vladilen',
    //         age: 26,
    //     }
    // }
    //
    // asyncGetUsing(params).then(({status, parsedJson}) => {
    //     console.log(status)
    //     console.log(parsedJson)
    // })

    let params = {
        url: URLS.api.testUrl,
        method: 'GET',
    };

    console.log(params.url);
    asyncGetUsing(params).then(({status, parsedJson}) => {
        console.log(status)
        console.log(parsedJson);
    });

    const formComponent = new HomeComponent({
        parent: APPLICATION,
        // data: {
        //     headerLinks: [
        //         {title: 'Главная'},
        //         {title: 'Фильмы'},
        //         {title: 'Сериалы'},
        //         {title: 'Последнее'},
        //     ]
        // }
    });
    formComponent.render();
}

function detailPage() {
    APPLICATION.innerHTML = '';

    const formComponent = new DetailComponent({
        parent: APPLICATION
    });
    formComponent.render();
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
