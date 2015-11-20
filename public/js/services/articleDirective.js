
//Directive qui n'as pas servi au finale J'ai essaye de resoudre un bug inexistant.
app.directive('dir', function($compile, $rootScope) {
    return {
        restrict: 'A',

        require: "ngModel",

        compile: function(element, attrs) {
			var html = '<span ng-show="editing">      Quantite: ';
            html += "<input id='inputId' ng-show='editing' type='number' ng-model='" + attrs.dirModel + "' />";
            element.replaceWith(html);
            return function(scope, element, attrs, ngModel) {
                $compile((element))(scope);
            };
        },
    };
});