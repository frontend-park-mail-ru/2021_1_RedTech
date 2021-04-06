/** Abstract class representing base view. */
export class BaseView {
    /**
     * Create a home page view.
     * @param {EventBus} eventBus - Global Event Bus.
     * @param {Object} - Parameters for view.
     */
    constructor(eventBus, { data = {} } = {}) {
        this._data = data;
        this.eventBus = eventBus;
    }
}
