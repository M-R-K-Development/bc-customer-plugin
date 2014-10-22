app.factory('Customers', ['$resource', function($resource){
	return $resource(
		'/webresources/api/v3/sites/current/customers/:id',
		{id : '@id'},
		{
			'get':    {method:'GET'},
		    'store':  {method:'POST'},
		    'update': {method:'PUT'},
		    'query':  {method:'GET'},
		    'destroy': {method:'DELETE'}
		}
	);
}]);

app.factory('Customertypes', ['$resource', function($resource){
	return $resource(
		'/webresources/api/v3/sites/current/customertypes/:id',
		{id : '@id'},
		{
			'get':    {method:'GET'},
		    'store':  {method:'POST'},
		    'update': {method:'PUT'},
		    'query':  {method:'GET'},
		    'destroy': {method:'DELETE'}
		}
	);
}]);

app.factory('Industrytypes', ['$resource', function($resource){
	return $resource(
		'/webresources/api/v3/sites/current/industrytypes/:id',
		{id : '@id'},
		{
			'get':    {method:'GET'},
		    'store':  {method:'POST'},
		    'update': {method:'PUT'},
		    'query':  {method:'GET'},
		    'destroy': {method:'DELETE'}
		}
	);
}]);

app.factory('Leadsourcetypes', ['$resource', function($resource){
	return $resource(
		'/webresources/api/v3/sites/current/leadsourcetypes/:id',
		{id : '@id'},
		{
			'get':    {method:'GET'},
		    'store':  {method:'POST'},
		    'update': {method:'PUT'},
		    'query':  {method:'GET'},
		    'destroy': {method:'DELETE'}
		}
	);
}]);

app.factory('Titletypes', ['$resource', function($resource){
	return $resource(
		'/webresources/api/v3/sites/current/titletypes/:id',
		{id : '@id'},
		{
			'get':    {method:'GET'},
		    'store':  {method:'POST'},
		    'update': {method:'PUT'},
		    'query':  {method:'GET'},
		    'destroy': {method:'DELETE'}
		}
	);
}]);

app.factory('Ratingtypes', ['$resource', function($resource){
	return $resource(
		'/webresources/api/v3/sites/current/ratingtypes/:id',
		{id : '@id'},
		{
			'get':    {method:'GET'},
		    'store':  {method:'POST'},
		    'update': {method:'PUT'},
		    'query':  {method:'GET'},
		    'destroy': {method:'DELETE'}
		}
	);
}]);