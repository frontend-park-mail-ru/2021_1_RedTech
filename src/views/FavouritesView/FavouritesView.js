import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

import Loader from '../../components/Loader/Loader.pug';
import GenreContent from '../../components/GenreContent/GenreContent.pug';
import Events from '../../consts/events.js';

/** Class representing favourites page view. */
export class FavouritesView extends BaseView {
    /**
     * Create favourites page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.FavouritesPage.Render.Page, this.render);
        this.eventBus.on(Events.FavouritesPage.Render.Content, this.renderContent);
    }
    /**
     * Render html favourites page from pug template.
     */
    render = () => {
        const template = Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.FavouritesPage.GetPageContent);
    }

    /**
     * Render content favourites page from pug template to content div.
     */
    renderContent = (data) => {
        this._data = data;
        const template = GenreContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }
}
