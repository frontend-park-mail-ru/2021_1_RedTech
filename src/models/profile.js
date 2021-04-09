import { getProfile, getCurrentUser, postAvatar, patchProfile } from '../modules/http.js';
import { isValidForm } from '../utils/isValidForm.js';

/** Class representing profile page model. */
export class ProfileModel {
    /**
     * Create a profile page model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('profile:getInfoAboutCurrentUser', this.getInfoAboutCurrentUser);
        this.eventBus.on('profile:getInfoForProfile', this.getInfoForProfile);
        this.eventBus.on('profile:saveChanges', this.saveChanges);
    }

    /**
     * Call func to full info about logged user for render profile page in success case.
     * In other case, rerender home page.
     */
    getInfoAboutCurrentUser = () => {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                this.eventBus.emit('profile:getInfoForProfile', idUser);
            } else {
                this.eventBus.emit('homepage:render');
            }
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    }

    /**
     * Get full info about user and emit render profile page.
     * @param {string} idUser - Current user id.
     */
    getInfoForProfile = (idUser) => {
        getProfile(idUser).then((responseBody) => {
            if (!responseBody) {
                this.eventBus.emit('homepage:renderErrorPage');
                return;
            }

            const params = {
                login: responseBody.username,
                email: responseBody.email,
                user_avatar: responseBody.avatar ?? 'img/user.png',
            };

            this.eventBus.emit('profile:renderProfileInfo', params);
            this.eventBus.emit('profile:setEventListeners', idUser);
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    }

    /**
     * Update avatar and emit render new avatar.
     * @param {string} idUser - Current user id.
     * @param {HTMLElement} avatarInput - Avatar input field.
     */
    updateAvatar = (idUser, avatarInput) => {
        const [avatar] = avatarInput.files;
        if (avatar) {
            const formPut = new FormData();
            formPut.append('avatar', avatar);

            const { avatarSrc } =  postAvatar(idUser, formPut);

            if (avatarSrc) {
                this.eventBus.emit('profile:renderNewAvatar', avatarSrc);
            }
        }
    }

    /**
     * Update profile info.
     * @param {string} idUser - Current user id.
     * @param {string} email - New user email.
     * @param {string} login - New user login.
     * @param {HTMLFormElement} form - Profile page form.
     */
    updateProfileInfo = (idUser, email, login, form) => {
        patchProfile(
            idUser,
            email,
            login
        ).then((responseStatus) => {
            if (responseStatus) {
                this.eventBus.emit('profile:updateProfile', form);
            }
        }).catch(() => {
            this.eventBus.emit('homepage:renderErrorPage');
        });
    }

    /**
     * Calls when was submitted profile form button, save all changes.
     * @param {string} idUser - Current user id.
     * @param {HTMLFormElement} form - Profile page form.
     * @param {HTMLElement} avatarInput - Avatar input field.
     * @param {string} email - New user email.
     * @param {string} login - New user login.
     */
    saveChanges = (idUser, form, avatarInput, email, login) => {
        const isValid = isValidForm(form);
        if (isValid) {
            if (avatarInput.value) {
                this.updateAvatar(idUser, avatarInput);
            }
            this.updateProfileInfo(idUser, email, login, form);
        }
    }
}
