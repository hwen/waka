/**
 * Created by hwen on 15/12/23.
 */
var Reply = require('./reply.model'),
    aModel = require('../answer/answer.model'),
    Answer = aModel.Answer,
    User   =  require('../user/user.model'),
    Message = require('../message/message.controller'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError,
    log = require('../../components/util/log'),
    async = require('async'),
    _ = require('lodash');

//answer_id, author_id,
exports.add = add;

exports.update = update;

//get reply list by answer, method: get
exports.list = list;

exports.del = del;

//TODO:attitude 
exports.attitude = function() {};

function add(req, res) {
    log.out(req.body);
    if (!req.body.author_id||!req.body.answer_id||!req.body.content) {
        return res.json(400, 'author_id, answer_id, content cannot be null');
    }
    var newReply = new Reply(req.body);
    newReply.save(function(err, result) {
        if (err) return sysError(res, err, 'add reply error');
        Answer.findOne({_id: req.body.answer_id||''}).exec(function(err, answer) {
            if (err) log.err(err);
            //var mes = {
            //    type: "reply2",
            //    master_id: answer.author_id,
            //    author_id: req.body.author_id,
            //    question_id: answer.question_id,
            //    answer_id: answer._id
            //};
            //Message.add(mes);
        });
        return res.json(invokeResult.success(result, 'add reply success'));
    });
}

function list(req, res) {
    log.out(req.params);
    if (!req.params.answer_id) return res.send(400, 'answer_id cannot be null');
    Reply.find({answer_id: req.params.answer_id||''}).exec(function(err, replys) {
        if (err) return sysError(res, err, '');
        getUser(replys, function(err, data) {
            return res.json(invokeResult.success(data, 'list replys success'));
        });
    });
}

function update(req, res) {
    log.out(req.body);
    Reply.findOne({_id:req.body._id||''}).exec(function(err, reply) {
        if (req.body.author_id != reply.author_id) {
            return res.status(401).json(invokeResult.failure('author_id', 'no permission'));
        }
        var updated = _.merge(reply, req.body);
        updated(function(err, result) {
            if (err) return sysError(res, err, '');
            return res.json(invokeResult.success(result, 'update reply success'));
        });
    });
}

function del(req, res) {
    log.out(req.body);
    Reply.findOne({_id:req.body._id||''}).exec(function(err, reply) {
        if (req.body.author_id != reply.author_id) {
            return res.status(401).json(invokeResult.failure('author_id', 'no permission'));
        }
        reply.remove(function(err) {
            if (err) return sysError(res, err, 'delete reply error');
            return res.json(invokeResult.success('', 'delete reply success'));
        });
    });
}

function getUser(replys, callback) {
    async.map(replys, function(reply,cb) {
        User.findOne({_id: reply.author_id})
            .exec(function(err, user) {
                var data = {
                    reply: reply,
                    user: user
                };

                cb(null, data);
            });
    }, callback);
}