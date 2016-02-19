/**
 * Created by hwen on 15/12/23.
 */
var express = require('express'),
    controller = require('./message.controller');

var router = express.Router();

router.post('/getMes', controller.getMes);

module.exports = router;