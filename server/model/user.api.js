"use strict";
let User = require('./user');
let Account = require('./account');
let auth = require('../middleware/auth');

//A P I
module.exports = function(express) {
    let api = express.Router();

    /**
    /*
    /*C R E A T E  U S E R  A C C O U N T
    /*
    */

    //public
    api.post('/create-account', (req, res) => {
        let user = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });
        user.save(err => {
            if (err) {
                res.json({
                    error: err,
                    message: "Пользователь с таким @email уже существует",
                    success: false
                });
                return;
            }
            auth.createToken(user)
                .then(token => {
                    res.json({
                        success: true,
                        message: "Новый аккаут успешно создан",
                        token: token,
                        user: user
                    });
                });
        });
    });
    //activate account
/*    api.get('/activate-account', (req, res) => {
        Account.create({
            owner: user._id
        }).then(account => {});
    });*/

    /**
    /*
    /*L O G I N  U S E R
    /*
    */
    api.post('/login-account', (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            //выбираем name username password чтобы передать их дальше
            .select('name username email password')
            .exec((err, user) => {
                if (err) throw err;
                if (!user) {
                    res.send({
                        message: "Ошибка! Некорректные данные.",
                        user: user,
                        success: false
                    });
                    return;
                } else if (user) {
                    let password = req.body.password;
                    user.comparePassword(password).then(answer => {
                        if (!answer) {
                            res.send({
                                message: "Ошибка! Неверный пароль.",
                                success: false,
                                user: {
                                    id: 1,
                                    username: 'unknown',
                                    email: 'unknown'
                                }
                            });
                            return;
                        } else {
                            auth.createToken(user).then(token => {
                                res.json({
                                    success: true,
                                    message: "Успешный вход в приложение",
                                    token: token
                                });
                            });
                        }
                    });
                }
            });
    });

    /**
    /*
    /*G E T T E R S 
    /*
    */
    api.get('/get-all-users', (req,res)=>{
        User.find()
        .limit(10)
        .sort({createdAt: -1})
        .then(users=>{
            res.json(users);
        });
    });

    //auth
    api.use(auth.verifyToken);

    api.get('/get-auth-user', (req, res) => {
        res.json({
            success: true,
            user: res.decodedToken
        });
    });


    /**
    /*
    /*M A N I P U L A T E
    /*
    */
    api.post('/updateCurrentUser', (req, res) => {
        User.findOne(req.body.userId)
            .then(user => {
                user.update({
                    username: req.body.username,
                    age: req.body.age,
                }).then(modefiedUser => {
                    res.json({
                        success: true,
                        message: 'User has been modefied',
                        modefiedUser: modefiedUser
                    });
                });
            });
    });
    return api;
};
