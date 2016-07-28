"use strict";
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;
let AccountSchema = mongoose.Schema({

	active: {
		type: Boolean,
		default: false
	},
	owner: {type: ObjectId, ref: 'User'},
    messages: [{
        type: ObjectId,
        ref: 'Message'
    }],
    posts: [{
        type: ObjectId,
        ref: 'Post'
    }], 
    projects: [{
        type: ObjectId,
        ref: 'Project'
    }]
});

let Account = mongoose.model('Account',AccountSchema);

module.exports = Account;