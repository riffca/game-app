'use strict';
let auth = require('../middleware/auth');

let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;


let PostSchema = mongoose.Schema({
    author: {type: ObjectId, ref: 'User'},
    title: String,
    text: String
});

let Post = mongoose.model('Post', PostSchema);


module.exports = function(express) {


    let api = express.Router();

    /**
    /*
    /*G E T T E R S 
    /*
    */

    //public
    api.get('/get-all-posts', (req, res) => {
        Post
        .find()
        .populate('author','usename email')
        .limit(10)
        .select('author title text createdAt updatedAt')
        .then(docs=>{
            res.json(docs);
        });
    });

    api.get('/get-post/:id', (req, res) => {
        Post
        .findById(req.params.id)
        .populate('author', 'email')
        .select('author title text createdAt updatedAt')
        .then(doc=>{
            res.json(doc);
        });
    });

    api.get('/get-all-user-posts/:authorId', (req, res) => {
        Post
        .find({author: req.params.authorId})
        .populate('author')
        .select('author title text createdAt updatedAt')
        .limit(10)
        .sort({createdAt: -1})
        .then(docs=>{
            res.json(docs);
        });
    });

    
    /**
    /*
    /*C R E A T E
    /*
    */
    //auth
    api.use(auth.verifyToken);
    api.post('/create-post', (req, res) => {
        Post.create({
            author: req.body.author,
            title: req.body.title,
            text: req.body.text
        }).then(doc=>{
            res.send(doc);
        });
    });

    /**
    /*
    /*M A N I P U L A T E
    /*
    */
    api.put('/update-post/:id', (req, res) => {
        Post.findOneAndUpdate(req.params.id, {
            title: req.body.title,
            text: req.body.text
        }).then(doc => {
            res.json(doc);
        });
    });

    api.delete('/delete-post/:id', (req, res) => {
        Post.remove(req.params.id).then(doc=>{
            res.json({
                message: "Post deleted",
                doc: doc
            });
        });
    });

    return api; 
};
