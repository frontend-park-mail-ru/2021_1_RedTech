import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing favourites page view. */
export class FavouritesView extends BaseView {
    /**
     * Create favourites page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('favouritespage:render', this.render);
        this.eventBus.on('favouritespage:renderContent', this.renderContent);
    }
    /**
     * Render html favourites page from pug template.
     */
    render = () => {
        const template = puglatizer.components.Loader.Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit('homepage:InfoForHeader');
        this.eventBus.emit('favouritespage:getPageContent');
    }

    /**
     * Render content favourites page from pug template to content div.
     */
    renderContent = (data) => {
        this._data = data;
        const template = puglatizer.components.GenreContent.GenreContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit('homepage:renderErrorPage');
        }
    }
}
