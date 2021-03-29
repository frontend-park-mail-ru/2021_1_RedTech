import { APPLICATION } from '../../main.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { getProfile, patchProfile, postAvatar } from '../../modules/http.js';

/** Class representing a profile page view. */
export class ProfileView {
    /**
	 * Create a profile page view.
	 * @param {Object} data - Parameters for render profile view.
	 */
    constructor({data = {}} = {}) {
        this._data = data;
    }

    /**
	 * Render html profile page from pug template to parent.
	 */
    render() {
        const idUser = this._data.idUser;
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

                this._data = {
                    profileData: params
                };

                const template = puglatizer.Profile.Profile(this._data);
                APPLICATION.innerHTML = template;

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
                        const isValid = isValidForm(form);
                        if (isValid) {
                            const [nick] = document.getElementsByClassName('title-wrapper__nickname');

                            const avatarInput = document.getElementById('file');

                            if (avatarInput.value) {
                                button.disabled = true;

                                const avatar = avatarInput.files[0];
                                const formPut = new FormData();
                                formPut.append('avatar', avatar);

                                const { avatarSrc } =  postAvatar(idUser, formPut);

                                if (avatarSrc) {
                                    const imgAvatar = document?.getElementById('avatar');
                                    imgAvatar.src = avatarSrc;
                                }

                                button.disabled = false;
                            }

                            patchProfile(
                                idUser,
                                document.getElementById('email').value,
                                document.getElementById('login').value
                            ).then((responseStatus) => {
                                if (responseStatus) {
                                    nick.textContent = document.getElementById('login').value;
                                    button.textContent = 'Редактировать';

                                    inputs.forEach((input) => {
                                        input.classList.add('input-wrapper__input_disabled');
                                        input.disabled = true;

                                    });
                                }
                            });
                        }
                    }
                };

                form?.addEventListener(('submit'), formHandler);
            }
        });
    }
}
