import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing film detail page view. */
export class DetailPageView extends BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} data - Parameters for film detail page view.
     */
    constructor(eventBus, { data = [] } = {}) {
        super(eventBus, data);
        this.eventBus.on('detailpage:render', this.render.bind(this));
        this.eventBus.on('detailpage:renderDetailsAboutFilm', this.renderDetailsAboutFilm.bind(this));
    }
    /**
     * Render html film detail page from pug template.
     */
    render() {
        this._data = {
            filmData: {},
        };
        const template = puglatizer.views.DetailView.DetailView(this._data);
        APPLICATION.innerHTML = template;
        this.eventBus.emit('detailpage:getInfoAboutFilm');
        this.eventBus.emit('homepage:getCurrentUser');
    }

    /**
     * Render html film detail page from pug template into content div.
     * @param {Object} filmData - Detail info about film in object.
     */
    renderDetailsAboutFilm(filmData) {
        this._data = { filmData };
        const template = puglatizer.components.DetailForm.DetailForm(this._data);
        const [content] = document.getElementsByClassName('content');
        content.innerHTML = template;
    }
}
