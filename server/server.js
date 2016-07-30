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
let socketRooms = [];

io.on('connection', socket => {
    //on connetction send to client socketId 
    socket.emit('get user id', socket.id);
    console.log('user with id "' + socket.id + '" connected');

    //on disconnect delete room from array if it exists
    socket.on('disconnect', () => {
        socketRooms.forEach(room => {
            if (room.creator === socket.id) {
                socketRooms.splice(socketRooms.indexOf(room), 1);
                console.log(socketRooms);
            }
        });
        console.log('%s\n%s:%j', 'user disconnected', 'socketRooms', socketRooms);
    });

    //create room
    socket.on('create room', data => {
        socketRooms.push(data.room);
        socket.join(data.room.name);
        io.emit('room created', { 
            message: 'room sucessfully created'
        });
        console.log('%s:%j', 'socketRooms', socketRooms);
    });
    socket.on('join room',data=>{
        io.emit('join game',{
            username: data.username
        });
    });


    //game actions
    socket.on('game action', data => {
        io.to(data.room.name).emit('action done', {
            action: data.action,
            index: data.index,
            parentIndex: data.parentIndex
        });
    });
    //chat messages
    socket.on('write message', data => {
        io.to(data.room).emit('get message', {
            msg: data.message,
            username: data.username
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
    //check if room exists
    let roomExists;
    socketRooms.forEach(room => {
         if (room.name === req.body.room.name) {
             roomExists = true;
         }
        console.log(room);
    });
    if(roomExists){
        res.send({
            success: false,
            message: 'please choose another game name'
        });
        return;
    } 
    res.send({
        success: true,
         message: 'correct game name'
    });  
});

app.get('/api/game/join', (req, res) => {
    if (!socketRooms.length) {
        res.send('No games');
        return;
    }
    res.send(socketRooms);
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
