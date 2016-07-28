import tokenService from '../service/token';
//import Basket from './basket';

import Post from './post';
import Project from './project';
import Message from './message';

export default class User {
    constructor({
        id,
        username,
        email,
        auth = true,
    }) {
        this.id = id;
        this.username = username;
        this.wins = 0;
    }
}
