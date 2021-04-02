import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing a profile page view. */
export class ProfileView extends BaseView {
    /**
     * Create a profile page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} data - Parameters for render profile view.
     */
    constructor(eventBus, { data = [] } = {}) {
        super(eventBus, data);
        this.eventBus.on('profile:render', this.render.bind(this));
        this.eventBus.on('profile:renderProfileInfo', this.renderProfileInfo.bind(this));
        this.eventBus.on('profile:setEventListeners', this.setEventListeners.bind(this));
        this.eventBus.on('profile:renderNewAvatar', this.renderNewAvatar.bind(this));
        this.eventBus.on('profile:updateProfile', this.updateProfile.bind(this));
    }

    /**
	 * Render html profile page from pug template.
	 */
    render() {
        this._data = {
            profileData: {}
        };
        const template = puglatizer.views.Profile.Profile(this._data);
        APPLICATION.innerHTML = template;
        this.eventBus.emit('profile:getCurrentUser');
        this.eventBus.emit('homepage:getCurrentUser');
    }

    /**
     * Render html profile info from pug template to content div.
     * @param {Object} params - Profile data.
     */
    renderProfileInfo(params) {
        this._data = {
            profileData: params
        };
        const template = puglatizer.components.ProfileContent.ProfileContent(this._data);
        const [content] = document.getElementsByClassName('content');
        content.innerHTML = template;
    }

    /**
     * Render avatar from pug template.
     * @param {string} avatarSrc - Source of new avatar.
     */
    renderNewAvatar(avatarSrc) {
        const imgAvatar = document?.getElementById('avatar');
        imgAvatar.src = avatarSrc;
    }

    /**
     * Setting for input form and button.
     * @param {HTMLFormElement} form - Form element that will be updated.
     */
    updateProfile(form) {
        const [nick] = document.getElementsByClassName('title-wrapper__nickname');
        const [button] = document.getElementsByClassName('input-wrapper__button');
        const inputs = form.querySelectorAll('.input-wrapper__input');

        nick.textContent = document.getElementById('login').value;
        button.textContent = 'Редактировать';

        inputs.forEach((input) => {
            input.classList.add('input-wrapper__input_disabled');
            input.disabled = true;
        });
    }

    /**
     * Set event listeners.
     * @param {string} idUser - idUser that needed for render some data.
     */
    setEventListeners(idUser) {
        const imgAvatar = document?.getElementById('avatar');

        const [form] = document.getElementsByTagName('form');
        const [button] = document.getElementsByClassName('input-wrapper__button');

        const imgHandler = () => {
            imgAvatar.src='img/user.png';
        };

        imgAvatar.addEventListener('error', imgHandler);

        const formHandler = (event) => {
            event.preventDefault();

            const inputs = form.querySelectorAll('.input-wrapper__input');

            if (button.textContent === 'Редактировать') {
                button.textContent = 'Сохранить';
                inputs.forEach((input) => {
                    input.classList.remove('input-wrapper__input_disabled');
                    input.disabled = false;
                });
            } else if (button.textContent === 'Сохранить') {
                const avatarInput = document.getElementById('file');
                const email = document.getElementById('email').value;
                const login = document.getElementById('login').value;

                this.eventBus.emit('profile:saveChanges', idUser, form, avatarInput, email, login);
            }
        };

        form?.addEventListener(('submit'), formHandler);

        const removeEventListeners = () => {
            form?.removeEventListener(('submit'), formHandler);
            imgAvatar.removeEventListener('error', imgHandler);
        };

        this.eventBus.on('profile:removeEventListeners', removeEventListeners);
    }
}
