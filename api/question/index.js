/**
 * Created by hwen on 15/12/23.
 */
var express = require('express'),
	controller = require('./question.controller');

var router = express.Router();

router.post('/add', controller.add);
router.post('/search', controller.search);
router.post('/update', controller.update);
router.post('/getNoAnswer', controller.getNoAnswer);
router.post('/getNew', controller.getNew);
router.post('/getHot', controller.getHot);
router.get('/getByUser/:author_id', controller.getByUser);
router.post('/attitude', controller.attitude);
router.post('/follow', controller.follow);
router.get('/getFollowers/:question_id', controller.getFollowers);
router.get('/getFollowList/:follower_id', controller.getFollowList);
router.get('/question/:question_id', controller.question);

module.exports = router;
