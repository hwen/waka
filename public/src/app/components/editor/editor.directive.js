(function(angular) {
	angular.module('waka').directive('myEditor', myEditor);

	function myEditor() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/editor/editor.html',
			scope: {

			},
			controller: editorController,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function editorController($scope, $state, Question, Answer) {
			var vm = this;
			var simplemde = new SimpleMDE({
				element: document.getElementById('editor')
			});

			vm.submit = function() {

			};

			vm.show = function() {
				console.log(simplemde.markdown(simplemde.value()));
			};

		}
	}
})(angular);