import { eventBus } from './eventBus.js';
import { Events } from '../consts/events.js';
import Routes from '../consts/routes.js';

class Router {
    constructor(app) {
        this.application = app;
        this.routes = [];
        this.currentController = null;

        eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
        eventBus.on(Events.RedirectBack, this.back.bind(this));
        eventBus.on(Events.RedirectForward, this.forward.bind(this));
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

    onPathChanged(data) {
        this.go(data.path, data || {});
    }

    start() {
        window.addEventListener('popstate', () => {
            this.go(window.location.pathname + window.location.search);
            console.log(window.location.pathname + window.location.search);
        });

        this.go(window.location.pathname + window.location.search);
        console.log(window.location.pathname + window.location.search);
    }

    getRouteData(path) {
        let targetController = null;
        const result = this.getParam(path);

        this.routes.forEach(({path, controller}) => {
            const res = result.path.match(path);

            if (res) {
                targetController = controller;
            }
        })

        return {
            controller: targetController,
            path: {
                path: result.path,
                resourceId: +result.pathParams,
            },
            query: result.getParams,
        }
    }

    getParam(path) {
        const parsedURL = new URL(window.location.origin + path);

        const getParams = parsedURL.searchParams;
        let resultPath = parsedURL.pathname;
        console.log(resultPath);

        return {
            path: resultPath,
            pathParams: null,
            getParams: getParams,
        };
    }

    go(path, data = {}) {
        const routeData = this.getRouteData(path);
        data = {...data, ...routeData};

        if (this.currentController === routeData.controller && !routeData.query) {
            console.log('Тот же контроллер');
            return;
        }

        if (this.currentController) {
            console.log('Что-то эдакое');
        }

        this.currentController = routeData.controller;

        if (!this.currentController) {
            path = Routes.LoginPage;
            this.currentController = this.getRouteData(path).controller;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }

        console.log(data);
        console.log('Нужен switch on');
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
