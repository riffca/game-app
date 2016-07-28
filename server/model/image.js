"use strict";

let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let AlbumSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 400
    },
    images: [{
            type: ObjectId,
            ref: 'Image'
        }],
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

let ImageSchema = mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    mini: {
        type: String,
        required: true
    },
    positionIndex: Number,
    album: {
        type: ObjectId,
        ref: 'Album'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});
let Album = mongoose.model('Album', AlbumSchema);
let Image = mongoose.model('Image', ImageSchema);
const upload =  require('multer')({
	dest: __dirname + '../public/uploads'
});


module.exports = (express) => {
    let api = express.Router();
    api.post('/uploadOneImage', (req, res) => {


    });
    api.post('/uploadImages', (req, res) => {

    });

    return api;
};
