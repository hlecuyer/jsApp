
//Controller articles
app.controller('ArticleController', ['$scope', 'Articles', '$location', function ($scope, Articles, $location) {
	$scope.articles = Articles.query();

	//Save permet de sauvegarder un nouvel article
	$scope.save = function(){
		console.log('Ok');
		if(!$scope.newArticle || $scope.newArticle.length < 1) return;
		var article = new Articles($scope.newArticle);
		article.$save(function(){
			$scope.articles.push(article);
			$scope.newArticle = ''; // clear textbox
		});
	}
	//Redirection sur la listes des ommandes
	$scope.goToOrders = function(){
		$location.url('/');
	};

}]);
