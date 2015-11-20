
//Controleur route /orders/:id
app.controller('OrderDetailsCtrl', ['$scope', '$routeParams', 'Orders', 'Articles',  '$location', function ($scope, $routeParams, Orders, Articles, $location) {
	$scope.order = Orders.orders.get({id: $routeParams.id });
	$scope.articles = Articles.query();
	$scope.selectedArticle = null;

	//methodes permettant l'ajout et la suppression d un article
	$scope.addArticle = function(){
		if ($scope.selectedArticle != null){
			var newArticle;
			newArticle = $scope.selectedArticle;
			Orders.addArticle.update({id: $scope.order._id}, newArticle, function(data){
				console.log('Ajout d\'un nouvel article', data);
				if (data)
					$scope.order = Orders.orders.get({id: $routeParams.id });
			});
		}
	}
	$scope.removeArticle = function(index){
		Orders.removeArticle.update({id: $scope.order._id}, $scope.articles[index], function(){
			$scope.order = Orders.orders.get({id: $routeParams.id });
		});
	}
	//classique crud
	$scope.update = function(){
		var order = $scope.order;
		Orders.orders.update({id: order._id}, order);
		$scope.editing = false;
	}
	$scope.edit = function(){
		$scope.editing = angular.copy($scope.order);
	}
	$scope.cancel = function(){
		$scope.order = angular.copy($scope.editing);
		$scope.editing = false;
	}
	$scope.remove = function(){
		Orders.orders.remove({id: $scope.order._id}, function(){
				$location.url('/');
		});
	}
}]);