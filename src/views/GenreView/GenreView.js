import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import { scrollToTop } from '../../modules/utils.js';
import { getPathArgs } from '../../modules/router.js';

import Loader from '../../components/Loader/Loader.pug';
import GenreContent from '../../components/GenreContent/GenreContent.pug';
import { Events } from '../../consts/events.js';

/** Class representing genre page view. */
export class GenrePageView extends BaseView {
    /**
     * Create genre page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.GenrePage.Render.Page, this.render);
        this.eventBus.on(Events.GenrePage.SetEventListeners, this.setEventListeners);
        this.eventBus.on(Events.GenrePage.Render.Content, this.renderContent);
    }
    /**
     * Render html genre page from pug template.
     */
    render = (genre) => {

        let pathArgs =  genre.isFilm ?
            getPathArgs(window.location.pathname, '/movies/genre/:id'):
            getPathArgs(window.location.pathname, '/series/genre/:id');
        genre.id = pathArgs.id;

        const template = Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.GenrePage.GetPageContent, genre);
    }

    /**
     * Render content genre page from pug template to content div.
     */
    renderContent = (contentData, genreTitle) => {
        this._data = {
            contentData,
            genreTitle
        };
        const template = GenreContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const genresContentHandler = (event) => {
            scrollToTop();
            removeEventListener();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                const transmitData = {
                    path: target.getAttribute('href'),
                };

                this.eventBus.emit(Events.PathChanged, transmitData);
            }
        };

        const genresContent = document.querySelector('.suggestion-film__list');
        genresContent?.addEventListener(('click'), genresContentHandler);

        const contentImages = document.querySelectorAll('.item__suggestion__image');

        contentImages.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = 'img/not-found.jpeg';
            });
        });

        const removeEventListener = () => {
            genresContent?.removeEventListener(('click'), genresContentHandler);
        };

        this.eventBus.on('genrepage:removeEventListener', removeEventListener);
    }
}
