(function(angular) {
    'use strict';
    angular.module('waka').controller('questionController', ['$scope', '$state', '$sce',  'Question',
		'timeFormat', 'Answer', 'iCookie', questionController]);

    function questionController($scope, $state, $sce, Question, timeFormat, Answer, iCookie) {
    	var vm = this;
		var question_id = location.hash.split('/')[2];

    	vm.answerList = [];
    	vm.question = "";
		vm.addAnswer = addAnswer;
		vm.checkAuthor = checkAuthor;

    	getQuestion();

		vm.postedTime = timeFormat.postedTime;

    	function getQuestion() {
			console.log(question_id);
    		Question.get({question_id:question_id}).$promise.then(function(res) {
    			if (res.status > -1) {
					console.log(res);
					var result = res.data[0];
    				vm.question = result.question;
    				vm.question.author = result.author;
    				vm.question.createdTime = timeFormat.postedTime(vm.question.created_time);
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
    			} else {
    				alert('getAnswers error');
    			}
    		});
    	}

		function addAnswer() {
			location.href = '/#/answer-editor/' + question_id;
		}

		function checkAuthor(author_id) {
			return iCookie.getCookie("uid") == author_id;
		}
    }

})(angular);