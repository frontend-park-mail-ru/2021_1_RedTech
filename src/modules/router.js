class Router {
    constructor(app) {
        this.application = app;
        this.routes = [];
    }

    /**
     * @function
     * Регистрирует путь - добавляет в массив роутеров путь
     * @return {this}
     * @param {string} path - Путь, который нужно добавить
     * @param {Controller} controller - Контроллер, который соответствует этому пути
     */
    register(path, controller) {
        let routeObject = {
            path,
            controller,
        };

        this.routes.push(routeObject);

        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            // this.go(window.location.pathname + window.location.search);
            console.log(window.location.pathname + window.location.search);
        });

        // this.go(window.location.pathname + window.location.search);
        console.log(window.location.pathname + window.location.search);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
