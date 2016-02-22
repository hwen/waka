/**
 * Created by hwen on 15/12/12.
 */

'use strict';
var invokeResult = require('../../components/invoke_result'),
    User = require('./user.model'),
    log = require('../../components/util/log'),
    config = require('../../config/environment'),
    fs = require("fs");


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
            req.session.uid = user._id;
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
            req.session.uid = user._id;
            req.session.name = user.name;
            return res.json(invokeResult.success(user, 'login success'));
        }
        return res.json(invokeResult.failure('password', 'password wrong!'));
    });
};

exports.logout = function(req, res) {
    req.session.uid = null;
    return res.json(invokeResult.success('', 'logout success'));
};

exports.currentUser = function(req, res) {
    //console.log(req);
    var data = { uid : req.session.uid };
    return res.json(invokeResult.success(data, 'currentUser'));
};

exports.imgUpload = function(req, res) {
    var imgPath;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        log.out('what the fuck!!!', req.session.uid);
        imgPath = config.root + '/public/src/assets/images/user/' + req.session.uid + '.png';
        var fileStream = fs.createWriteStream(imgPath);
        file.pipe(fileStream);
        fileStream.on('close',function() {
            console.log(req.busboy);
        });
        return res.status(200).json('ok');
    });
};

exports.hello = function(req, res) {
    res.send('request get success: api/user/hello');
};