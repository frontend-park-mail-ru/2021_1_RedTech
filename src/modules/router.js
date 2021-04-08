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
            console.log(window.location.pathname + window.location.search);
            this.go(window.location.pathname + window.location.search);
        });

        console.log(window.location.pathname + window.location.search);
        this.go(window.location.pathname + window.location.search);
    }

    getRouteData(path) {
        let targetController = null;
        const result = this.getParam(path);

        this.routes.forEach(({path, controller}) => {
            console.log(path, controller);
            const res = result.path.match(path);

            if (res) {
                targetController = controller;
                console.log("RESULT ", targetController);
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
        let pathParams = null;
        let resultPath = parsedURL.pathname;
        console.log('params', getParams);

        if (getParams && getParams.has('mid')) {
            resultPath = `/movie/${getParams.get('mid')}`;
            pathParams = getParams.get('mid');
        }

        return {
            path: resultPath,
            pathParams: pathParams,
            getParams: getParams,
        };
    }

    go(path, data = {}) {
        console.log('GO');
        const routeData = this.getRouteData(path);
        data = {...data, ...routeData};

        if (this.currentController === routeData.controller && !routeData.query) {
            console.log('Тот же контроллер');
            return;
        }

        if (this.currentController) {
            console.log('Проверка');
        }

        this.currentController = routeData.controller;

        if (!this.currentController) {
            path = Routes.HomePage;
            this.currentController = this.getRouteData(path).controller;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }

        console.log(data);
        console.log('Нужен switch on');
        this.currentController.view.render();
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
