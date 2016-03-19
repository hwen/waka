/**
 * Created by hwen on 15/12/23.
 */
var Message = require('./message.model'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError,
    log = require('../../components/util/log'),
    async = require('async'),
    _ = require('lodash');

var qModel = require('../question/question.model');
var Question = qModel.Question;
var User = require('../user/user.model');

//add a message: send a message to a user, in different type
exports.add = add;

//post {unread:true/false, master_id:xx}, get read or unread mes
exports.getMes = getMes;

function add(params) {
    var newMes = new Message(params);
    log.err('err reach here');
    newMes.save(function(err, result) {
        if (err) {
            log.err('add message error', err);
        } else {
            log.out('add message success', result);
        }
    })
}

function getMes(req, res) {
    Message.find({master_id: req.body.master_id||''}).exec(function(err, results) {
        if (err) return sysError(res, err, '');
        getQuestionAndSender(results, function(err, messageList) {
            return res.json(invokeResult.success(messageList, 'getMes success'));
        });
    })
}

function getQuestionAndSender(mes, callback) {
    log.out('mes', mes, mes.length);
    mes = _.uniqBy(mes, '_id');
    mes = _.uniq(mes);
    async.map(mes, function(item, cb) {
        Question.findOne({_id: item.question_id})
            .exec(function(err, question) {
                User.findOne({_id: item.author_id})
                    .exec(function(err, user) {
                        var data = {
                            question: question,
                            user: user
                        };
                        cb(null, data);
                    });
            });
    }, callback);
}
