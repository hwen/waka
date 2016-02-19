/**
 * Created by hwen on 15/12/23.
 */
var AnswerModel = require('./answer.model'),
    Answer = AnswerModel.Answer,
    AnswerCollect = AnswerModel.AnswerCollect,
    User = require('../user/user.model'),
    Question = require('./question.model').Question,
    _ = require('lodash'),
    async = require('async'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError,
    log = require('../../components/util/log');

//get good answers by topic(and also subtopics):sort by score
exports.getByTopic = getByTopic;

//get good answer in user following topic list
exports.getUserTopics = getByTopic;

//get answers by question
exports.list = list;

//get answer by user
exports.getByUser = getByUser;

//get answers by user collection
exports.collection = collection;

//add answer to collection
exports.addCollection = addCollection;

//answer attitude
exports.attitude = attitude;

//add answer
exports.add = add;

//modify answer
exports.update = update;

//delete answer
exports.del = del;

//TODO: get good answers by week, month
exports.time = function() {};

function addCollection(req, res) {
    var newCollection = new AnswerCollect(req.body);
    newCollection.save(function(err) {
        if (err) { return sysError(res, err, 'addCollection err'); }
        return res.json(invokeResult.success('', 'addCollection success'));
    });
}

function collection(req, res) {
    AnswerCollect.find(req.body.user_id).exec(function(err, results) {
        async.concat(results, function(result, cb) {
            Answer.findById(result.answer_id).exec(function(err, answer) {
               cb(null, answer);
            });
        }, function(err, answers) {
           async.map(answers, function(err, answer) {
               Question.findById(answer.question_id).exec(function(err, question) {
                   var result = {
                       answer: answer,
                       question: question
                   };
                   cb(null, result);
               });
           }, function(err, results) {
               return res.json(invokeResult.success(results, 'get collection success'));
           });
        });
    });
}

function del(req, res) {
    Answer.findById(req.body._id).exec(function(err, answer) {
        if (err) { return sysError(res, err, ''); }
        if (answer.author_id !== req.body.author_id) {
            return res.json(invokeResult.failure('author_id', 'permission deny'));
        }
        answer.remove(function(err) {
            if (err) { return sysError(res, err, 'answer: del');}
            return res.json(invokeResult.success('', 'delete answer success'));
        });
    });
}

function attitude(req, res) {
    log.out('answer attitude', req.body);
    Answer.findById(req.body._id).exec(function(err, answer) {
        if (err) { return sysError(res, err, ''); }
        switch (req.body.attitude) {
            case 1: answer.support();break;
            case 2: answer.unsupport();break;
            case 3: answer.useless();break;
        }
        answer.save(function(err) {
            if (err) { return sysError(res, err, ''); }
            return res.json(answer, 'updated attitude');
        });
    });
}

function update(req, res) {
    log.out('answer edit', req.body);
    Answer.findById(req.body._id).exec(function(err, answer) {
        if (err) { return sysError(res, err, 'edit'); }
        if (req.body.author_id !== answer.author_id) {
            return res.json(invokeResult.failure('author_id', 'permission deny'));
        }
        var updated = _.merge(answer, req.body);
        updated.save(function(err) {
            if (err) { return sysError(res, err, 'updated'); }
            return res.json(answer, 'answer: edit');
        })
    });
}

//require: question_id, author_id, content
function add(req, res) {
    log.out('answer add', req.body);
    var newAnswer = new Answer(req.body);
    newAnswer.save(function(err, result) {
        if (err) { return sysError(res, err, 'add answer'); }
        return res.json(invokeResult.success(result, 'add answer'));
    });
}

function getByUser(req, res) {
    log.out('answer getByUser', req.body);
    Answer.find({author_id:req.body.author_id}).sort({created_time:-1})
        .exec(function(err, answers) {
            if (err) { return sysError(res, err, 'answer getByUser'); }
            getAuthor(answers, function(err, datas) {
                async.map(datas, function(data, cb) {
                    Question.findById(data.answer.question_id).exec(function(err, question) {
                        var result = {
                            answer: data.answer,
                            author: data.author,
                            question: question
                        };
                        cb(null, result);
                    });
                }, function(err, results) {
                    return res.json(invokeResult.success(results, 'answer:getByUser'));
                });
            });
        });
}

function getByTopic(req, res) {
    log.out('answer topic', req.body);
    getQuestionByTopicList(req.body.topicList,function(err, questions) {
        if (err) { return sysError(res, err, 'getQuestionByTopicList'); }
        getAnswerByQuestionArr(questions, function(err, data) {
            if (err) { return sysError(res, err, 'getAnswerByQuestionArr'); }
            var results = _.sortBy(data, 'score');
            getAuthor(results, function(err, datas) {
               async.map(datas, function(data, cb) {
                   Question.findById(data.answer.question_id).exec(function(err, question) {
                       var result = {
                           answer: data.answer,
                           author: data.author,
                           question: question
                       };
                       cb(null, result);
                   });
               }, function(err, results) {
                   return res.json(invokeResult.success(results, 'answer:getByTopic'));
               });
            });
        });
    });
}

function list(req, res) {
    log.out('answer list', req.body);
    Answer.find({question_id: req.body.question_id})
        .sort({score:-1, created_time:-1})
        .exec(function(err, results) {
            if (err) { return sysError(res, err, 'answer list')}
            getAuthor(results, function(err, data) {
                if (err) { return sysError(res, err,'answer list')}
                else {
                    return res.json(invokeResult.success(data, 'answer list'));
                }
            });
        });
}

function getAnswerByQuestionArr(questions, callback) {
    async.concat(questions, function(question, cb) {
        Answer.find({question_id:question._id})
            .sort({score:-1, created_time:-1})
            .exec(function(err, answers) {
                if (err) log.err('getAnswerByQuestionArr',err);
                else {
                    cb(null, answers);
                }
            });
    }, callback);
}

function getQuestionByTopicList(topicsList ,callback) {
    async.concat(topicsList, function(topic, cb) {
        Question.find({topics:topic}, query.noAnswer).exec(function(err, questions) {
            if (err) { log.err('answer: getQuestionByTopicList', err); }
            else {
                cb(null, questions);
            }
        });
    }, callback);
}


function getAuthor(answers, callback) {
    async.map(answers, function(answer, cb) {
        User.findById(answer.author_id, function(err, user) {
            var data = {
                answer: answer,
                author: user
            };
            cb(null, data);
        })
    }, callback);
}