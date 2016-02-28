/**
 * Created by hwen on 15/12/23.
 */
var Message = require('./message.model'),
    invokeResult = require('../../components/invoke_result'),
    sysError = invokeResult.sysError,
    log = require('../../components/util/log'),
    _ = require('lodash');

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
    var query = {master_id: req.body.master_id||''};
    switch (req.body.type) {
        case "unread": query.unread = true; break;
        case "read": query.unread = false; break;
        case "all": break;
    }
    Message.find(query).exec(function(err, results) {
        if (err) return sysError(res, err, '');
        return res.json(invokeResult.success(results, 'getMes success'));
    })
}