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

//add a  question
exports.create = function (req, res) {
    console.log(req.body);
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
};

// search a question : version 1
exports.search = function (req, res) {
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
};








