"use strict";
//app config
let config = require('./config');

//needs
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

/*
/*L O G G I N G
*/

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
    //Logging
    let debug = require('debug')('http');
    let interceptor = require('express-interceptor');
    let finalInterceptor = interceptor((req, res) => {
        return {
            isInterceptable() {
                debug(req.method + ' ' + req.url);
                debug({ data: req.body });
            },
            intercept(body, send) {}
        };
    });
    app.use(finalInterceptor);

    //Webpack
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}


/**
/*
/*Socket Config
/*
*/

let socket = require('./socket/logic');
let socketLogic = new socket(io);
socketLogic.start();

/**
/*
/*Server config
/*
*/
//P A R S E  B O D Y
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

//S T A T I C S 
app.use(express.static(__dirname + '/public'));


//A P P  A P I
app.post('/api/game/create', (req, res) => {
    //check if room exists
    let roomExists;
    socketLogic.rooms.forEach(room => {
        if (room.name === req.body.room.name) {
            roomExists = true;
        }
        console.log(room);
    });
    if (roomExists) {
        res.send({
            success: false,
            message: 'Please choose another game name.'
        });
        return;
    }
    res.send({
        success: true,
        message: 'Correct game name.'
    });
});

app.get('/api/game/join', (req, res) => {

    let freeRooms = socketLogic.filterRooms();
    if (!freeRooms.length) {
        res.send('No games');
        return;
    }
    res.send(freeRooms);

});

app.post('/api/game/play', (req, res) => {
    res.send('ок');
});

//I N D E X  H T M L
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


/*
/*S T A R T  S E R V E R
*/

http.listen(config.port, () => {
    console.log('Server started at port ' + config.port);
});
