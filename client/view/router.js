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
    //not found page
    '*': {
        component: {
            template: `
            <style>
            .not-found { 
                position: relative; 
                top:50%; 
                taransform:translateY(-50%);
            }
            </style>
            <h1 class="not-found">Page not found</h1>`
        }
    },
};
