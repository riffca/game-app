'use strict';
let auth = require('../middleware/auth');

let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;

let ProjectSchema = mongoose.Schema({
    creator: { type: ObjectId, ref: 'User' },
    title: String,
    description: String
});

let Project = mongoose.model('Project', ProjectSchema);

module.exports = function(express) {

    let api = express.Router();

    /**
    /*
    /*G E T T E R S
    /*
    */

    //public
    api.get('/get-all-projects', (req, res) => {
        Project
            .find()
            .populate('creator', '')
            .select('title description createdAt updatedAt')
            .limit(10)
            .sort({ createdAt: -1 })
            .then(doc => {
                res.json(doc);
            });
    });
    api.get('/get-project/:id', (req, res) => {
        Project
            .findById(req.params.id)
            .populate('creator', 'email')
            .select('title description createdAt updatedAt')
            .then(doc => {
                res.json(doc);
            });
    });

    //auth
    api.user(auth.verifyToken);
    api.get('/get-all-user-projects/:userId', (req, res) => {
        Project
            .find({ creator: req.params.userId })
            .populate('creator', 'username')
            .select('creator title description createdAt updatedAt')
            .sort({ createdAt: -1 })
            .limit(5)
            .then(docs => {
                res.json(docs);
            });
    });

    /**
    /*
    /*C R E A T E
    /*
    */
    api.post('/create-project', (req, res) => {
        Project.create({
            creator: req.body.creator,
            title: req.body.title,
            description: req.body.description
        }).then(doc => {
            res.json(doc);
        });
    });


    /**
    /*
    /*M A N I P U L A T E
    /*
    */

    api.put('/update-project/:id', (req, res) => {
        Project.findOneAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
        }).then(doc => {
            res.json(doc);
        });
    });

    api.delete('/delete-project/:id', (req, res) => {
        Project.remove(req.params.id).then(doc => {
            res.json(doc);
        });
    });

    return api;

};
