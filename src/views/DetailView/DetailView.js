import {APPLICATION, homePage} from '../../main.js';
import {SignUpView} from '../SignUp/SignUp.js'; // eslint-disable-line
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
        //console.log(template())
        this._parent.innerHTML = template;

        const profileLink = document.getElementById('profilePage');
        profileLink?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new ProfileView();
            signUpView.render();
        });

        const loginPage = document.getElementById('loginPage');
        loginPage?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const logInView = new LogInView();
            logInView.render();
        });

        const [aMain] = document.getElementsByClassName('homePage');
        aMain?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            homePage();
        });

        const logoutPage = document.getElementById('logoutPage');
        logoutPage?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            localStorage.removeItem('ID');
            const logInView = new LogInView();
            logInView.render();
        });

        const [aLogout] = document.getElementsByClassName('logoutPage');
        aLogout?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';
            homePage();
        });
    }
}
