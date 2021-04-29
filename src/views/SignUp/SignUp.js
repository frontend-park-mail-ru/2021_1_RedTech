import {APPLICATION} from '../../main.js';
import {BaseView} from '../BaseView/BaseView.js';

import SignUp from './SignUp.pug';
import Events from '../../consts/events.js';

/** Class representing a signup page view. */
export class SignUpView extends BaseView {
    /**
     * Create a signup page view.
     * @param {EventBus} eventBus
     * @param {Object} - Parameters for render signup view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.SignupPage.Render, this.render);
    }

    /**
     * Render html signup page from pug template.
     */
    render = () => {
        APPLICATION.innerHTML = SignUp();
        this.setEventListeners();
    }

    /**
     * Setting event listeners.
     */
    setEventListeners = () => {
        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const formHandler = (event) => {
            event.preventDefault();

            this.eventBus.emit(
                Events.User.Signup,
                form,
                document.getElementById('login').value,
                document.getElementById('email').value,
                document.getElementById('password').value,
                document.getElementById('confirmPassword').value
            );
        };

        const aTagHandler = (event) => {
            event.preventDefault();

            this.eventBus.emit('signup:removeEventListeners');
            this.eventBus.emit(Events.LoginPage.Render);
        };

        form?.addEventListener(('submit'), formHandler);

        aTag?.addEventListener(('click'), aTagHandler);
    }
}
