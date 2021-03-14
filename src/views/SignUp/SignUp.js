import { APPLICATION } from '../../main.js';
import { LogInView } from '../LogIn/LogIn.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { asyncGetUsing } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';
import { URLS } from '../../modules/urls.js';

/** Class representing a signup page view. */
export class SignUpView {
    /**
     * Create a signup page view.
     * @param {Object} data - Parameters for render signup view.
     */
    constructor({ data = {} } = {}) {
        this._data = data;
    }

    /**
     * Render html signup page from pug template to parent.
     */
    render() {
        const template = puglatizer.SignUp.SignUp();
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const inputs = form.querySelectorAll('.input-wrapper__input');

        form?.addEventListener(('submit'), event => {
            event.preventDefault();
            const isValid = isValidForm(form)
            if (isValid) {
                let params = {
                    url: URLS.api.signup,
                    method: 'POST',
                    credentials: 'include',
                    body: {
                        username: document.getElementById('login').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        confirm_password: document.getElementById('confirmPassword').value
                    }
                };

                asyncGetUsing(params).then(({status, parsedJson}) => {
                    if (status === 200) {
                        APPLICATION.innerHTML = '';
                        localStorage.setItem('ID', parsedJson.id);
                        let headerIcons = [
                            {id: 'searchPage', href: '#', src: '../../assets/search.png', alt: ''},
                            {id: 'favouritePage', href: '#', src: '../../assets/star.png', alt: ''},
                            {id: 'profilePage', href: '#', src: '../../assets/profile.png', alt: ''},
                            {id: 'logoutPage', href: '#', src: '../../assets/unlogined.png', alt: ''},
                        ];

                        const formComponent = new HomeComponent({
                            parent: APPLICATION,
                            data: {
                                headerIcons,
                            }
                        });

                        formComponent.render();
                    }
                });
            }
        });

        aTag?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const loginView = new LogInView();
            loginView.render();
        });
    }
}
