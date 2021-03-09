import {APPLICATION} from "../../main.js";
import { SignUpView } from "../SignUp/SignUp.js";

export class HomeComponent {
    constructor({
        parent = document.body,
        data = [],
    } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.HomeView.HomeView();
        //console.log(template())
        this._parent.innerHTML = template;

        const [aTag] = document.getElementsByClassName('button__logout')

        aTag?.addEventListener(('click'), event => {
            event.preventDefault();

            APPLICATION.innerHTML = '';

            const signUpView = new SignUpView();
            signUpView.render();
        });
    }
}


