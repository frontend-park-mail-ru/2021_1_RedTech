import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing a login page view. */
export class LogInView extends BaseView {
    /**
     * Create a login page view.
     * @param {Object} - Parameters for render login view.
     * @param {EventBus} eventBus - Global Event Bus.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('login:render', this.render);
    }

    /**
     * Render html login page from pug template.
     */
    render = () => {
        const template = puglatizer.views.LogIn.LogIn();
        APPLICATION.innerHTML = template;
        this.setEventListeners();
    }

    /**
     * Set event listeners.
     */
    setEventListeners = () => {
        const [form] = document.getElementsByTagName('form');
        const [aTag] = document.getElementsByClassName('have-acc__link');

        const formHandler = (event) => {
            event.preventDefault();
            this.eventBus.emit(
                'login:loginUser',
                form,
                document.getElementById('email').value,
                document.getElementById('password').value
            );
        };

        const aTagHandler = (event) => {
            event.preventDefault();
            this.eventBus.emit('login:removeEventListeners');
            this.eventBus.emit('signup:render');
        };

        form?.addEventListener(('submit'), formHandler);

        aTag?.addEventListener(('click'), aTagHandler);

        const removeEventListeners = () => {
            form?.removeEventListener(('submit'), formHandler);
            aTag?.removeEventListener(('click'), aTagHandler);
        };

        this.eventBus.on('login:removeEventListeners', removeEventListeners);
    }
}
