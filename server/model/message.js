'use strict';
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;

let MessageSchema = mongoose.Schema({
    toUser: {type: ObjectId, ref: 'User'},
    fromUser: {type: ObjectId, ref: 'User'},
    text: String,
    checked: {type: Boolean, default: false}
});

let Message = mongoose.model('message', MessageSchema);

module.exports = function(express) {
    
    let api = express.Router();

    api.post('/create-message', (req, res) => {
        Message.create({
            toUser: req.body.toUserId,
            fromUser: req.body.fromUserId,
            text: req.body.text,
        }).then(doc=>{
            res.send(doc);
        });
    });

    api.get('/get-message/all', (req, res) => {
        Message
        .find()
        .skip(10)
        .limit(10)
        .select('fromUser toUser text createdAt updatedAt checked')
        .then(doc=>{
            res.json(doc);
        });
    });

    api.get('/get-message/:id', (req, res) => {
        Message
        .findById(req.params.id)
        .populate('toUser','email')
        .populate('fromUser', 'email')
        .select('fromUser toUser  text createdAt updatedAt checked')
        .then(doc=>{
            res.json(doc);
        });
    });


    api.use(function(req,res,next){
        console.log('Warning! Admin actions..');
        next();
    });

    api.delete('/delete-message/:id', (req, res) => {
        Message.remove(req.params.id).then(doc=>{
            res.json(doc);
        });
    });

    return api;

};
