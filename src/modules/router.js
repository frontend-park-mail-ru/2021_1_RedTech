import { eventBus } from './eventBus.js';
import { Events } from '../consts/events.js';
import Routes from '../consts/routes.js';

export function getPathArgs(path, template) {
    if (!template) return {};
    const splitPath = path.split('/');

    // noinspection UnnecessaryLocalVariableJS
    const pathArgs = template
        .split('/')
        .reduce((args, propName, index) => {
            if (propName.startsWith(':')) {
                args[propName.slice(1)] = splitPath[index];
            }

            return args;
        }, {});

    return pathArgs;
}

class Router {
    constructor(app) {
        this.application = app;
        this.routes = [];
        this.currentController = null;

        eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
        eventBus.on(Events.RedirectBack, this.back.bind(this));
        eventBus.on(Events.RedirectForward, this.forward.bind(this));

        document.getElementById('app').addEventListener('click', (e) => {
            if (e.target.dataset.routlink) {
                e.preventDefault();
                this.changeRoute(e.target.dataset.routlink);
            }
        });

        this.application.addEventListener('click', (e) => {
            const target = e.target;
            const closestLink = target.closest('a');

            if (closestLink instanceof HTMLAnchorElement) {
                e.preventDefault();

                const data = {...closestLink.dataset};

                data.path = closestLink.getAttribute('href');

                eventBus.emit(Events.PathChanged, data);
            }
        });
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
        });

        this.go(window.location.pathname + window.location.search);
    }

    getRouteData(path) {
        let targetController = null;
        const result = this.getParam(path);

        this.routes.forEach(({path, controller}) => {
            const res = result.path.match(path);

            if (res) {
                targetController = controller;
            }
        });

        return {
            controller: targetController,
            data: result.data,
            path: {
                path: result.path,
                resourceId: +result.pathParams,
            },
        };
    }

    getParam(path = '/') {
        let data = {};
        let isFilm = true;
        const parsedURL = new URL(window.location.origin + path);
        let pathParams = null;
        let resultPath = parsedURL.pathname;

        if (path == Routes.MoviesPage || path.match(Routes.MoviesGenrePage)) {
            data.isFilm = true;
            isFilm = true;
        }

        if (path == Routes.SeriesPage || path.match(Routes.SeriesGenrePage)) {
            data.isFilm = false;
            isFilm = false;
        }

        return {
            path: resultPath,
            pathParams: pathParams,
            data,
            isFilm,
        };
    }

    go(path = '/', data = {}) {
        const routeData = this.getRouteData(path);
        data = {...data, ...routeData};

        this.currentController = routeData.controller;

        if (!this.currentController) {
            path = Routes.HomePage;
            this.currentController = this.getRouteData(path).controller;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }

        console.log(data);
        this.currentController.view.render(data);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export default Router;
