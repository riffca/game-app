"use strict";
//config
let config = require('./config');
//needs
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

/**
/*
/*Socket Config
/*
*/

//custom socket rooms
let socketRooms = [];

class Room {
    constructor(options) {
        this.name = options.name;
        this.creator = options.creator;
        this.visitor = '';
    }
    setVisitor(visitor) {
        this.visitor = visitor;
    }

}

//leave room logic
function leaveRoomLogic(socket) {
    socketRooms.forEach(room => {

        if (room.visitor === socket.id) {
            socket.leave(room.name);
            //update view with creator gameplay
            io.emit('visitor disconnected');
            //update view with chat messages
            io.emit('delete chat messages');
            //update view with rooms list
            io.emit('new rooms',filterRooms(room));
        }
        if (room.creator === socket.id) {
            socket.leave(room.name);
            socketRooms.splice(socketRooms.indexOf(room), 1);
            //update view with visitor gameplay
            io.emit('creator desconnected');
            //update view with rooms list
            io.emit('new rooms',filterRooms());
        }

    });
}

//search room without visitor
function filterRooms(vistorLeaveRoom){
    if(vistorLeaveRoom){
        vistorLeaveRoom.visitor = '';
    }
    return socketRooms.filter(room=>{
        return room.visitor === '';
    });
}

io.on('connection', socket => {

    //on connetction send to client socketId 
    socket.emit('get user id', socket.id);

    //on disconnect delete room from array if it exists
    socket.on('disconnect', () => {
        /**
        /*working with custom socket rooms
        */
        leaveRoomLogic(socket);
        console.log('%s\n%s:%j', 'user disconnected', 'socketRooms', socketRooms);
    });

    //Leave room
    socket.on('leave room', () => {
        /**
        /*working with custom socket rooms
        */
        leaveRoomLogic(socket);
    });

    //create room
    socket.on('create room', data => {
        /**
        /*working with custom socket rooms
        */
        socketRooms.push(new Room(data.room));

        socket.join(data.room.name);
        io.emit('room created', {
            message: 'room sucessfully created'
        });

        //update view with rooms
        io.emit('new rooms',socketRooms);

    });


    //Get gamePlay users
    socket.on('join room', data => {
        /**
        /*working with custom socket rooms
        */

        socketRooms.forEach(room => {
            if (room.name === data.room) {
                room.setVisitor(socket.id);
            }
        });

        socket.join(data.room);
        io.emit('join game', {
            username: data.username
        });
        io.emit('new rooms',filterRooms());

    });

    socket.on('get creator', data => {
        io.emit('get creator');
    });

    socket.on('send creator', data => {
        io.emit('send creator', {
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

    socket.on('player win', data => {
        socket.broadcast.to(data.room).emit('player win', data);
    });

    //chat messages
    socket.on('write message', data => {
        io.to(data.room).emit('get message', {
            text: data.text,
            username: data.username,
            css: data.css
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

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {

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
    /**
    /*working with custom socket rooms
    */
    socketRooms.forEach(room => {
        if (room.name === req.body.room.name) {
            roomExists = true;
        }
        console.log(room);
    });
    if (roomExists) {
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
    /**
    /*working with custom socket rooms
    */
    if (!socketRooms.length) {
        res.send('No games');
        return;
    }

    res.send(filterRooms());
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
