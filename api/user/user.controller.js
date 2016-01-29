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
                return res.json({
                    status:-1,
                    error: 'username',
                    mes: 'username already existing'
                });
            }
            if (user.email === req.body.email) {
                return res.json({
                    status: -1,
                    error: 'email',
                    mes: 'email has been registered'
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
            return res.json({status:0, data: newUser, mes:'signup success!'});
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
            return res.json({status:-1, error:err, mes:'program error'});
        }
        if (users.length == 0) {
            return res.json({status:-1, error:'user', mes: 'user not found!'});
        }
        var user = users[0];
        log.out(users);
        if (user.authenticate(req.body.password)) {
            req.session.username = req.body.username;
            req.session.name = user.name;
            req.session.email = user.email;
            return res.json({status: 0, error:'no', mes:'login success', data:user});
        }
        return res.json({status:-1, error:'password', mes:'password wrong!'});
    });
};

exports.logout = function(req, res) {
    req.session.username = '';
    req.session.name = '';
    req.session.email = '';
    return res.json(InvokeResult.success());
};

exports.hello = function(req, res) {
    res.send('request get success: api/user/hello');
};