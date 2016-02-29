(function(angular) {
	'use strict';

	angular.module('waka').controller('questionEditorController', [
		'$scope', '$state', 'Question', 'Topic', 'iCookie', questionEditorController]);

	function questionEditorController($scope, $state, Question, Topic, iCookie) {
		var vm = this;

		vm.querySearch = querySearch;
		vm.allTopics = [];
		vm.topics = [];
		vm.filterSelected = true;
		vm.content = '';
		vm.contentHtml = '';
		vm.title = '';
		vm.simplemde = '';
		vm.submit = submitQuestion;

		loadTopics();

		function getContent() {
			if (!vm.simplemde) alert('getContent error');
			else {
				vm.content = vm.simplemde.value();
				vm.contentHtml = vm.simplemde.markdown(vm.simplemde.value());
			}
		}

		function submitQuestion() {
			if (!vm.title || !vm.topics) {
				alert("标题跟话题分类不能为空");
				return ;
			}
			var topicsId = vm.topics.map(function(item) {
				return item._id;
			});
			getContent();
			var params = {
				title: vm.title,
				topics: topicsId,
				content: vm.content,
				contentHtml: vm.contentHtml,
				author_id: iCookie.getCookie("uid")
			};
			console.log(params);
			Question.add(JSON.stringify(params)).$promise.then(function(res) {
				if (res.status === -1) {
					alert("添加问题失败");
				} else {
					console.log("添加问题成功");
					$state.go("question", {question_id:res.data._id});
				}
			});
		}

		function querySearch(query) {
			var results = query ?
				vm.allTopics.filter(createFilterFor(query)) : [];
			return results;
		}

		function createFilterFor(query) {
			return function filterFn(topic) {
				return (topic.indexOf(query) !== -1);
			}
		}

		function loadTopics() {
			Topic.list().$promise.then(function(res) {
				vm.allTopics = res.data;
			});
		}
	}
})(angular);
