import { eventBus } from './modules/eventBus.js';
import { LogInController } from './controllers/logIn.js';
import { SignUpController } from './controllers/signUp.js';
import { ProfileController } from './controllers/profile.js';
import { HomePageController } from './controllers/homePage.js';
import { DetailPageController } from './controllers/detailPage.js';
import { MediatekaPageController } from './controllers/mediatekaPage.js';
import { GenrePageController } from './controllers/genrePage.js';
import { FavouritesPageController } from './controllers/favouritesPage.js';

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

eventBus.emit('homepage:render');
