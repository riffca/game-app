"use strict";
//M O D E L
let mongoose = require('mongoose');
let AdminSchema = mongoose.schema({
	name: String,
	contact: String,
	login: Boolean
});

AdminSchema.methods.checkPassword = (req, res)=>{
	
};

let Admin = mongoose.model('Admin', AdminSchema);
//A P I
module.exports = function(express) {

    let api = express.Router();
    api.get('/admin', (req, res) => {
        res.json({
        	adminStatus: true,
            user: {
                name: 'riffca',
                contact: 'riffca@ya.ru',
                login: true,
                status: 'admin'
            }
        });
    });

    return api;

};
