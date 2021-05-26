import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';
import Loader from '../../components/Loader/Loader.pug';
import ProfileContent from '../../components/ProfileContent/ProfileContent.pug';
import Events from '../../consts/events.js';

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
        this.eventBus.on(Events.ProfilePage.Render.ValidationFromServer, this.renderValidationFromServer);
        this.eventBus.on(Events.ProfilePage.Render.Loader, this.renderLoader);
    }

    /**
	 * Render html profile page from pug template.
	 */
    render = () => {
        APPLICATION.innerHTML = Loader();
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
            const cancelButton = content.querySelector('.cancel-subscription-js');
            if (params.is_sub && cancelButton) {
                cancelButton.addEventListener('click', () => {
                    this.eventBus.emit(Events.User.CancelSubscription);
                });
            }
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
     * Render message about errors from server.
     */
    renderValidationFromServer = (error) => {
        const errorDiv = document.getElementById('serverError');
        if (error) {
            errorDiv.textContent = 'Не удалось обновить данные. Проверьте соединение и повторите попытку позже';
            return;
        }
        errorDiv.textContent = '';
    }

    /**
     * Setting for input form and button.
     */
    updateProfile = () => {
        const nick = document.querySelector('.title-wrapper__nickname');
        nick.textContent = document.getElementById('login').value;
    }

    /**
     * Render loader instead of save button.
     * @param {Boolean} isLoading - flag to render button or loader.
     */
    renderLoader = (isLoading) => {
        const img = document.querySelector('.input-wrapper__loader');
        const button = document.querySelector('.input-wrapper__button');

        if (isLoading) {
            img.classList.remove('hidden');
            button.classList.add('hidden');
            return;
        }

        img.classList.add('hidden');
        button.classList.remove('hidden');

    }

    /**
     * Set event listeners.
     * @param {string} idUser - idUser that needed for render some data.
     */
    setEventListeners = (idUser) => {
        const imgAvatar = document.getElementById('avatar');
        const avatarInput = document.getElementById('file');

        const [form] = document.getElementsByTagName('form');
        const [button] = document.getElementsByClassName('input-wrapper__button');

        const imgHandler = () => {
            imgAvatar.src='../../assets/profile.webp';
        };

        const previewHandler = (event) => {
            imgAvatar.src = URL.createObjectURL(event.target.files[0]);
            imgAvatar.onload = () => {
                URL.revokeObjectURL(imgAvatar.src);
            };
        };

        imgAvatar.addEventListener('error', imgHandler);
        avatarInput.addEventListener('change', previewHandler);

        const formHandler = (event) => {
            event.preventDefault();

            if (button.textContent === 'Сохранить') {
                const avatarInput = document.getElementById('file');
                const email = document.getElementById('email').value;
                const login = document.getElementById('login').value;

                this.eventBus.emit(Events.User.Update, idUser, form, avatarInput, email, login);
            }
        };

        form?.addEventListener(('submit'), formHandler);
    }
}
