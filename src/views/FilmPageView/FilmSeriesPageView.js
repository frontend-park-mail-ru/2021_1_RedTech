import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing film/series page view. */
export class FilmSeriesPageView extends BaseView {
    /**
     * Create a film/series page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('film-seriespage:render', this.render);
        this.eventBus.on('film-seriespage:setEventListeners', this.setEventListeners);
        this.eventBus.on('film-seriespage:renderContent', this.renderContent);
    }
    /**
     * Render html film/series page from pug template.
     */
    render = (data) => {
        this._data = data;
        const template = puglatizer.components.Loader.Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:InfoForHeader');
        this.eventBus.emit('film-seriespage:getPageContent', this._data);
    }

    /**
     * Render content film/series page from pug template to content div.
     */
    renderContent = (data) => {
        this._data = data;
        const template = puglatizer.components.FilmSeriesContent.FilmSeriesContent(this._data);
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
    setEventListeners = (data) => {
        this.eventBus.emit('homepage:setEventListeners');

        const genresHandler = (event) => {
            window.scrollTo(0, 0);
            removeEventListener();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                data.id = target.id;
                data.genre = target.dataset.genre;
                this.eventBus.emit('genrepage:getPageContent', data);
            }
        };

        const genresContainer = document.querySelector('.genres');
        genresContainer?.addEventListener(('click'), genresHandler);

        const removeEventListener = () => {
            genresContainer?.removeEventListener(('click'), genresHandler);
        };

        this.eventBus.on('film-seriespage:removeEventListener', removeEventListener);

    }
}
