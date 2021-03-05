/** Class representing a login page view. */
export class LogInView {
    /**
     * Create a login page view.
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
     * Render html login page from pug template to parent.
     */
    render() {
        const template = puglatizer.LogIn.LogIn(this._data)
        this._parent.innerHTML = template;
    }
}
