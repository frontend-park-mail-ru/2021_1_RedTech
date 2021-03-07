/** Class representing a login page view. */
export class ProfileView {
    /**
     * Create a profile page view.
     * @param {HTMLElement} parent - Parent of profile view in DOM.
     * @param {Object} data - Parameters for render profile view.
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
        const template = puglatizer.Profile.Profile(this._data)
        this._parent.innerHTML = template;
    }
}
