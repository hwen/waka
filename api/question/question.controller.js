/**
 * Created by hwen on 15/12/23.
 */
'use strict';

var qModel = require('./question.model');
var filter = require('../../components/util/filters');
var InvokeResult = require('../../components/invoke_result');
var log = require('../../components/util/log');
var Question = qModel.Question;
var QtnFollow = qModel.QtnFollow;


//add a  question
exports.create = function(req, res) {
    if (filter.notNull(req.body.title)) {
        var newQuestion = new Question(req.body);
        newQuestion.save(function(err, question) {
            if (err) {
                return res.send(500, err);
            } else {
                log.out('add question', question);
            }
        });
    } else {
        log.err('question qid and title cannot be null. ', 'In file question.controller');
    }
};

exports.search = function() {

};



