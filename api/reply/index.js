/**
 * Created by hwen on 15/12/23.
 */
var express = require('express'),
    controller = require('./reply.controller');

var router = express.Router();

router.post('/add', controller.add);
router.post('/update', controller.update);
router.post('/del', controller.del);
router.get('/list/:answer_id', controller.list);

module.exports = router;