import { getProfile, getCurrentUser } from '../modules/http.js';
import Events from '../consts/events.js';

/** Class representing profile page model. */
export class ProfileModel {
    /**
     * Create a profile page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.ProfilePage.Get.InfoAboutCurrentUser, this.getInfoAboutCurrentUser);
        this.eventBus.on(Events.ProfilePage.Get.InfoForProfile, this.getInfoForProfile);
    }

    /**
     * Call func to full info about logged user for render profile page in success case.
     * In other case, rerender home page.
     */
    getInfoAboutCurrentUser = () => {
        getCurrentUser()
            .then((idUser) => {
                if (idUser) {
                    this.eventBus.emit(Events.ProfilePage.Get.InfoForProfile, idUser);
                } else {
                    this.eventBus.emit(Events.Homepage.Render.Page);
                }
            }).catch(() => {
                this.eventBus.emit(Events.Homepage.Render.ErrorPage);
            });
    }

    /**
     * Get full info about user and emit render profile page.
     * @param {string} idUser - Current user id.
     */
    getInfoForProfile = (idUser) => {
        getProfile(idUser)
            .then((responseBody) => {
                if (!responseBody) {
                    this.eventBus.emit(Events.Homepage.Render.ErrorPage);
                    return;
                }

                const params = {
                    id: responseBody.id,
                    login: responseBody.username,
                    email: responseBody.email,
                    user_avatar: responseBody.avatar ?? '../assets/profile.webp',
                };

                this.eventBus.emit(Events.ProfilePage.Render.ProfileInfo, params);
                this.eventBus.emit(Events.ProfilePage.SetEventListeners, idUser);
            }).catch(() => {
                this.eventBus.emit(Events.Homepage.Render.ErrorPage);
            });
    }
}
