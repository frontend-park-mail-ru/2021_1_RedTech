export class LogInView {
    constructor({
                    parent = document.body,
                    data = {},
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = puglatizer.LogIn.LogIn(this._data)
        this._parent.innerHTML = template;
    }
}
