import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing film detail page view. */
export class DetailPageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} - Parameters for film detail page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('detailpage:render', this.render);
        this.eventBus.on('detailpage:renderDetailsAboutFilm', this.renderDetailsAboutFilm);
        this.eventBus.on('detailpage:setEventListeners', this.setEventListeners);
    }
    /**
     * Render html film detail page from pug template.
     */
    render = () => {
        const template = puglatizer.components.Loader.Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('detailpage:getInfoAboutFilm');
        this.eventBus.emit('homepage:InfoForHeader');
    }

    /**
     * Render html film detail page from pug template into content div.
     * @param {Object} filmData - Detail info about film in object.
     */
    renderDetailsAboutFilm = (filmData) => {
        this._data = { filmData };
        const template = puglatizer.components.DetailForm.DetailForm(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }

    setEventListeners = () => {
        const contentImage = document.querySelector('.js-preview-image');

        const imageErrorHandler = () => {
            contentImage.src = 'img/not-found.jpeg';
        };

        contentImage.addEventListener('error', imageErrorHandler);

        const removeEventListeners = () => {
            contentImage.removeEventListener('error', imageErrorHandler);
        };

        this.eventBus.emit('detailpage:removeEventListeners', removeEventListeners);
    }
}
