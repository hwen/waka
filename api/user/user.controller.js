/**
 * Created by hwen on 15/12/12.
 */

'use strict';
var invokeResult = require('../../components/invoke_result'),
    User = require('./user.model'),
    log = require('../../components/util/log');



var validationError = function(res, err) {
    return res.json(422, err);
};

// get list of users
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) {
            return res.send(500, err);
        }
        res.json(invokeResult.success(users));
    });
};

//create a user
exports.create = function(req, res) {
    User.find({
        $or: [{
            username: req.body.username
        }, {
            email: req.body.email
        }]
    }).exec(function(err, users) {
        if (err) {
            return res.json(invokeResult.failure(err, 'create user error'))
        }
        if (users.length > 0) { //user existed
            var user = users[0];
            if (user.username === req.body.username) {
                return res.json(invokeResult.failure('username', 'username already existing'));
            }
            if (user.email === req.body.email) {
                return res.json(invokeResult.failure('email', 'email has been registered'));
            }
            return res.json(invokeResult.failure('username', 'can not be created'));
        }
        var newUser = new User(req.body);
        newUser.password = newUser.encrytPassword(newUser.password);
        newUser.save(function(err, user) {
            if (err) {
                return validationError(res, err);
            }
            req.session.username = newUser.username;
            req.session.name = newUser.name;
            req.session.email = newUser.email;
            return res.json(invokeResult.success(newUser, 'signup success!'));
        });
    });
};

exports.login = function(req, res) {
    log.out(req.body);
    User.find({
        $or: [{
            username: req.body.username
        }, {
            email: req.body.email
        }]
    }).exec(function(err, users) {
        if (err) {
            return res.json(invokeResult.failure(err, 'program error'));
        }
        if (users.length == 0) {
            return res.json(invokeResult.failure('user', 'user not found!'));
        }
        var user = users[0];
        log.out(users);
        if (user.authenticate(req.body.password)) {
            req.session.username = req.body.username;
            req.session.name = user.name;
            req.session.email = user.email;
            return res.json(invokeResult.success(user, 'login success'));
        }
        return res.json(invokeResult.failure('password', 'password wrong!'));
    });
};

exports.logout = function(req, res) {
    req.session.username = '';
    req.session.name = '';
    req.session.email = '';
    return res.json(invokeResult.success('', 'logout success'));
};

exports.hello = function(req, res) {
    res.send('request get success: api/user/hello');
};