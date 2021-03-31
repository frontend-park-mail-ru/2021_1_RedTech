
class Controller {
}

class Router {
    constructor(app: HTMLElement) {
        this.application = app;
        this.routes = [];
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
