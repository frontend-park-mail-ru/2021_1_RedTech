import { eventBus } from './modules/eventBus.js';
import { LogInController } from './controllers/logIn.js';
import { SignUpController } from './controllers/signUp.js';
import { ProfileController } from './controllers/profile.js';
import { HomePageController } from './controllers/homePage.js';
import { DetailPageController } from './controllers/detailPage.js';
import { FilmSeriesPageController } from './controllers/filmSeriesPage.js';
import { GenrePageController } from './controllers/genrePage.js';

export const APPLICATION = document.getElementById('app');

/*eslint no-unused-vars: */
const signupController = new SignUpController();
const loginController = new LogInController();
const profileController = new ProfileController();
const homePageController = new HomePageController();
const detailPageController = new DetailPageController();
const filmPageController = new FilmSeriesPageController();
const genrePageController = new GenrePageController();

eventBus.emit('homepage:render');
