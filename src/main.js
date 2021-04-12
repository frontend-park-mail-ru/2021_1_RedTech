import { eventBus } from './modules/eventBus.js';
import { LogInController } from './controllers/logIn.js';
import { SignUpController } from './controllers/signUp.js';
import { ProfileController } from './controllers/profile.js';
import { HomePageController } from './controllers/homePage.js';
import { DetailPageController } from './controllers/detailPage.js';
import Router from './modules/router.js';
import Routes from './consts/routes.js';

import "./index.scss";

export const APPLICATION = document.getElementById('app');

/*eslint no-unused-vars: */
const signupController = new SignUpController();
const loginController = new LogInController();
const profileController = new ProfileController();
const homePageController = new HomePageController();
const detailPageController = new DetailPageController();

const router = new Router(APPLICATION);

router.register(Routes.HomePage, homePageController)
    .register(Routes.SignUpPage, signupController)
    .register(Routes.LoginPage, loginController)
    .register(Routes.ProfilePage, profileController)
    .register(Routes.MoviePage, detailPageController)
    .start();

// eventBus.emit('homepage:render');
