(function(angular) {
    'use strict';
    angular.module('waka').controller('questionController', ['$scope', '$state', 'Question',
        'timeFormat', 'Answer', questionController]);

    function questionController($scope, $state, Question, timeFormat, Answer) {
    	var vm = this;

    	vm.answerList = [];
    	vm.question = "";

    	getQuestion();

		vm.postedTime = timeFormat.postedTime;

    	function getQuestion() {
    		var params = location.hash.split('/');
			console.log(params);
    		Question.get({question_id:params[2]}).$promise.then(function(res) {
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
    }

})(angular);