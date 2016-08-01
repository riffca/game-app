//let socket = require('socket.io-client')('localhost:3000');
//use that way to prevent change host path on production server;
let socket = io();

export default socket;