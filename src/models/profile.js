import { getProfile, getCurrentUser, postAvatar, patchProfile } from '../modules/http.js';
import { isValidForm } from '../utils/isValidForm.js';

export class ProfileModel {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('profile:getCurrentUser', this.getCurrentUser.bind(this));
        this.eventBus.on('profile:getProfile', this.getProfile.bind(this));
        this.eventBus.on('profile:saveChanges', this.saveChanges.bind(this));
    }

    getCurrentUser() {
        getCurrentUser().then((idUser) => {
            if (idUser) {
                this.eventBus.emit('profile:getProfile', idUser);
            } else {
                this.eventBus.emit('homepage:render');
            }
        });
    }

    getProfile(idUser) {
        getProfile(idUser).then((responseBody) => {
            if (responseBody) {
                let params = {};
                params.login = responseBody.username;
                params.email = responseBody.email;

                if (responseBody.avatar) {
                    params.user_avatar = responseBody.avatar;
                } else {
                    params.user_avatar = 'img/user.png';
                }
                this.eventBus.emit('profile:renderProfileInfo', params);
                this.eventBus.emit('profile:setEventListeners', idUser);
            }
        });
    }

    postAvatar(idUser, avatarInput) {
        const avatar = avatarInput.files[0];
        const formPut = new FormData();
        formPut.append('avatar', avatar);

        const { avatarSrc } =  postAvatar(idUser, formPut);

        if (avatarSrc) {
            this.eventBus.emit('profile:renderNewAvatar', avatarSrc);
        }
    }

    patchProfile(idUser, email, login, form) {
        patchProfile(
            idUser,
            email,
            login
        ).then((responseStatus) => {
            if (responseStatus) {
                this.eventBus.emit('profile:updateProfile', form);
            }
        });
    }

    saveChanges(idUser, form, avatarInput, email, login) {
        const isValid = isValidForm(form);
        if (isValid) {
            if (avatarInput.value) {
                this.postAvatar(idUser, avatarInput);
            }
            this.patchProfile(idUser, email, login, form);
        }
    }
}