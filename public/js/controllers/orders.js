
//[hugo] Controller orders
app.controller('OrderController', ['$scope', 'Orders', '$location', function ($scope, Orders, $location) {
	$scope.orders = Orders.orders.query();

	$scope.save = function(){
		console.log('Ok');

		//ordernum est la variable que je voulais auto incrementer pour avoir une identifiant de commande plus joli
		var order = new Orders.orders({
			"orderNum": 1,
			"deliveryDate": new Date(),
			"status": "En cours",
			"articles": []
		});
		order.$save(function(data){
			$scope.orders.push(order);
			console.log(data);
			$location.url('/orders/' + data._id);
		});
	}

	$scope.goToArticles = function(){
		$location.url('/articles');
	};

	//Fonction asocier au bouton changer de status'
	$scope.changeStatus = function(index){
		var order = $scope.orders[index];
		order.status = "Terminee";
		Orders.orders.update({id: order._id}, order);
	}
}]);
