import { APPLICATION } from '../../main.js';
import { Events } from '../../consts/events.js';
import { BaseView } from '../BaseView/BaseView.js';
import { scrollToTop } from '../../modules/utils.js';

import Loader from '../../components/Loader/Loader.pug';
import FilmSeriesContent from '../../components/FilmSeriesContent/FilmSeriesContent.pug';

/** Class representing film/series page view. */
export class MediatekaView extends BaseView {
    /**
     * Create a film/series page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('mediateka:render', this.render);
        this.eventBus.on('mediateka:setEventListeners', this.setEventListeners);
        this.eventBus.on('mediateka:renderContent', this.renderContent);
    }
    /**
     * Render html film/series page from pug template.
     */
    render = (data) => {
        this._data = data.data;
        const template = Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:InfoForHeader');
        this.eventBus.emit('mediateka:getPageContent', this._data);
    }

    /**
     * Render content film/series page from pug template to content div.
     */
    renderContent = (data) => {
        this._data = data;
        const template = FilmSeriesContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        this.eventBus.emit('homepage:setEventListeners');

        const genresHandler = (event) => {
            scrollToTop();
            removeEventListener();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                const transmitData = {};
                if (this._data.isFilm) {
                    transmitData.path = `/movies/genre/${target.id}`;
                } else {
                    transmitData.path = `/series/genre/${target.id}`;
                }
                transmitData.isFilm = this._data.isFilm;
                this.eventBus.emit(Events.PathChanged, transmitData);
            }
        };

        const genresContainer = document.querySelector('.genres');
        genresContainer?.addEventListener(('click'), genresHandler);

        const removeEventListener = () => {
            genresContainer?.removeEventListener(('click'), genresHandler);
        };

        this.eventBus.on('mediateka:removeEventListener', removeEventListener);

    }
}
