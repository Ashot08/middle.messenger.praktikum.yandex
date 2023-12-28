import Block from './Block';
import Route from './Route';

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private redirects: Record<string, string> = {};

  private history = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.redirects = {};
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  useRedirect(from: string, to: string) {
    this.redirects[from] = to;
  }

  removeRedirect(path: string) {
    delete this.redirects[path];
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    if (pathname in this.redirects) {
      pathname = this.redirects[pathname];
    }
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Route) => route.match(pathname));
  }

  getRedirects() {
    return this.redirects;
  }
}

export default Router;
