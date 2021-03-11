import { APPLICATION, USER } from '../../main.js';
import { isValidForm } from '../../utils/isValidForm.js';
import {asyncGetUsing, asyncGetUsingAvatar} from '../../modules/http.js';
import { URLS } from '../../modules/urls.js';

/** Class representing a login page view. */
export class ProfileView {
    /**
	 * Create a profile page view.
	 * @param {Object} data - Parameters for render profile view.
	 */
    constructor({data = {}} = {}) {
        this._data = data;
    }

    /**
	 * Render html login page from pug template to parent.
	 */
    render() {
        const params = {
            url: URLS.api.profile + localStorage.getItem('ID'),
            method: 'GET',
            credentials: 'include'
        };

        console.log(params.url);
        asyncGetUsing(params).then(({status, parsedJson}) => {
            let params = {};
            console.log(status);
            console.log(parsedJson);
            params.login = parsedJson.username;
            params.email = parsedJson.email;
            console.log(parsedJson.user_avatar)

            if (parsedJson.user_avatar) {
                params.user_avatar = parsedJson.user_avatar;
            } else {
                params.user_avatar = 'img/user.png';
            }

            this._data = {
                profileData: params
            }


            const template = puglatizer.Profile.Profile(this._data);
            APPLICATION.innerHTML = template;
            const [form] = document.getElementsByTagName('form');
            const [button] = document.getElementsByClassName('input-wrapper__button');

            form?.addEventListener(('submit'), event => {

                event.preventDefault();

                const inputs = form.querySelectorAll('.input-wrapper__input');

                if (button.textContent === 'Редактировать') {
                    button.textContent = 'Сохранить';
                    inputs.forEach((input) => {
                        if (input.tagName === 'LABEL') {
                            input.classList.remove('input-wrapper__input_disabled');
                        }

                        if (input.tagName !== 'BUTTON') {
                            input.disabled = false;
                        }
                    });
                } else if (button.textContent === 'Сохранить') {
                    const isValid = isValidForm(form);
                    if (isValid) {
                        const [nick] = document.getElementsByClassName('title-wrapper__nickname');

                        const avatarInput = document.getElementById('file');

                        if (avatarInput.value) {
                            const avatar = avatarInput.files[0];
                            const formPut = new FormData();
                            formPut.append('avatar', avatar);

                            const params = {
                                url: URLS.api.profile + localStorage.getItem('ID') + "/avatar",
                                method: 'PUT',
                                credentials: 'include',
                                body: formPut
                            };

                            console.log(params.url);
                            asyncGetUsingAvatar(params).then(({status, parsedJson}) => {
                                let params = {};
                                console.log(status);
                                console.log(parsedJson);
                            });
                        }


                        nick.textContent = document.getElementById('login').value;
                        button.textContent = 'Редактировать';

                        inputs.forEach((input) => {
                            if (input.tagName === 'LABEL') {
                                input.classList.add('input-wrapper__input_disabled');
                            }

                            if (input.tagName !== 'BUTTON') {
                                input.disabled = true;
                            }
                        });


                    }
                }
            });
        });

    }
}
