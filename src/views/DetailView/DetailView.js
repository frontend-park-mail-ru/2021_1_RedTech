import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import { getPathArgs } from '../../modules/router.js'

import Loader from '../../components/Loader/Loader.pug';
import DetailForm from '../../components/DetailForm/DetailForm.pug';


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
    }
    /**
     * Render html film detail page from pug template.
     */
    render = (data = {}) => {
        const template = Loader();
        APPLICATION.innerHTML = template;
        console.log('Rendkek', window.location.pathname);

        let pathArgs = getPathArgs(window.location.pathname, '/movie/:id');

        this.eventBus.emit('detailpage:getInfoAboutFilm', pathArgs.id);
        this.eventBus.emit('homepage:getCurrentUser');
    }

    /**
     * Render html film detail page from pug template into content div.
     * @param {Object} filmData - Detail info about film in object.
     */
    renderDetailsAboutFilm = (filmData) => {
        this._data = { filmData };
        const template = DetailForm(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }
}
