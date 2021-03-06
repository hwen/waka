/**
 * Created by hwen on 15/12/23.
 */
'use strict';

var async = require('async');
var _ = require('lodash');
var qModel = require('./question.model');
var Question = qModel.Question;
var QtnFollow = qModel.QtnFollow;
var Topic = require('../topic/topic.model');
var User = require('../user/user.model');
var filter = require('../../components/util/filters');
var invokeResult = require('../../components/invoke_result');
var sysError = invokeResult.sysError;
var log = require('../../components/util/log');
var config = require('../../config/constant');
/*
*  params: title, content, author_id, topics
*  method: post
*  description:
* */
exports.add = add;

/*
*  params: keyword
*  method: post
*  description: search a question : version 1
* */
exports.search = search;

exports.update = update;

/*
*  params: topics
*  method: post
*  description: get questions that have no answer yet by topic list
* */
exports.getNoAnswer = getNoAnswer;

//params: topics, get new question by topic list ID
exports.getNew = getNew;

//params: topics, get top question by topic list ID
exports.getHot = getHot;

// method:get, params: question_id  --> return array[{author: , question}]
exports.getQuestion = getQuestion;

/*
*  params: author_id
*  method: get
*  description:
* */
exports.getByUser = getByUser;

/*
*  params: _id, attitude(1, 2 : sup, unsup)
*  method: post
*  description:
* */
exports.attitude = attitude;

/*
*  params: question_id, follower_id
*  method: post
*  description:
* */
exports.follow = follow;


exports.unfollow = unfollow;
/*
*  params: question_id
*  method: get
*  description: get question followers list
* */
exports.getFollowers = getFollowers;

/*
*  params: follower_id
*  method: get
*  description: get user following questions
* */
exports.getFollowList = getFollowList;

function getQuestion(req, res) {
    log.out(req.params);
    Question.findOne({_id: req.params.question_id||''}).exec(function(err, question) {
        if (err) return sysError(res, err);
        log.out(question);
        var questions = [question];
        getAuthor(questions, function(err, result) {
            if (err) return sysError(res, err);
            return res.json(invokeResult.success(result, 'success'));
        });
    });
}

function getFollowList(req, res) {
    log.out('question getFollower: controller', req.params);
    if (!filter.notNull(req.params.follower_id)) { log.err('getFollowList f_id null');return res.json(invokeResult.failure('follower_id', 'null'));}
    QtnFollow.find({follower_id:req.params.follower_id}).exec(function(err, questionFollow) {

        var questionIdList = questionFollow.map(function(item) {
            return item.question_id;
        });

        getFollowingQuestion(questionIdList, function(questions) {
            getAuthor(questions, function(err, results) {
                if (err) { return sysError(res, err,'question getFollowList');}
                return res.json(invokeResult.success(results, 'getFollowList'));
            });
        });

    });
}

function getFollowers(req, res) {
    log.out('question getFollower: controller', req.params);
    if (!filter.notNull(req.params.question_id)) {
        log.err('getFollower question_id cannot be null');
        return res.json(invokeResult.failure('question_id', 'question_id null'));
    }
    QtnFollow.find({question_id:req.params.question_id}).exec(function(err, results) {
        async.map(results, function(qFollow, cb) {
            User.findById(qFollow.follower_id).exec(function(err, user) {
                if (err) { return sysError(res, err, 'question getFollower->find user:controller');}
                cb(null, user);
            });
        }, function(err, users) {
            if (err) { return sysError(res, err, 'question map user: controller');}
            res.json(invokeResult.success(users, 'getFollower'));
        });
    });
}

function follow(req, res) {
    log.out('question follow: controller', req.body);
    if (filter.notNull(req.body.question_id)&&filter.notNull(req.body.follower_id)) {
        var newFollow = new QtnFollow(req.body);
        newFollow.save(function(err, follow) {
            if (err) { return sysError(res, err, 'save QtnFollow');}

            Question.findOne({_id: req.body.question_id})
                .exec(function(err, question) {
                    if (!err) {
                        question.follow();
                        question.save(function(err) {
                            if (!err) {
                                res.json(invokeResult.success({
                                    follow: follow,
                                    question: question
                                }, 'save follow'));
                            }
                        });
                    }
                });

        });
    } else {
        res.json(invokeResult.failure('qid&uid', 'question_id and follower_id cannot be null'));
    }
}

