/**
 * Created by hwen on 15/12/12.
 */

'use strict';
var User = require('./user.model'),
    Topic = require('../topic/topic.model'),
    log = require('../../components/util/log'),
    config = require('../../config/environment'),
    fs = require("fs"),
    async = require('async'),
    _ = require('lodash'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError;


var validationError = function(res, err) {
    return res.json(422, err);
};

exports.get = function(req, res) {
    log.out('user get', req.params);
    User.findOne({_id:req.params.id||''}).exec(function(err, user) {
        if (err) return sysError(res, err);
        return res.json(invokeResult.success(user, 'success'));
    });
}

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

exports.update = function(req, res) {
    log.out('user-update', req.body);
    User.findOne({_id: req.cookies.uid||''}).exec(function(err, user) {
        if (err) return sysError(res, err, 'update err');

        if (!user) {
            return res.status(404).json(invokeResult.success('', 'cannot find user'));
        }

        var updated = _.merge(user, req.body);

        if (req.body && req.body.following_topic ) {
            if (req.body.following_topic.length === 0)
                updated.following_topic = null;
            //Mongoose 混合类型修改后需要调用 markModified 不然该字段保存不了
            //坑爹
            updated.following_topic = req.body.following_topic;
            updated.markModified('following_topic');
        }

        log.out('updated topic->', updated);
        updated.save(function(err) {
            if (err) return sysError(res, err);
            return res.json(invokeResult.success(updated, 'updated'));
        });
    });
};

exports.updatePassword = function(req, res) {
    log.out(req.body);
    User.findOne({_id:req.cookies.uid||''}).exec(function(err, user) {
        if (!user.authenticate(req.body.oldPassword)) {
            return res.json(invokeResult.failure('password', 'incorrect password'));
        }
        user.password = user.encrytPassword(req.body.newPassword);
        user.save(function(err) {
            if (err) return sysError(res, err, 'update password err');
            return res.json(invokeResult.success(user, 'update password success'));
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
    User.findOne({_id: req.cookies.uid||''}).exec(function(err, user) {
        if (err) return sysError(res, err);
        return res.json(invokeResult.success(user, 'currentUser'));
    });
};

exports.imgUpload = function(req, res) {
    var imgPath;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        log.out('what the fuck!!!', req.cookies.uid);
        imgPath = config.root + '/public/src/assets/images/user/' + req.cookies.uid + '.png';
        var fileStream = fs.createWriteStream(imgPath);
        file.pipe(fileStream);

        setAvatar(req.cookies.uid);

        fileStream.on('close',function() {
            log.out("upload success!!!");
            return res.status(200).json(invokeResult.success('', 'upload avatar success'));
        });
    });
};

exports.getFollowingTopic =  function(req, res) {
    async.waterfall([
        function(cb) {
            if (req.params._id);
            User.findOne({_id: req.params._id}).exec(function(err, user) {
                cb(null, user);
            });
        },
        function(user, cb) {
            getTopic(user.following_topic, function(topics) {
                var data = {
                    user: user,
                    topics: topics
                };
                cb(null, data);
            });
        }
    ], function(err, result) {
        if (err) return sysError(res, err, 'getFollowingTopic');

        return res.json(invokeResult.success(result, 'getFollowingTopic success'));
    });
}

exports.getFollowingTopicAll =  function(req, res) {
    async.waterfall([
        function(cb) {
            if (req.params._id);
            User.findOne({_id: req.params._id}).exec(function(err, user) {
                cb(null, user);
            });
        },
        function(user, cb) {
            if (!user) {
                cb('nodata')
                return;
            }
            getTopicAll(user.following_topic, function(topics) {
                var data = {
                    user: user,
                    topics: topics
                };
                cb(null, data);
            });
        }
    ], function(err, result) {
        if (err) return sysError(res, err, 'getFollowingTopic');

        return res.json(invokeResult.success(result, 'getFollowingTopic success'));
    });
}

function setAvatar(uid) {
    User.findOne({_id:uid||''}).exec(function(err, user) {
        user.avatar = uid + '.png';
        user.save(function(err) {
            if (err) return sysError(res, err, 'setAvatar error');
        });
    });
}

function getTopic(topicList, callback) {

    if ( !topicList || topicList.length === 0 ) {
        var result = [];
        callback(result);
    } else {

        async.concat(topicList, function(topic_id, cb) {
            Topic.findOne({_id: topic_id})
                .exec(function(err, topic) {
                    if (!err) {
                        cb(null,topic);
                    }
                });

        }, function(err, topics) {
            var data = _.uniqBy(topics, "_id");
            callback(data);
        });

    }

}


function getTopicAll(topicList, callback) {

    if ( !topicList || topicList.length === 0 ) {
        var result = [];
        callback(result);
    } else {

        async.concat(topicList, function(topic_id, cb) {
            getTopicAllChild(topic_id, function(results) {
                var data = [];
                data = data.concat(results);
                Topic.findOne({_id: topic_id}).exec(function(err, topic) {
                    data.push(topic);
                    cb(null, data);
                });
            });

        }, function(err, topics) {
            var data = _.uniqBy(topics, "_id");
            callback(data);
        });
        
    }

}

function getTopicAllChild(topic_id, callback) {
    if (topic_id) {
        Topic.findOne({_id: topic_id}).exec(function(err, result) {
            result.getChildren(true, function(err, results) {
                if (!err)
                    callback(results);
            });
        });
    }
}


exports.hello = function(req, res) {
    res.send('request get success: api/user/hello');
};
