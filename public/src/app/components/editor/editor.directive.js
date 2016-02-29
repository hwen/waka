(function(angular) {
	angular.module('waka').directive('myEditor', myEditor);

	function myEditor() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/editor/editor.html',
			//在引入directive的地方指明要绑定的父级属性或方法，需要把驼峰转换成-
			scope: {
				content: "=",
				drContentHtml: "=",
				simplemde: "="
			},
			controller: editorController,
			controllerAs: 'editor',
			bindToController: true
		};

		return directive;

		function editorController($scope, $state, Question, Answer) {
			var vm = this;
			var simplemde = new SimpleMDE({
				element: document.getElementById('editor')
			});

			initContent();

			vm.simplemde = simplemde;
			vm.submit = function() {

			};

			vm.show = function() {
				console.log(simplemde.markdown(simplemde.value()));
				alert(simplemde.value());
			};

			function initContent() {
				simplemde.value(vm.content);
			}

		}
	}
})(angular);
