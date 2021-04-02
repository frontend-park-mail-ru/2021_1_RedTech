class EventBus {
    constructor() {
        this._listeners = {};
    }

    on(event, callback) {
        (this._listeners[event] || (this._listeners[event] = [])).push(callback);
    }

    off(event, callback) {
        this._listeners[event] = this._listeners[event]
            .filter(function (listener) { return listener !== callback; });
    }

    emit(event, ...data) {
        this._listeners[event]?.forEach((listener) => {
            listener(...data);
        });
    }
}

export default new EventBus();
