import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import { scrollToTop } from '../../modules/utils.js';

import Header from '../../components/Header/Header.pug';
import HomeContent from '../../components/HomeContent/HomeContent.pug';
import ErrorPage from '../../components/ErrorPage/ErrorPage.pug';
import Loader from '../../components/Loader/Loader.pug';
import { Events } from '../../consts/events.js';
import {SearchPopupComponent} from '../../components/SearchPopup/SearchPopup.js';

/** Class representing home page view. */
export class HomePageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} - Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.Homepage.Render.Page, this.render);
        this.eventBus.on(Events.Homepage.Render.Header, this.renderHeader);
        this.eventBus.on(Events.Homepage.SetEventListeners, this.setEventListeners);
        this.eventBus.on(Events.Homepage.SetEventListenersForHeader, this.setEventListenersForHeader);
        this.eventBus.on(Events.Homepage.Render.Content, this.renderContent);
        this.eventBus.on(Events.Homepage.Render.ErrorPage, this.renderErrorPage);
    }
    /**
     * Render html home page from pug template.
     */
    render = () => {
        const template = Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.Homepage.Get.MainPageContent);
    }

    /**
     * Render header from pug template.
     * @param {Object} data - Contains flag of authorizing.
     */
    renderHeader = (data) => {
        const template = Header(data);
        const [header] = document.getElementsByTagName('header');
        if (header) {
            header.outerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }
    /**
     * Render content home page from pug template to content div.
     */
    renderContent = (cardFilms, newFilms, newSeries) => {
        this._data = {
            cardFilms,
            newFilms,
            newSeries,
        };

        const template = HomeContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }

    /**
     * Render error page from pug template.
     */
    renderErrorPage = () => {
        const template = ErrorPage();
        APPLICATION.innerHTML = template;
    }

    /**
     * Set event listeners for header.
     */
    setEventListenersForHeader = () => {
        const profileLinkHandler = (event) => {
            event.preventDefault();

            this.eventBus.emit(Events.ProfilePage.Get.InfoAboutCurrentUser);
        };
        const loginPageHandler = (event) => {
            event.preventDefault();

            this.eventBus.emit(Events.LoginPage.Render);
        };
        const logoutPageHandler = (event) => {
            event.preventDefault();

            this.eventBus.emit(Events.User.Logout);
        };

        const profileLink = document.querySelector('.js-profile-page');
        profileLink?.addEventListener(('click'), profileLinkHandler);

        const loginPage = document.querySelector('.js-login-page');
        loginPage?.addEventListener(('click'), loginPageHandler);

        const searchPopup = document.querySelector('.js-search-popup');
        searchPopup?.addEventListener(('click'),(event) => {
            event.preventDefault();
            const popup = document.querySelector('.header-form__search-popup');
            event.stopPropagation();
            // eslint-disable-next-line no-unused-vars
            const searchPopupComponent = new SearchPopupComponent(popup);
        });

        const logoutPage = document.querySelector('.js-logout-page');
        logoutPage?.addEventListener(('click'), logoutPageHandler);
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const topMediaImgs = document.querySelectorAll('.item__card-image');
        const newMediaImgs = document.querySelectorAll('.item__suggestion__image');

        const mainSlider = document.querySelector('.container');
        const slideRight = document.querySelector('.js-slider-right-FilmCard');

        const scrollDistantion = 500;

        if (slideRight) {
            slideRight.addEventListener('click', () => {
                const offset = window.pageYOffset;
                mainSlider.scrollBy({
                    top: 0,
                    left: mainSlider.scrollLeft + scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        const slideLeft = document.querySelector('.js-slider-left-FilmCard');
        if (slideLeft) {
            slideLeft.addEventListener('click', () => {
                const offset = window.pageYOffset;
                mainSlider.scrollBy({
                    top: 0,
                    left: -scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        const sliderSuggestion = document.querySelector('.suggestion-film__list.new_films');
        const slideRightSuggestionFilms = document.querySelector('.js-slider-right-NewFilms');

        if (slideRightSuggestionFilms) {
            slideRightSuggestionFilms.addEventListener('click', () => {
                const offset = window.pageYOffset;
                sliderSuggestion.scrollBy({
                    top: 0,
                    left: sliderSuggestion.scrollLeft + scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        const slideLeftSuggestionFilms = document.querySelector('.js-slider-left-NewFilms');
        if (slideLeftSuggestionFilms) {
            slideLeftSuggestionFilms.addEventListener('click', () => {
                const offset = window.pageYOffset;
                sliderSuggestion.scrollBy({
                    top: 100,
                    left: -scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        // keke
        const sliderSuggestionSeries = document.querySelector('.suggestion-film__list.new_series');
        const slideRightSuggestionSeries = document.querySelector('.js-slider-right-NewSeries');

        if (slideRightSuggestionSeries) {
            slideRightSuggestionSeries.addEventListener('click', () => {
                const offset = window.pageYOffset;
                sliderSuggestionSeries.scrollBy({
                    top: 0,
                    left: slideRightSuggestionSeries.scrollLeft + scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        const slideLeftSuggestionSeries = document.querySelector('.js-slider-left-NewSeries');
        if (slideLeftSuggestionSeries) {
            slideLeftSuggestionSeries.addEventListener('click', () => {
                const offset = window.pageYOffset;
                sliderSuggestionSeries.scrollBy({
                    top: 100,
                    left: -scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        // fefe
        const sliderSuggestionGenres = document.querySelector('.suggestion-film__list.genres');
        const slideRightGenresSeries = document.querySelector('.js-slider-right-Genres');

        if (slideRightGenresSeries) {
            slideRightGenresSeries.addEventListener('click', () => {
                const offset = window.pageYOffset;
                sliderSuggestionGenres.scrollBy({
                    top: 0,
                    left: sliderSuggestionGenres.scrollLeft + scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        const slideLeftGenresSeries = document.querySelector('.js-slider-left-Genres');
        if (slideLeftGenresSeries) {
            slideLeftGenresSeries.addEventListener('click', () => {
                const offset = window.pageYOffset;
                sliderSuggestionGenres.scrollBy({
                    top: 100,
                    left: -scrollDistantion,
                    behavior: 'smooth',
                });
                window.scrollTo({
                    top: offset,
                });
            });
        }

        topMediaImgs.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = 'img/not-found.jpeg';
            });
        });

        newMediaImgs.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = 'img/not-found.jpeg';
            });
        });

        const topFilmSeriesHandler = (event) => {
            scrollToTop();

            const target = event.target.closest('.item__film-card');
            event.preventDefault();

            if (target) {
                const transmitData = {
                    path: target.getAttribute('href'),
                };

                this.eventBus.emit(Events.PathChanged, transmitData);
            }
        };

        const newFilmSeriesHandler = (event) => {
            scrollToTop();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                const transmitData = {
                    path: target.getAttribute('href'),
                };

                this.eventBus.emit(Events.PathChanged, transmitData);
            }
        };

        const [filmContainer] = document.getElementsByClassName('container');
        filmContainer?.addEventListener(('click'), topFilmSeriesHandler);

        const [newFilms] = document.getElementsByClassName('new_films');
        newFilms?.addEventListener(('click'), newFilmSeriesHandler);

        const [newSeries] = document.getElementsByClassName('new_series');
        newSeries?.addEventListener(('click'), newFilmSeriesHandler);
    }
}
