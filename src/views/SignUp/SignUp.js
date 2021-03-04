export class SignUpView {
    constructor({
                    parent = document.body,
                    data = {},
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.SignUp.SignUp(this._data)
        this._parent.innerHTML = template;
    }
}
