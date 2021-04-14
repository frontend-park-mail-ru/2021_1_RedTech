import { eventBus } from './modules/eventBus.js';
import { LogInController } from './controllers/logIn.js';
import { SignUpController } from './controllers/signUp.js';
import { ProfileController } from './controllers/profile.js';
import { HomePageController } from './controllers/homePage.js';
import { GenrePageController } from './controllers/genrePage.js';
import { DetailPageController } from './controllers/detailPage.js';
import { MediatekaPageController } from './controllers/mediatekaPage.js';
import { FavouritesPageController } from './controllers/favouritesPage.js';

import Router from './modules/router.js';
import Routes from './consts/routes.js';

import './index.scss';

export const APPLICATION = document.getElementById('app');

/*eslint no-unused-vars: */
const signupController = new SignUpController();
const loginController = new LogInController();
const profileController = new ProfileController();
const homePageController = new HomePageController();
const detailPageController = new DetailPageController();
const filmPageController = new MediatekaPageController();
const genrePageController = new GenrePageController();
const favouritesPageController = new FavouritesPageController();

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

const router = new Router(APPLICATION);

router.register(Routes.HomePage, homePageController)
    .register(Routes.SignUpPage, signupController)
    .register(Routes.LoginPage, loginController)
    .register(Routes.ProfilePage, profileController)
    .register(Routes.MoviePage, detailPageController)
    .register(Routes.MoviesPage, filmPageController)
    .register(Routes.MoviesGenrePage, genrePageController)
    .register(Routes.SeriesPage, filmPageController)
    .register(Routes.SeriesGenrePage, genrePageController)
    .register(Routes.FavouritePage, favouritesPageController)
    .start();

// eventBus.emit('homepage:render');
