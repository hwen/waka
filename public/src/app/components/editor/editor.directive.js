(function(angular) {
	angular.module('waka').directive('myEditor', myEditor);

	function myEditor() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/editor/editor.html',
			scope: {},
			controller: editorController,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function editorController($scope, $state, Question, Answer) {
			var simplemde = new SimpleMDE({
				element: document.getElementById('editor')
		});
		}
	}
})(angular);