import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

import Loader from '../../components/Loader/Loader.pug';
import ActorPageContent from '../../components/ActorPageContent/ActorPageContent.pug';
import Events from '../../consts/events.js';
import { getPathArgs } from '../../modules/router.js';

/** Class representing actor page view. */
export class ActorView extends BaseView {
    /**
     * Create actor page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object}- Parameters for home page view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.ActorPage.Render.Page, this.render);
        this.eventBus.on(Events.ActorPage.Render.Content, this.renderContent);
    }
    /**
     * Render html favourites page from pug template.
     */
    render = () => {
        const template = Loader();
        APPLICATION.innerHTML = template;

        const pathArgs = getPathArgs(window.location.pathname, '/actors/:id');

        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
        this.eventBus.emit(Events.ActorPage.GetPageContent, pathArgs);
    }

    /**
     * Render content favourites page from pug template to content div.
     */
    renderContent = (data) => {
        this._data = data;
        const template = ActorPageContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }
}
