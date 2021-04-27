import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import Loader from '../../components/Loader/Loader.pug';
import ProfileContent from '../../components/ProfileContent/ProfileContent.pug';
import Events from '../../consts/events';

/** Class representing a profile page view. */
export class ProfileView extends BaseView {
    /**
     * Create a profile page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} - Parameters for render profile view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.ProfilePage.Render.Page, this.render);
        this.eventBus.on(Events.ProfilePage.Render.ProfileInfo, this.renderProfileInfo);
        this.eventBus.on(Events.ProfilePage.SetEventListeners, this.setEventListeners);
        this.eventBus.on(Events.ProfilePage.Render.NewAvatar, this.renderNewAvatar);
        this.eventBus.on(Events.ProfilePage.Update, this.updateProfile);
    }

    /**
	 * Render html profile page from pug template.
	 */
    render = () => {
        const template = Loader();
        APPLICATION.innerHTML = template;
        this.eventBus.emit(Events.ProfilePage.Get.InfoAboutCurrentUser);
        this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
    }

    /**
     * Render html profile info from pug template to content div.
     * @param {Object} params - Profile data.
     */
    renderProfileInfo = (params) => {
        this._data = {
            profileData: params
        };
        const template = ProfileContent(this._data);
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
        }
    }

    /**
     * Render avatar from pug template.
     * @param {string} avatarSrc - Source of new avatar.
     */
    renderNewAvatar = (avatarSrc) => {
        const imgAvatar = document.getElementById('avatar');
        imgAvatar.src = avatarSrc;
    }

    /**
     * Setting for input form and button.
     * @param {HTMLFormElement} form - Form element that will be updated.
     */
    updateProfile = (form) => {
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
    setEventListeners = (idUser) => {
        const imgAvatar = document.getElementById('avatar');

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

                this.eventBus.emit(Events.ProfilePage.SaveChanges, idUser, form, avatarInput, email, login);
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
