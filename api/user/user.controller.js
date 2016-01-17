/**
 * Created by hwen on 15/12/12.
 */

'use strict';
var InvokeResult = require('../../components/invoke_result'),
    Constant = require('../../config/constant'),
    User = require('./user.model');



var validationError = function(res, err) {
    return res.json(422, err);
};

// get list of users
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) {
            return res.send(500, err);
        }
        res.json(200, users);
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
            return res.json(InvokeResult.programException(err))
        }
        if (users.length > 0) { //user existed
            var user = users[0];
            if (user.username === req.body.username) {
                return res.json(InvokeResult.userExists());
            }
            if (user.email === req.body.email) {
                return res.json({
                    status: 8,
                    data: 'email has been registered'
                });
            }
            return res.json(InvokeResult.userExists());
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
            return res.json(InvokeResult.success());
        });
    });
};

exports.login = function(req, res) {
    // console.log('req--->');
    // console.log(req);
    User.find({
        $or: [{
            username: req.body.username
        }, {
            email: req.body.email
        }]
    }).exec(function(err, users) {
        if (err) {
            return res.json(InvokeResult.programException(err));
        }

        if (users.length === 0) {
            return res.json(InvokeResult.userNotFound());
        }
        var user = users[0];
        if (user.authenticate(req.body.password)) {
            req.session.username = req.body.username;
            req.session.name = user.name;
            req.session.email = user.email;
            return res.json(InvokeResult.success());
        }
        return res.json(InvokeResult.userNotFound());
    });
};

exports.logout = function(req, res) {
    req.session.username = '';
    req.session.name = '';
    req.session.email = '';
    return res.json(InvokeResult.success());
};

exports.hello = function(req, res) {
    console.log('what tff');
    res.send('POST request to the homepage');
};