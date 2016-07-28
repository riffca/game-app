let mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let BascketSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    users: [{ type: ObjectId, ref: 'User' }],
    albums: [{ type: ObjectId, ref: 'Album' }],
    posts: [{ type: ObjectId, ref: 'Post' }],
    messages: [{ type: ObjectId, ref: 'Mesage' }]
});

module.exports = function(express){

	let api = exporess.Router();



	return api;
};
