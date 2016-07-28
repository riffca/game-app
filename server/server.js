"use strict";
let express = require('express');

//
//D A T A B A S E
//
/*let mongoose = require('mongoose');

function timeStampsPlugin(schema, options) {
    schema.add({
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
    });
    schema.pre('save', function(next) {
        this.upadtedAt = Date.now();
        next();
    });

    if (options && options.index) {
        schema.path('upadatedAt').index(options.index);
    }
}
mongoose.Promise = global.Promise;
mongoose.plugin(timeStampsPlugin);
mongoose.connect('localhost:27017', err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Database connected');
});*/

//
//E X P R E S S 
//
let app = new express();

//P A R S E  B O D Y
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

//L O G G I N G
//http://stackoverflow.com/questions/23494956/how-to-use-morgan-logger

let debug = require('debug')('http');

let interceptor = require('express-interceptor');
let finalInterceptor = interceptor((req, res) => {
    return {
        isInterceptable() {
            debug(req.method + ' ' + req.url);
            debug({data: req.body});
        },
        intercept(body, send) {}
    };
});
app.use(finalInterceptor);

//S T A T I C
app.use(express.static(__dirname + '/public'));
//A P I

/*
let userApi = require('./model/user.api')(express);
app.use('/api/user', userApi);
let postApi = require('./model/post')(express);
app.use('/api/post',postApi);
let messageApi = require('./model/message')(express);
app.use('/api/message', messageApi);
let projectApi = require('./model/project')(express);
app.use('/api/project', projectApi);
*/


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let config = require('./config');

app.listen(config.port, () => {
    console.log('Server started at port ' + config.port);
});
