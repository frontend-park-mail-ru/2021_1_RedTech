import { APPLICATION } from '../../main.js';
import { USER } from '../../main.js';
import { SignUpView } from '../SignUp/SignUp.js';
import { isValidForm } from '../../utils/isValidForm.js';
import { asyncGetUsing } from '../../modules/http.js';
import { HomeComponent } from '../HomeView/HomeView.js';
import { URLS } from '../../modules/urls.js';

/** Class representing a login page view. */
export class LogInView {
    /**
     * Create a login page view.
     * @param {Object} data - Parameters for render login view.
     */
    constructor({ data = {} } = {}) {
        this._data = data;
    }

    /**
     * Render html login page from pug template to parent.
     */
    render() {
        const template = puglatizer.LogIn.LogIn();
        APPLICATION.innerHTML = template;

        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        form?.addEventListener(('submit'), event => {
            event.preventDefault();
            const isValid = isValidForm(form);

            if (isValid) {
                let params = {
                    url: URLS.api.login,
                    method: 'POST',
                    credentials: 'include',
                    body: {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
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
                            },
                        });

                        //USER.ID = parsedJson.id;
                        formComponent.render();
                    }
                });
            }
        });

        aTag?.addEventListener(('click'), event => {
            event.preventDefault();
            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();
        });
    }
}
