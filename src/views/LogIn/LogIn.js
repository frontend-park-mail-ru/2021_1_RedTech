import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

import LogIn from './LogIn.pug';
import Events from '../../consts/events.js';

/** Class representing a login page view. */
export class LogInView extends BaseView {
    /**
     * Create a login page view.
     * @param {Object} - Parameters for render login view.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on(Events.LoginPage.Render, this.render);
    }

    /**
     * Render html login page from pug template.
     * @param {Object} data - data from router.
     */
    render = (data) => {
        const template = LogIn(data);
        APPLICATION.innerHTML = template;
        this.setEventListeners(data?.returnpath);
    }

    /**
     * Set event listeners.
     * @param {String} returnpath - path of returning for router.
     */
    setEventListeners = (returnpath) => {
        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const formHandler = (event) => {
            event.preventDefault();
            this.eventBus.emit(
                Events.User.Login,
                form,
                document.getElementById('email').value,
                document.getElementById('password').value,
                returnpath
            );
        };

        const aTagHandler = (event) => {
            event.preventDefault();
            this.eventBus.emit('login:removeEventListeners');
            this.eventBus.emit(Events.SignupPage.Render, { returnpath });
        };

        form?.addEventListener(('submit'), formHandler);

        aTag?.addEventListener(('click'), aTagHandler);
    }
}
