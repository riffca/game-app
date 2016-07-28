import tokenService from 'service/token';
import authService from 'service/auth';

import User from './user';
/**
/*
/*О П И С А Н И Е  П Р И Л О Ж Е Н И Я
/*
*/
export default class App {

    constructor() {
        //создаем default юзера для приложения
        this.user = new User({
            id: '1',
            username: 'uknown'
        });
        this.created = Date.now();
    }
}
