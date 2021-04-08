import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing genre page view. */
export class GenrePageView extends BaseView {
    /**
     * Create genre page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('genrepage:render', this.render);
        this.eventBus.on('genrepage:setEventListeners', this.setEventListeners);
        this.eventBus.on('genrepage:renderContent', this.renderContent);
    }
    /**
     * Render html genre page from pug template.
     */
    render = (genre) => {
        const template = puglatizer.components.Loader.Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:InfoForHeader');
        this.eventBus.emit('genrepage:getPageContent', genre);
    }

    /**
     * Render content genre page from pug template to content div.
     */
    renderContent = (contentData, genreTitle) => {
        this._data = {
            contentData,
            genreTitle
        };
        const template = puglatizer.components.GenreContent.GenreContent(this._data);
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
        const genresContentHandler = (event) => {
            window.scrollTo(0, 0);
            removeEventListener();

            const target = event.target.closest('.item__internal');
            event.preventDefault();

            if (target) {
                this.eventBus.emit('detailpage:getInfoAboutFilm', target.id.substr('suggest'.length));
            }
        };

        const genresContent = document.querySelector('.suggestion-film__list');
        genresContent?.addEventListener(('click'), genresContentHandler);

        const removeEventListener = () => {
            genresContent?.removeEventListener(('click'), genresContentHandler);
        };

        this.eventBus.on('genrepage:removeEventListener', removeEventListener);
    }
}
