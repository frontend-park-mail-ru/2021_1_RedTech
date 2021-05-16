import Events from '../consts/events.js';
import Routes from '../consts/routes.js';
import { isValidForm } from '../modules/isValidForm.js';
import {
    getLogout,
    patchProfile,
    postAvatar,
    postUserForLogin,
    postUserForSignUp
} from '../modules/http.js';


/** Class representing user model. */
export class UserModel {
    /**
     * Create a user model.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on(Events.User.Login, this.login);
        this.eventBus.on(Events.User.Signup, this.signup);
        this.eventBus.on(Events.User.Logout, this.logout);
        this.eventBus.on(Events.User.Update, this.saveChanges);
    }

    /**
     * Login user and in success case render home page.
     * @param {HTMLFontElement} form - Form for login, need to validation
     * @param {string} email - User email, need to post request.
     * @param {string} password - User password, need to post request.
     */
    login = (form, email, password) => {
        const isValid = isValidForm(form);

        if (isValid) {
            postUserForLogin(
                email,
                password
            ).then((responseFlag) => {
                if (responseFlag) {
                    this.eventBus.emit('login:removeEventListeners');
                    this.eventBus.emit(Events.PathChanged, { path: Routes.HomePage });
                } else {
                    this.eventBus.emit(Events.PathChanged, { path: Routes.LoginPage });
                }
            }).catch(() => {
                this.eventBus.emit(Events.PathChanged, { path: Routes.LoginPage });
            });
        }
    }

    /**
     * Signup user and in success case render home page.
     * @param {HTMLFontElement} form - Form for signup, need to validation
     * @param {string} login - User login, need to post request.
     * @param {string} email - User email, need to post request.
     * @param {string} password - User password, need to post request.
     * @param {string} confirmPassword - User confirm password, need to post request.
     */
    signup = (form, login, email, password, confirmPassword) => {
        const isValid = isValidForm(form);

        if (isValid) {
            postUserForSignUp(
                login,
                email,
                password,
                confirmPassword
            ).then((responseFlag) => {
                if (responseFlag) {
                    this.eventBus.emit('signup:removeEventListeners');
                    this.eventBus.emit(Events.PathChanged, { path: Routes.HomePage });
                } else {
                    this.eventBus.emit(Events.SignupPage.Render);
                }
            }).catch(() => {
                this.eventBus.emit(Events.SignupPage.Render);
            });
        }
    }

    /**
     * Logout user, and rerender home page.
     */
    logout = () => {
        getLogout().then(() => {
            this.eventBus.emit(Events.PathChanged, { path: Routes.LoginPage });
        }).catch(() => {
            this.eventBus.emit( Events.Homepage.Render.ErrorPage);
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

            postAvatar(idUser, formPut).then((avatarSrc) => {
                if (avatarSrc) {
                    this.eventBus.emit(Events.ProfilePage.Render.NewAvatar, avatarSrc);
                    this.eventBus.emit(Events.ProfilePage.Render.ValidationFromServer, false);
                } else {
                    this.eventBus.emit(Events.ProfilePage.Render.ValidationFromServer, true);
                }
            }).catch(() => {
                this.eventBus.emit(Events.Homepage.Render.ErrorPage);
            });
        }
    }

    /**
     * Update profile info.
     * @param {string} idUser - Current user id.
     * @param {string} email - New user email.
     * @param {string} login - New user login.
     */
    updateProfileInfo = (idUser, email, login) => {
        patchProfile(
            idUser,
            email,
            login
        ).then((responseStatus) => {
            if (responseStatus) {
                this.eventBus.emit(Events.ProfilePage.Update);
                this.eventBus.emit(Events.ProfilePage.Render.ValidationFromServer, false);
            } else {
                this.eventBus.emit(Events.ProfilePage.Render.ValidationFromServer);
            }
        }).catch(() => {
            this.eventBus.emit(Events.Homepage.Render.ErrorPage);
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
            this.updateProfileInfo(idUser, email, login);
        }
    }
}
