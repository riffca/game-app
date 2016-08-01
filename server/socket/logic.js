"use strict";

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

class SocketLogic {

	constructor(io){
		/**
		/*working with custom socket rooms
		*/
		this.rooms = [];
		this.io = io;
	}

	start(){
		let io = this.io;
		io.on('connection', socket => {
		    //on connection send to client socketId 
		    socket.emit('get user id', socket.id);

		    //on disconnect delete room from array if it exists
		    socket.on('disconnect', () => {
		        this.leaveRoomLogic(socket);
		        console.log('%s\n%s:%j', 'user disconnected', 'rooms', this.rooms);
		    });

		    //Leave room
		    socket.on('leave room', () => {
		        this.leaveRoomLogic(socket);
		    });

		    //create room
		    socket.on('create room', data => {

		        this.rooms.push(new Room(data.room));

		        socket.join(data.room.name);
		        io.emit('room created', {
		            message: 'room sucessfully created'
		        });

		        //update view with rooms
		        io.emit('new rooms',this.rooms);

		    });
		    //Get gamePlay users

		    socket.on('join room', data => {
		        /**
		        /*working with custom socket rooms
		        */
		        this.rooms.forEach(room => {
		            if (room.name === data.room) {
		                room.setVisitor(socket.id);
		            }
		        });

		        socket.join(data.room);
		        io.emit('join game', {
		            username: data.username
		        });
		        io.emit('new rooms',this.filterRooms());

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

	}

	//leave room logic
	leaveRoomLogic(socket) {
		//need to fix logic with visitor not
		let rooms = this.rooms;
		let io = this.io;

		if(!rooms.length) return;

	    rooms.forEach(room => {

	        if (room.visitor === socket.id) {
	            socket.leave(room.name);
	            //update view with creator gameplay
	            io.emit('visitor disconnected');
	            //update view with chat messages
	            io.emit('delete chat messages');
	            //update view with rooms list
	            this.UpdateFreeRoomsList(room);
	        }
	        if (room.creator === socket.id) {

	            socket.leave(room.name);
	            rooms.splice(rooms.indexOf(room), 1);
	            //update view with visitor gameplay
	            io.emit('creator disconnected');

	            this.UpdateFreeRoomsList();

	        }
	    });
	}
	//update view with free rooms
	UpdateFreeRoomsList(visitorRoom){
		 this.io.emit('new rooms',this.filterRooms(visitorRoom));
	}
	//search room without visitor
	filterRooms(vistorLeaveRoom){
	    if(vistorLeaveRoom){
	        vistorLeaveRoom.visitor = '';
	    }
	    return this.rooms.filter(room=>{
	        return room.visitor === '';
	    });
	}
}

module.exports = SocketLogic;