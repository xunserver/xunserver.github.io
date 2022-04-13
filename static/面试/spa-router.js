const route = [
    {
        title: '测试',
        url: '/test',
    },
    {
        title: '地址',
        url: '/test1'
    }
]

class HashRouter {
    routes;

    constructor(routes) {
        window.addEventListener('hashchange', this.activeRoute())
        this.init(routes)
    }

    init(routes) {
        this.routes = routes.reduce((acc, cur) => {
            acc[cur.url] = cur;
            return acc
        }, {})
    }

    activeRoute() {
        const url = location.hash;
        const targetRoute = this.routes[url];
        targetRoute && console.log(targetRoute.title);
    }

    push(url) {
        const targetRoute = this.routes[url];
        if(!targetRoute) return
        location.hash = `#${targetRoute.url}`
        console.log(targetRoute.title);
    }
}

class HistoryRouter {
    constructor(routes) {
        this.routes = routes.reduce((acc, cur) => {
            acc[cur.url] = cur
            return acc
        })
    }

    push(url) {
        const route = this.routes[url];
        if(!route) return; 
        history.pushState(null, route.title, route.url)
    }
}