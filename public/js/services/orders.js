

//service Order J'ai utilise $ressource pour faire mes requetesen personalisant les differents updates possibles.
app.factory('Orders', ['$resource', function($resource){
	return {
		orders : $resource('/orders/:id', null, {
			'update': { method:'PUT' }
		}),
		addArticle : $resource('/orders/:id/newArticle', null, {
			'update': { method:'PUT' }
		}),
		removeArticle : $resource('/orders/:id/removeArticle', null, {
			'update': { method:'PUT' }
		})
	};
}]);
