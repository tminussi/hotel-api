var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function (req, res) {
    var username = req.body.username;
    console.log(username);
    var password = req.body.password;
    console.log(password);

    User
        .create({
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log('User has been created', user);
                res.status(201).json(user);
            }
        })
};

module.exports.login = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User
        .findOne({
            username: username
        }).exec(function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            }
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({username: user.username}, 's7ah3a', {expiresIn: 3600});
                    res.status(200).json({success: true, token: token});
                } else {
                    res.status(401).json('Unauthorized');
                }
            } else {
                res.status(401).json('Unauthorized');
            }
        });
};

module.exports.authenticate = function (req, res, next) {
    var headerExists = req.headers.authorization;
    let token;
    if (headerExists) {
        token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 's7ah3a', function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};