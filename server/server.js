"use strict";
//config
let config = require('./config');
//needs
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
//let uuid = require('node-uuid');
/**
/*
/*Socket Config
/*
*/
io.on('connection', socket => {
    //connection
    console.log('user with id "' + socket.id + '" connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //create room
    socket.on('create room', room => {
        socket.join(room);
        io.to(room).emit('create room', 'game created');
    });

    //chat messages
    socket.on('write message', data => {
        io.to(data.room).emit('get message', {
            msg: data.message,
            username: data.username
        });
    });

    //game actions
    socket.on('game action', data => {
        io.to(data.room).emit('action done', {
            action: data.action,
            index: data.index,
            parentIndex: data.parentIndex
        });
    });
});

/**
/*
/*Server config
/*
*/
//P A R S E  B O D Y
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

//L O G G I N G
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

//S T A T I C S 
app.use(express.static(__dirname + '/public'));

// W E B P A C K
if (process.env.NODE_ENV === config.NODE_ENV) {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

//A P P  A P I
app.post('/api/game/create', (req, res) => {
    res.send('ок');
});

app.get('/api/game/get-rooms',(req,res)=>{
    let rooms = io.sockets.adapter.rooms;
    console.log(rooms);
    res.send('rooms');
});

app.post('/api/game/join', (req, res) => {
    res.send('ок');
});
app.post('/api/game/play', (req, res) => {
    res.send('ок');
});

//I N D E X . H T M L
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//S T A R T  S E R V E R

http.listen(config.port, () => {
    console.log('Server started at port ' + config.port);
});
