import {APPLICATION, homePage} from '../../main.js';
import {SignUpView} from '../SignUp/SignUp.js';
import {ProfileView} from '../Profile/Profile.js';
import {LogInView} from '../LogIn/LogIn.js';
// import {HomeComponent} from '../HomeView/HomeView.js';


export class DetailComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.DetailView.DetailView(this._data);
        this._parent.innerHTML = template;

        const [profileLink] = document.getElementsByClassName('js-profile-page');
        profileLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const profileView = new ProfileView();
            profileVeiew.render();
        });

        const [aMain] = document.getElementsByClassName('homePage');
        aMain?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            homePage();
        });

        const [aLogin] = document.getElementsByClassName('js-login-page');
        aLogin?.addEventListener(('click'), event => {
            event.preventDefault();

            localStorage.removeItem('ID');

            APPLICATION.innerHTML = '';
            const logInView = new LogInView();
            logInView.render();
        });

        const [aLogout] = document.getElementsByClassName('js-logout-page');
        aLogout?.addEventListener(('click'), event => {
            event.preventDefault();

            localStorage.removeItem('ID');

            APPLICATION.innerHTML = '';
            const logInView = new LogInView();
            logInView.render();
        });
    }
}
