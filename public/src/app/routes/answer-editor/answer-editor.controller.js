(function(angular) {
	'use strict';

	angular.module('waka').controller('answerEditorController', [
		'$scope', '$state', 'Question', 'Answer', 'iCookie', answerEditorController]);

	function answerEditorController($scope, $state, Question, Answer, iCookie) {
		var vm = this;
		var question_id = location.hash.split('/')[2];
		var author_id = iCookie.getCookie("uid");
		var answer_id = '';

		vm.simplemde = '';
		vm.content = '';
		vm.contentHtml = '';
		vm.title = '';
		vm.hasAnswer = false;
		vm.addAnswer = addAnswer;
		vm.updateAnswer = updateAnswer;

		init();

		function addAnswer() {
			getContent();
			var params = {
				question_id: question_id,
				author_id: author_id,
				content: vm.content,
				contentHtml: vm.contentHtml
			};
			console.log(params);
			Answer.add(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.status > -1) {
						alert("添加回答成功");
					} else {
						alert("添加回答失败");
					}
				});
		}

		function updateAnswer() {
			getContent();
			var params = {
				_id: answer_id,
				author_id: author_id,
				content: vm.content,
				contentHtml: vm.contentHtml
			};
			console.log(params);
			Answer.update(JSON.stringify(params))
				.$promise
				.then(function(res) {
					console.log(res);
					if (res.status > -1) {
						alert("更新回答成功");
					} else {
						alert("更新回答失败");
					}
				});
		}

		function init() {
			var params = {
				question_id: question_id,
				author_id: author_id
			};
			console.log(params);
			Answer.getByUserAndQuestion(JSON.stringify(params))
				.$promise
				.then(function(res) {
					if (res.data[0]) {
						var data = res.data[0];
						vm.hasAnswer = true;
						vm.content = data.answer.content;
						vm.title = data.question.title;
						answer_id = data.answer._id;
					} else {
						getQuestion(question_id);
					}
				});
		}

		function getQuestion(question_id) {
			Question.get({question_id:question_id})
				.$promise
				.then(function(res) {
					var data = res.data[0];
					vm.title = data.question.title;
				});
		}

		function getContent() {
			if (!vm.simplemde) alert('getContent error');
			else {
				vm.content = vm.simplemde.value();
				vm.contentHtml = vm.simplemde.markdown(vm.simplemde.value());
			}
		}
	}
})(angular);
