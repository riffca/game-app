export default {
    //other
    '/': {
        name: 'index',
        component: require('router/index')
    },
    '/game': {
        name: 'game.root',
        component: require('router/game/game.root'),
        subRoutes: {
            '/': {
                name: 'gameIndex',
                component: require('router/game/routes/game.index')
            },
            '/create': {
                name: 'gameCreate',
                component: require('router/game/routes/game.create')
            },
            '/join': {
                name: 'gameJoin',
                component: require('router/game/routes/game.join')
            },
            '/play':{
                name: 'gamePlay',
                component: require('router/game/routes/game.play')
            }
        }
    },
    //not found
    '*': {
        component: {
            template: `<h1>Page not found</h1>`
        }
    },
};
