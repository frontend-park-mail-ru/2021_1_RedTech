import { FavouritesPageController } from './controllers/favouritesPage.js';
import { MediatekaPageController } from './controllers/mediatekaPage.js';
import { ActorPagePageController } from './controllers/actorPage.js';
import { VideoPlayerController } from './controllers/videoplayer.js';
import { DetailPageController } from './controllers/detailPage.js';
import { GenrePageController } from './controllers/genrePage.js';
import { ProfileController } from './controllers/profilePage.js';
import { SignUpController } from './controllers/signupPage.js';
import { HomePageController } from './controllers/homePage.js';
import { ContentController } from './controllers/content.js';
import { LogInController } from './controllers/loginPage.js';
import { UserController } from './controllers/user.js';

import Router from './modules/router.js';
import Routes from './consts/routes.js';

import './index.scss';

export const APPLICATION = document.getElementById('app');

/*eslint no-unused-vars: */
const userController = new UserController();
const contentController = new ContentController();
const videoPlayerController = new VideoPlayerController();
const signupController = new SignUpController();
const loginController = new LogInController();
const profileController = new ProfileController();
const actorPageController = new ActorPagePageController();
const homePageController = new HomePageController();
const detailPageController = new DetailPageController();
const filmPageController = new MediatekaPageController();
const genrePageController = new GenrePageController();
const favouritesPageController = new FavouritesPageController();

const router = new Router(APPLICATION);

console.log("HELLO FROM CI/CD")

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
    .register(Routes.ActorPage, actorPageController)
    .start();
