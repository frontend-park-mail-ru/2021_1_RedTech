/** Class representing a signup page view. */
export class SignUpView {
    /**
     * Create a signup page view.
     * @param {HTMLElement} parent - Parent of signup view in DOM.
     * @param {Object} data - Parameters for render signup view.
     */
    constructor({
                    parent = document.body,
                    data = {},
                } = {}) {

        this._parent = parent;
        this._data = data;
    }

    /**
     * Render html signup page from pug template to parent.
     */
    render() {
        const template = puglatizer.SignUp.SignUp(this._data)
        this._parent.innerHTML = template;
    }
}
