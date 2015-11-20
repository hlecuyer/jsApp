//Controller route articles/:id
app.controller('ArticleDetailCtrl', ['$scope', '$routeParams', 'Articles', '$location', function ($scope, $routeParams, Articles, $location) {
	$scope.article = Articles.get({id: $routeParams.id });

	$scope.update = function(){
		var article = $scope.article;
		Articles.update({id: article._id}, article);
		$scope.editing = false;
	}

	$scope.edit = function(){
		$scope.editing = angular.copy($scope.article);
	}
	$scope.cancel = function(){
		$scope.article = angular.copy($scope.editing);
		$scope.editing = false;
		console.log($scope.article);
	}
	$scope.remove = function(){
		Articles.remove({id: $scope.article._id}, function(){
			$location.url('/articles');
		});
	}
}]);