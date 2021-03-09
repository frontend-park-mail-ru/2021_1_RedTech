import { APPLICATION } from '../../main.js';
import { isValidForm } from '../../utils/isValidForm.js';

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
    }
}
