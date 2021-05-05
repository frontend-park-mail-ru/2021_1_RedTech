import Events from '../consts/events.js';
import { getInfoAboutActor } from '../modules/http';

/** Class representing actor page model. */
export class ActorPageModel {
    /**
     * Create a favourites actor page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.ActorPage.GetPageContent, this.getPageContent);
    }

    /**
     * Get info for favourites page emit render content.
     */
    getPageContent = (actorId) => {
        getInfoAboutActor(actorId.id).then((contentData) => {
            this.eventBus.emit(Events.ActorPage.Render.Content, contentData);
            this.eventBus.emit(Events.GenrePage.SetEventListeners);
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }
}
