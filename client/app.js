//debug socket.io

if (NODE_ENV === 'development') {
    localStorage.debug = 'socket.io-client:socket';
}

/**
/*
/*Style defaults
/*
*/
import './style.scss';
/**
/*
/*Dependecies
/*
*/
import vueRouter from 'vue-router';
Vue.use(vueRouter);

import vueAsyncData from 'vue-async-data';
Vue.use(vueAsyncData);

import vueResource from 'vue-resource';
Vue.use(vueResource);
/**
/*
/*Interceptors
/*
*/
import interceptors from 'service/interceptors';
Vue.http.interceptors.push(interceptors);
/**
/*
/*Start App
/*
*/
let rootComponent = Vue.extend(require('root/root.vue'));
let router = new vueRouter({
    history: NODE_ENV === 'development' ? false : true
});
import routeMap from 'view/router';
router
    .map(routeMap)
    .start(rootComponent, '#application', () => {
        logger('Client Routing active');
    });