function unfollow(req, res) {
    log.out("unfollow", req.body);
    QtnFollow.findOne({question_id: req.body.question_id, follower_id: req.body.follower_id})
        .exec(function(err, qtn) {
            if (!qtn) return res.json(invokeResult.failure("qtn null", "cannot unfollow"));
            qtn.remove(function(err) {
                if (!err) {
                    Question.findOne({_id: req.body.question_id})
                        .exec(function(err, question) {
                            question.unfollow();
                            question.save(function(err, question) {
                                if (!err)
                                    return res.json(invokeResult.success(question, "unfollow success"));
                            });
                        });
                }
            });
        });
}

function attitude(req, res) {
    log.out('question attitude: controller', req.body);
    var qid = req.body._id||'';
    Question.findById(qid).exec(function(err, question) {
        switch (req.body.attitude) {
            case '1': question.support();break;
            case '2': question.unsupport();break;
        }
        question.save(function(err, q) {
            if (err) { return  sysError(res, err, 'attitude->save question attitude');}
            log.out('question attitude save :controller', question);
            return res.json(invokeResult.success({q:q}, 'attitude updated'));
        });
    });
}

function getByUser(req, res) {
    log.out('question getByUser: author_id', req.params.author_id);
    if (!req.params.author_id) return res.json(invokeResult.failure('author_id', 'no author_id'));
    async.waterfall([

        function(cb) {

            User.findById(req.params.author_id).exec(function(err, user) {
                if (err) { return sysError(res, err, 'getByUser->findUser error');}
                cb(null, user);
            });

        },
        function(user, cb) {

            Question.find({author_id:req.params.author_id}).limit(config.pageSize).exec(function(err, questions) {
                async.map(questions, function(question, callback) {

                    getTopic(question, function(topics) {
                        var data = {
                            question: question,
                            author: user,
                            topics: topics
                        };

                        callback(null, data);
                    })

                }, function(err, datas) {

                    if (err) { return sysError(res, err, 'getByUser->map question error');}
                    cb(null, datas);

                });
            });
        }
    ], function(err, result) {

        if (err) {return sysError(res, err,'getByUser->waterfall question error');}
        return res.json(invokeResult.success(result, 'get question by user'));

    });
}

function getHot(req, res) {
    log.out('get hot question by user following topics ID', req.body);
    var topicsList = req.body.topics;
    getQuestionByTopicList(topicsList, function(err, data) {
        if (err) { return sysError(res, err, 'getHot error');}

        var results = _.uniqBy(data, "_id");
        results = _.sortBy(results, 'score');
        results = _.reverse(results);
        results = _.uniqBy(results, 'title');

        log.out('get Hot question', results);
        getAuthor(results, function(err, data) {
            if (err) { return sysError(res, err,'getAuthor error in getHot');}
            return res.json(invokeResult.success(data, 'getHot question'));
        });
    });
}

function getNew(req, res) {
    log.out('get new question by user following topics ID', req.body);
    var topicsList = req.body.topics;
    getQuestionByTopicList(topicsList, function(err, data) {
        if (err) { return sysError(res, err,'getNew error');}

        var results = _.uniqBy(data, "_id");
        results = _.sortBy(results, 'created_time');
        results = _.reverse(results);
        results = _.uniqBy(results, 'title');

        log.out('get new question', results);
        getAuthor(results, function(err, data) {
            if (err) { return sysError(res, err,'getAuthor error in getNew');}
            return res.json(invokeResult.success(data, 'getNew question'));
        });
    });
}

//Note that: topic list already show all child topics "ID"
function getNoAnswer(req, res) {
    log.out('get no answer question by user following topics ID', req.body);
    var topicsList = req.body.topics;

    getNoAnswerByTopicList(topicsList ,function(err, data) {
        if (err) { return sysError(res, err, 'getNoAnswer error');}

        var results = _.uniqBy(data, "_id");
        results = _.uniqBy(results, 'title');
        log.out('no answer question', results);
        getAuthor(results, function(err, datas) {
            if (err) { return sysError(res, err,'getNoAnswer error'); }
            return res.json(invokeResult.success(datas, 'get no answer questions success'));
        });
    });

}

