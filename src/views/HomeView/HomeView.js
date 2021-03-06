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
        this.eventBus.on(Events.SliderActions, this.setSliderActions);
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

        const logoutPage = document.querySelectorAll('.js-logout-page');
        logoutPage?.forEach(element => element.addEventListener(('click'), logoutPageHandler));
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const topMediaImgs = document.querySelectorAll('.item__card-image');
        const newMediaImgs = document.querySelectorAll('.item__suggestion__image');

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

    /**
     * Set slider actions.
     */
    setSliderActions = () => {
        const SCROLL_LEFT_LIMIT = 50;
        const SCROLL_RIGHT_LIMIT = 150;

        const setupSlider = (sliderContainerName, sliderLeftControllerName, sliderRightControllerName) => {
            const sliderContainer = document.querySelector(sliderContainerName);
            const sliderLeftController = document.querySelector(sliderLeftControllerName);
            const sliderRightController = document.querySelector(sliderRightControllerName);

            if (sliderContainer && sliderLeftController && sliderRightController) {
                sliderRightController.addEventListener('click', () => {
                    const scrollDistantion = window.innerWidth;
                    const offset = sliderContainer.scrollLeft + scrollDistantion;
                    const initialYDist = window.pageYOffset;
                    sliderContainer.scrollBy({
                        top: 0,
                        left: offset,
                        behavior: 'smooth',
                    });
                    window.scrollTo({
                        top: initialYDist,
                    });
                });

                sliderLeftController.addEventListener('click', () => {
                    const scrollDistantion = window.innerWidth;
                    const offset = -scrollDistantion;
                    const initialYDist = window.pageYOffset;
                    sliderContainer.scrollBy({
                        top: 0,
                        left: offset,
                        behavior: 'smooth',
                    });
                    window.scrollTo({
                        top: initialYDist,
                    });
                });

                const hideShowSliders = () => {
                    if (sliderContainer.scrollLeft <= SCROLL_LEFT_LIMIT) {
                        sliderLeftController.style.visibility = 'hidden';
                        sliderRightController.style.visibility = 'visible';
                    } else if (sliderContainer.scrollLeft >= sliderContainer.scrollWidth - sliderContainer.offsetWidth - SCROLL_RIGHT_LIMIT) {
                        sliderLeftController.style.visibility = 'visible';
                        sliderRightController.style.visibility = 'hidden';
                    } else {
                        sliderLeftController.style.visibility = 'visible';
                        sliderRightController.style.visibility = 'visible';
                    }
                };

                sliderContainer.addEventListener('scroll', hideShowSliders);

                hideShowSliders();
            }
        };

        setupSlider('.container', '.js-slider-left-FilmCard', '.js-slider-right-FilmCard', true);
        setupSlider('.suggestion-film__list.new_films', '.js-slider-left-NewFilms', '.js-slider-right-NewFilms', true);
        setupSlider('.suggestion-film__list.new_series', '.js-slider-left-NewSeries', '.js-slider-right-NewSeries', true);
        setupSlider('.suggestion-film__list.genres', '.js-slider-left-Genres', '.js-slider-right-Genres', true);
    }
}
