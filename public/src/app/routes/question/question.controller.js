(function(angular) {
    'use strict';
    angular.module('waka').controller('questionController', ['$scope', '$state', '$sce',  'Question',
		'timeFormat', 'Answer', 'Attitude', 'iCookie', questionController]);

    function questionController($scope, $state, $sce, Question, timeFormat,
								Answer, Attitude, iCookie) {
    	var vm = this;
		var question_id = location.hash.split('/')[2];
		var user_id = iCookie.getCookie("uid");

    	vm.answerList = [];
    	vm.question = "";
		vm.addAnswer = addAnswer;
		vm.checkAuthor = checkAuthor;
		vm.setQuestionAttitude = setQuestionAttitude;
		vm.setAnswerAttitude = setAnswerAttitude;
		vm.followQuestion = followQuestion;
		vm.unfollowQuestion = unfollowQuestion;
		vm.addCollection = addCollection;
		vm.isFollowing = false;

    	getQuestion();
		checkFollowState();

		vm.postedTime = timeFormat.postedTime;

		function setQuestionAttitude(type) {
			var params = {
				user_id: user_id,
				question_id: vm.question._id,
				type: type
			};

			Attitude.setAttitude(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						if (res.data.question) {
							vm.question = res.data.question;
						} else {
							type > 0 ? vm.question.support_count++: vm.question.support_count--;
						}
						vm.question.attitude = res.data.attitude;
					}
				});
		}

		function setAnswerAttitude(type, $index) {
			var params = {
				user_id: user_id,
				answer_id: vm.answerList[$index].answer._id,
				type: type
			};

			Attitude.setAttitude(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						if (res.data.answer) {
							vm.answerList[$index].answer = res.data.answer;
						} else {
							type > 0 ? vm.answerList[$index].answer.support_count++
								: vm.answerList[$index].answer.support_count--;
						}
						vm.answerList[$index].attitude = res.data.attitude;
					}
				});
		}

    	function getQuestion() {
			console.log(question_id);
    		Question.get({question_id:question_id}).$promise.then(function(res) {
    			if (res.status > -1) {
					console.log(res);
					var result = res.data[0];
    				vm.question = result.question;
    				vm.question.author = result.author;
                    vm.question.topics = result.topics;
    				vm.question.createdTime = timeFormat.postedTime(vm.question.created_time);

					getQuestionAttitude(vm.question._id);

    				getAnswers(vm.question._id);
    			} else {
    				alert('getQuestion error');
    			}
    		});
    	}

    	function getAnswers(qid) {
    		Answer.getByQuestion({question_id:qid}).$promise.then(function(res) {
    			if (res.status > -1) {
    				vm.answerList = res.data;
					getAnswerAttitude();
					setCollectionState();
    			} else {
    				alert('getAnswers error');
    			}
    		});
    	}

		function getQuestionAttitude(question_id) {
			var params = {
				user_id: user_id,
				question_id: question_id
			};
			Attitude.getAttitude(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						vm.question.attitude = res.data[0];
					}
				});
		}

		function getAnswerAttitude() {
			vm.answerList.forEach(function(item, index) {
				var params = {
					user_id: user_id,
					answer_id: item.answer._id
				};
				Attitude.getAttitude(JSON.stringify(params))
					.$promise
					.then(function(res) {
						if (res.status > -1) {
							vm.answerList[index].attitude = res.data[0];
						}
					});
			});
		}

		function addAnswer() {
			location.href = '/#/answer-editor/' + question_id;
		}

		function checkAuthor(author_id) {
			return iCookie.getCookie("uid") == author_id;
		}

		function followQuestion() {
			var params = {
				follower_id: user_id,
				question_id: question_id
			};
			Question.follow(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status>-1) {
						vm.question.following_count ++;
					}
				});
		}

		function unfollowQuestion() {
			var params = {
				question_id: question_id,
				follower_id: user_id
			};
			Question.unfollow(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						vm.question.following_count --;
					}
				});
		}

		function checkFollowState() {
			Question.getFollower({question_id: question_id})
				.$promise
				.then(function(res) {
					var followerList = res.data;
					followerList.forEach(function(item) {
						if (item._id == user_id) {
							vm.isFollowing = true;
						}
					});
				});
		}

		function addCollection(answer_id) {
			var params = {
				answer_id: answer_id,
				user_id: user_id
			};
			
			Answer.addCollection(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						alert("添加收藏成功");
						location.reload();
					}
				});
		}

		function setCollectionState() {
			vm.answerList.forEach(function(item, index) {
				checkCollectionState(item.answer._id, index);
			});
		}

		function checkCollectionState(answer_id, index) {
			var params = {
				user_id: user_id,
				answer_id: answer_id
			};
			Answer.checkCollection(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status>-1) {
						vm.answerList[index].collected = true;
					}
				});
		}

    }

})(angular);
