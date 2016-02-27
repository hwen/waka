(function(angular) {
    'use strict';
    angular.module('waka').controller('questionController', ['$scope', '$state', 'Question',
        'Answer', questionController]);

    function questionController($scope, $state, Question, Answer) {
    	var vm = this;

    	vm.answerList = [];
    	vm.question = "";


    	getQuestion();

    	function getQuestion() {
    		var params = location.hash.split('/');
    		Question.get({question_id:params[1]}).$promise.then(function(res) {
    			if (res.status > -1) {
    				vm.question = res.data.question;
    				vm.question.author = res.data.author;
    				// vm.question.createdTime = 
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