function update(req, res) {
    Question.findOne({_id: req.body._id||''}).exec(function(err, question) {

        if (err) { return sysError(res, err, 'update err'); }
        if (!question) { return res.status(404).json(invokeResult.success('', 'question not found!')); }
        if (question.author_id != req.body.author_id) { return res.status(401).json(invokeResult.failure('author_id', 'no permission')); }

        var updated = _.merge(question, req.body);

        if (req.body.topics) {
            updated.markModified("topics");
        }

        updated.save(function(err) {
            if (err) { return res.send(500, err); }
            return res.json(invokeResult.success({q:question}, 'question updated!'));
        });
    });
}

function add(req, res) {
    if (filter.notNull(req.body.title)&&filter.notNull(req.body.author_id)&&filter.notNull(req.body.topics)) {
        var newQuestion = new Question(req.body);

        newQuestion.follow();
        newQuestion.save(function (err, question) {
            if (err) {
                return sysError(res, err, 'add err');
            } else {
                var params = {
                    question_id: question._id,
                    follower_id: question.author_id
                };

                var newFollow = new QtnFollow(params);

                newFollow.save(function(err, follow) {
                    if (err) { return sysError(res, err, 'save QtnFollow');}
                });

                log.out('add question', question);

                addUserQuestion(req.body.author_id);

                res.json(invokeResult.success(question, 'add question success'));
            }
        });
    } else {
        log.err('question author_id or title or topics cannot be null. ', 'question.controller->create');
        res.send(500, invokeResult.failure('', 'question author_id or title or topics cannot be null.  '))
    }
}

function search(req, res) {
    var key = new RegExp(req.body.keyword, "i");

    Question.find({
        $or: [{title: key}, {content: key}]
    }).exec(function (err, questions) {
        if (err) {
            return sysError(res, err, 'search err');
        }
        getAuthor(questions, function(err, result) {
            if (err) { log.err(err, 'question.controller->search func'); res.status(500).json('search question fail!');}
            res.json(invokeResult.success(result));
        });
    })
}

function getQuestionByTopicList(topicsList ,callback) {

    var limit = config.pageSize / topicsList.length;
    limit = Math.floor(limit);

    async.concat(topicsList, function(topic, cb) {
        Question.find({topics:topic})
        .sort({created_time: -1, score: -1})
        .limit(limit)
        .exec(function(err, questions) {
            if (err) { log.err(err, 'getQuestionByTopicList'); }
            else {
                cb(null, questions);
            }
        });
    }, callback);
}

function getNoAnswerByTopicList(topicsList ,callback) {

    var limit = config.pageSize / topicsList.length;
    limit = Math.floor(limit);

    async.concat(topicsList, function(topic, cb) {
        Question.find({topics:topic, answer_count: 0})
            .sort({created_time: -1})
            .limit(limit)
            .exec(function(err, questions) {
                if (err) { log.err(err, 'getQuestionByTopicList'); }
                else {
                    var results = _.uniqBy(questions, "_id");
                    cb(null, results);
                }
            });
    }, callback);
}

function getAuthor(questions, callback) {
    async.map(questions, function(question, cb) {
        User.findById(question.author_id, function(err, user) {

            getTopic(question, function(err, topics) {
                var data = {
                    question: question,
                    author: user,
                    topics: topics
                };
                cb(null, data);
            });

        });
    }, callback);
}

function getFollowingQuestion(questionIdList) {
    async.concat(questionIdList, function(question_id, cb) {
        Question.findById(question_id, function(err, question) {
            cb(null, question);
        });
    }, callback);
}

function getTopic(question, callback) {
    var topics  = question.topics;
    async.concat(topics, function(topic_id, cb) {
        Topic.findOne({_id: topic_id})
            .exec(function(err, topic) {
                cb(null, topic);
            });
    }, callback);
}

function addUserQuestion(uid) {
    User.findOne({_id: uid})
        .exec(function(err, user) {
            user.addQuestion();

            user.save( function(err) {
                if (err) log.out('addUserQuestion', err);
            });
        })
}
//function findById(req, res) {
//    Question.find({_id:req.body.id}).exec(function(err, data) {
//        if (err) { log.err(err);return res.send(500, 'not find');}
//        log.out('find by id',data);
//        return res.json(invokeResult.success(data, 'success'));
//    });
//}
