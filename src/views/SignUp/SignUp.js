import { APPLICATION } from '../../main.js';
import { BaseView } from '../BaseView/BaseView.js';

/** Class representing a signup page view. */
export class SignUpView extends BaseView {
    /**
     * Create a signup page view.
     * @param {EventBus} eventBus
     * @param {Object} - Parameters for render signup view.
     */
    constructor(eventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.eventBus.on('signup:render', this.render);
    }

    /**
     * Render html signup page from pug template.
     */
    render = () => {
        const template = puglatizer.views.SignUp.SignUp();
        APPLICATION.innerHTML = template;
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
                'signup:signUpUser',
                form,
                document?.getElementById('login').value,
                document?.getElementById('email').value,
                document?.getElementById('password').value,
                document?.getElementById('confirmPassword').value
            );
        };

        const aTagHandler = (event) => {
            event.preventDefault();

            this.eventBus.emit('signup:removeEventListeners');
            this.eventBus.emit('login:render');
        };

        form?.addEventListener(('submit'), formHandler);

        aTag?.addEventListener(('click'), aTagHandler);

        const removeEventListeners = () => {
            form?.removeEventListener(('submit'), formHandler);
            aTag?.removeEventListener(('click'), aTagHandler);
        };

        this.eventBus.on('signup:removeEventListeners', removeEventListeners);
    }
}
