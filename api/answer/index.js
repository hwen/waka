/**
 * Created by hwen on 15/12/23.
 */
var express = require('express'),
	controller = require('./answer.controller');

var router = express.Router();

router.post('/getByTopic', controller.getByTopic);
router.post('/getUserTopics', controller.getUserTopics);
router.get('/getByQuestion/:question_id', controller.getByQuestion);
router.get('/getByUser/:author_id', controller.getByUser);
router.get('/collection/:user_id', controller.collection);
router.post('/addCollection', controller.addCollection);
router.post('/attitude', controller.attitude);
router.post('/add', controller.add);
router.post('/update', controller.update);
router.post('/del', controller.del);

module.exports = router;