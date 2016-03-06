/**
 * Created by hwen.
 */
var async = require('async');
var _ = require('lodash');
var Attitude = require('./attitude.model');
var qModel = require('../question/question.model');
var Question = qModel.Question;
var aModel = require('../answer/answer.model');
var Answer = aModel.Answer;
var User = require('../user/user.model');
var invokeResult = require('../../components/invoke_result');
var sysError = invokeResult.sysError;
var log = require('../../components/util/log');
var config = require('../../config/constant');

exports.getAttitude = getAttitude;
exports.setAttitude = setAttitude;

function getAttitude(req, res) {

    var params = req.body;
    log.out('getAttitude', params);

    if ( !params.user_id ) return;

    if ( params.answer_id ) {
        Attitude.find({user_id: params.user_id, answer_id: params.answer_id})
            .exec(function(err, attitude) {
                if (err) {
                    log.err('getAttitude', err);
                    return;
                }

                if (!attitude) return res.json(invokeResult.failure('null', 'getAttitude'));
                else
                    return res.json(invokeResult.success(attitude, 'getAttitude success'));
            });
    }

    if ( params.question_id ) {
        Attitude.find({user_id: params.user_id, question_id: params.question_id})
            .exec(function(err, attitude) {
                if (err) {
                    log.err('getAttitude', err);
                    return;
                }

                if (!attitude) return res.json(invokeResult.failure('null', 'getAttitude'));
                else
                    return res.json(invokeResult.success(attitude, 'getAttitude success'));
            });
    }

}

function setAttitude(req, res) {
    log.out('attitude', req.body);

    if ( !req.body.user_id ) return res.json(invokeResult.failure('user_id', 'null'));

    if ( req.body.answer_id ) {
        Attitude.findOne({user_id: req.body.user_id, answer_id: req.body.answer_id})
            .exec(function(err, attitude) {
                if ( !attitude ) {

                    userAttitude(req.body.user_id, req.body.type, false);

                    answerAttitude(req.body.answer_id, req.body.type);

                    var params = {
                        user_id: req.body.user_id,
                        answer_id: req.body.answer_id,
                        type: req.body.type
                    };
                    addAttitude(params, res);

                } else {
                    userAttitude(req.body.user_id, req.body.type, true);

                    changeAnswerAttitude(attitude, req.body.answer_id, req.body.type, res);
                }
            });
    }

    if ( req.body.question_id ) {
        Attitude.findOne({user_id: req.body.user_id, question_id: req.body.question_id})
            .exec(function(err, attitude) {

                if ( !attitude ) {
                    userAttitude(req.body.user_id, req.body.type, false);

                    questionAttitude(req.body.question_id, req.body.type);

                    var params = {
                        user_id: req.body.user_id,
                        question_id: req.body.question_id,
                        type: req.body.type
                    };
                    addAttitude(params, res);

                } else {
                    userAttitude(req.body.user_id, req.body.type, true);

                    changeQuestionAttitude(attitude, req.body.question_id, req.body.type, res);
                }
            });
    }
}

function addAttitude(params, res) {
    log.out('addAttitude', params);

    var newAttitude = new Attitude(params);

    newAttitude.save(function(err, result) {
        if (err) return sysError(res, err, 'addAttitude');

        log.out('addAttitude success', result);
        return res.json(invokeResult.success({
            attitude: result
        }, 'addAttitude success'));
    });
}

function answerAttitude(answer_id, type) {
    Answer.findOne({_id: answer_id})
        .exec(function(err, answer) {
            if (type > 0) {
                answer.support();
            }
            if (type < 0) {
                answer.unsupport();
            }

            answer.save(function(err, answer) {
                if (err) log.err('answerAttitude', err);
                else
                    log.out('answerAttitude success', answer);
            });
        });
}

function questionAttitude(question_id, type) {
    Question.findOne({_id: question_id})
        .exec(function(err, question) {
            if (type > 0) {
                question.support();
            }
            if (type < 0) {
                question.unsupport();
            }

            question.save(function(err, answer) {
                if (err) log.err('answerAttitude', err);
                else
                    log.out('answerAttitude success', answer);
            });
        });
}

function changeAnswerAttitude(attitude, answer_id, type, res) {
    Answer.findOne({_id: answer_id})
        .exec(function(err, answer) {

            if (!answer) return;

            if ( attitude.type==-1 && type==1 ) {
                answer.changeToSupport();
                attitude.type = type;
            }
            if ( attitude.type==1 && type==-1) {
                answer.changeToUnsupport();
                attitude.type = type;
            }

            answer.save(function(err, answer) {
                if (err) return sysError(res, err, 'changeAnswerAttitude');
                else {
                    attitude.save(function(err, attitude) {
                        return res.json(invokeResult.success({
                            answer: answer,
                            attitude: attitude
                        }, 'changeAnswerAttitude success'));
                    });
                }
            })
        });
}


function changeQuestionAttitude(attitude, question_id, type, res) {
    Question.findOne({_id: question_id})
        .exec(function(err, question) {

            if ( attitude.type==-1 && type==1 ) {
                question.changeToSupport();
                attitude.type = type;
            }
            if ( attitude.type==1 && type==-1) {
                question.changeToUnsupport();
                attitude.type = type;
            }

            question.save(function(err, question) {
                if (err) return sysError(res, err, 'changeQuestionAttitude');
                else {
                    attitude.save(function(err, attitude) {
                        return res.json(invokeResult.success({
                            question: question,
                            attitude: attitude
                        }, 'changeQuestionAttitude success'));
                    });
                }
            })
        });
}

function userAttitude(user_id, type, change) {
    if (change) {
        if( type >0 ) userAddSupport(user_id);
        else userCancelSupport(user_id);
    } else {
        if ( type> 0 )
            userAddSupport(user_id);
    }
}

function userAddSupport(user_id) {
    User.findOne({_id: user_id})
        .exec(function(err, user) {
            if (err) {
                log.err('userAddSupport');
                return;
            } else {
                user.addSupport();
                user.save(function(err) {
                    if (!err) log.out('addUser Support sucess');
                });
            }
        });
}

function userCancelSupport(user_id) {
    User.findOne({_id: user_id})
        .exec(function(err, user) {
            if (err) {
                log.err('userAddSupport');
                return;
            } else {
                user.cancelSupport();
                user.save(function(err) {
                    if (!err) log.out('addUser Support sucess');
                });
            }
        });
}