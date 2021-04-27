import { getCurrentUser, getLogout, getNewFilms, getNewSeries, getTopFilmsAndSeries } from '../modules/http.js';
import { Events } from '../consts/events.js';

/** Class representing home page model. */
export class HomePageModel {
    /**
     * Create a home page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.Homepage.Get.InfoForHeader, this.getInfoForHeader);
        this.eventBus.on(Events.Homepage.Logout, this.logout);
        this.eventBus.on(Events.Homepage.Get.MainPageContent, this.getMainPageContent);
    }

    /**
     * Get info for main page about films, series and emit render content.
     */
    getMainPageContent = () => {
        const topFilmsAndSeries = getTopFilmsAndSeries();
        const newFilms = getNewFilms();
        const newSeries = getNewSeries();
        Promise.all([topFilmsAndSeries, newFilms, newSeries]).then((values) => {
            const [topFilmsAndSeriesValue, newFilmsValue, newSeriesValue] = values;
            this.eventBus.emit(Events.Homepage.Render.Content, topFilmsAndSeriesValue, newFilmsValue, newSeriesValue);
            this.eventBus.emit(Events.Homepage.SetEventListeners);
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }

    /**
     * Get info for main page about header and emit render header.
     */
    getInfoForHeader = () => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                const data = {
                    isAuthorized: true,
                };
                this.eventBus.emit(Events.Homepage.Render.Header, data);
            } else {
                const data = {
                    isAuthorized: false,
                };
                this.eventBus.emit(Events.Homepage.Render.Header, data);
            }
            this.eventBus.emit(Events.Homepage.SetEventListenersForHeader);

        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        });
    }

    /**
     * Logout user, and rerender home page.
     */
    logout = () => {
        getLogout().then(() => {
            this.eventBus.emit(Events.PathChanged, '/login');
        }).catch(() => {
            this.eventBus.emit( Events.Homepage.Render.ErrorPage);
        });
    }
}
