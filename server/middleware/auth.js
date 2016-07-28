"use strict";

let jwt = require('jsonwebtoken');
let secretKey = require('../config').secretKey;

module.exports = {
    verifyToken(req, res, next) {
        let token = req.headers['x-access-token'];
        if (!token) {
            res.json({
                success: false,
                message: 'Ошибка! No Token Provided'
            });
            return;
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.json({
                    message: 'Ошибка! Bad Token Provided',
                    success: false,
                    error: err
                });
                return;
            }
            res.decodedToken = decoded;
            next();
        });
    },
    createToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email
            }, secretKey, {
                expiresIn: 24 * 31 + 'h'
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });

    }
};
