import { asyncGetUsing, MockGetHomeFilms } from './modules/http.js';
import { DetailComponent } from './views/DetailView/DetailView.js';
import { HomeComponent } from './views/HomeView/HomeView.js';
import { ProfileView } from './views/Profile/Profile.js';
import { SignUpView } from './views/SignUp/SignUp.js';
import { LogInView } from './views/LogIn/LogIn.js';
import { URLS } from './modules/urls.js';


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
    let headerIcons = {};

    if (localStorage.getItem('ID') != null) {
        headerIcons = [
            {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
            {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
            {id: 'profilePage', href: '#', src: '../../assets/profile.png', alt: ''},
            {id: 'logoutPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
        ]
    } else {
        headerIcons = [
            {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
            {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
            {id: 'loginPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
        ]
    }

    const formComponent = new HomeComponent({
        parent: APPLICATION,
        data:{
            headerIcons,
        }
    });
    formComponent.render();
}

/**
 * Render detail page with detail information about media.
 */
export function detailPage() {
    APPLICATION.innerHTML = '';

    let headerIcons = {};

    if (localStorage.getItem('ID') != null) {
        headerIcons = [
            {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
            {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
            {id: 'profilePage', href: '#', src: '../../assets/profile.png', alt: ''},
            {id: 'logoutPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
        ];
    } else {
        headerIcons = [
            {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
            {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
            {id: 'loginPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
        ];
    }


    MockGetHomeFilms().then(({film}) => {
        const formComponent = new DetailComponent({
            parent: APPLICATION,
            data: {
                filmData: film,
                headerIcons,
            }
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

detailPage();
