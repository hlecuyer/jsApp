

//service Article avec utilisation de $ressource
app.factory('Articles', ['$resource', function($resource){
	return $resource('/articles/:id', null, {
		'update': { method:'PUT' }
	});
}]);
