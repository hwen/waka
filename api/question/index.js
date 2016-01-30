/**
 * Created by hwen on 15/12/23.
 */
var express = require('express'),
	controller = require('./question.controller');

var router = express.Router();

router.post('/add', controller.add);
router.post('/search', controller.search);

module.exports = router;