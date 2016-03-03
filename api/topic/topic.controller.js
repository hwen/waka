/**
 * Created by hwen on 15/12/23.
 */
var Topic = require('./topic.model'),
    _ = require('lodash'),
    async = require('async'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError,
    log = require('../../components/util/log');

/*
*  params: name
*  method: get
*  description: get all sub topics
* */
exports.sub = sub;

exports.getAllChild = getAllChild;

/*
*  params: name, parent(parent_name)
*  method: post
*  description:
* */
exports.add = add;

exports.update = update;

exports.list = list;

exports.getTopicsId = getTopicsId;

exports.getTopicById = getTopicById;

exports.getTopicByIdList = getTopicByIdList;

function getTopicByIdList(req, res) {
    if (!req.body.topicIdList) return res.json(invokeResult.failure('topicIdList', 'null'));
    async.map(req.body.topicIdList, function(topicId, callback) {
        Topic.findOne({_id: topicId})
            .exec(function(err, topic) {
                if (err) return sysError(res, err);
                callback(null, topic);
            });
    }, function(err, results) {
        if (err) return sysError(res, err);
        return res.json(invokeResult.success(results, 'getTopicByIdList success'));
    });
}

function getTopicById(req, res) {
	if (req.params._id) {
		Topic.findOne({_id: req.params._id}).exec(function(err, result) {
			if (err) return sysError(res, err);
			return res.json(invokeResult.success(result, 'getTopicById success'));
		});
	} else {
        return res.json(invokeResult.failure('_id', 'null'));
    }
}

function getTopicsId(req, res) {
    log.out(req.body);
    async.map(req.body.topics, function(topic, callback) {
        Topic.findOne({name:topic}).exec(function(err, result) {
            if (err) return sysError(res, err);
            callback(null, result._id);
        });
    }, function(err, results) {
        if (err) return sysError(res, err);
        return res.json(results, 'getTopicsId success');
    });
}

function list(req, res) {
    Topic.find({}).exec(function(err, results) {
        if (err) return sysError(res, err);
        return res.json(invokeResult.success(results, 'list topic success'));
    })
}

function update(req, res) {
	log.out(req.body);
	Topic.findOne({_id: req.body.id||''}).exec(function(err, result) {
		if (err) return sysError(res, err, '');
		if (!result) return res.json(404, 'topic not found');
		result.name = req.body.name;
		result.save(function(err, result) {
			return res.json(invokeResult.success(result, 'update topic success'));
		});
	});
}

function add(req, res) {
	log.out(req.body);
	if ( !req.body.name) return res.send(400, 'topic name cannot be null');
	if (req.body.parent) {
		Topic.findOne({name: req.body.parent}).exec(function(err, parent) {
			if (!parent) return res.send(404, 'parent not found');
			var newTopic = new Topic({name:req.body.name});
			newTopic.parent = parent;
			newTopic.save(function(err, topic) {
				if (err) {
					return sysError(res, err, 'save newTopic error (parent)');
				}
				return res.json(invokeResult.success(topic, 'save newTopic success (parent)'));
			});
		});
	} else {
		var newTopic = new Topic({name:req.body.name});
		newTopic.save(function(err, topic) {
			if (err) {
				return sysError(res, err, 'save newTopic error');
			}
			return res.json(invokeResult.success(topic, 'save newTopic success'));
		});
	}
}

function sub(req, res) {
	log.out(req.params);
	if (req.params._id) {
		Topic.findOne({_id: req.params._id}).exec(function(err, result) {
			if (err) return sysError(res, err, 'sub findOne error');
			if (!result) return res.send(404, 'topic not found');
			result.getChildren(false, function(err, results) {
				if (err) return sysError(res, err, 'sub getChildren error');
				res.json(invokeResult.success(results, 'sub getChildren success'));
			});
		});
	}
}

function getAllChild(req, res) {
	log.out(req.params);
	if (req.params._id) {
		Topic.findOne({_id: req.params._id}).exec(function(err, result) {
			if (err) return sysError(res, err, 'sub findOne error');
			if (!result) return res.send(404, 'topic not found');
			result.getChildren(true, function(err, results) {
				if (err) return sysError(res, err, 'sub getChildren error');
				res.json(invokeResult.success(results, 'sub getChildren success'));
			});
		});
	}
}
