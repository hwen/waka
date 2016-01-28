/**
 * Created by hwen on 15/12/23.
 */
'use strict';

var async = require('async');
var qModel = require('./question.model');
var filter = require('../../components/util/filters');
var InvokeResult = require('../../components/invoke_result');
var log = require('../../components/util/log');
var Question = qModel.Question;
var QtnFollow = qModel.QtnFollow;
var User = require('../user/user.model');

//add a question
exports.add = add;

//search a question : version 1
exports.search = search;

//edit a question
exports.edit = function(){};

//get questions that have no answer yet by topic list
exports.getNoAnswer = function(){};

//get new question by topic list
exports.getNew = function(){};

//get top question by topic list
exports.getTop = function(){};

//get question by user
exports.user = function(){};

//question attitude
exports.attitude = function(){};

//add question follow
exports.follow = function(){};

//get question followers list
exports.getFollower = function(){};

//get user following question list
exports.getFollowList = function(){};



function add(req, res) {
    if (filter.notNull(req.body.title)) {
        var newQuestion = new Question(req.body);
        newQuestion.save(function (err, question) {
            if (err) {
                return res.send(500, err);
            } else {
                log.out('add question', question);
            }
        });
        res.json(200, 'add question success');
    } else {
        log.err('question qid and title cannot be null. ', 'question.controller->create');
    }
}

function search(req, res) {
    var key = new RegExp(req.body.keyword, "i");

    Question.find({
        $or: [{title: key}, {content: key}]
    }).exec(function (err, questions) {
        if (err) {
            return res.send(500, 'question not found')
        }
        async.map(questions, function(question, cb) {
            User.findById(question.author_id, function(err, user) {
                var data = {
                    q: question,
                    author: user
                };
                cb(null, data);
            })
        }, function(err, result) {
            if (err) { log.err(err, 'question.controller->search func'); res.status(500).json('search question fail!');}
            res.status(200).json(result);
        })
    })
}