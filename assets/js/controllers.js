function ListingCtrl($scope, Customers, $window, $routeParams){
    $scope.response = Customers.query({offset: 0, limit: 10});
};

function CustomertypeslistCtrl($scope, Customertypes, $window, $routeParams){
	$scope.response =  Customertypes.query();
};

function IndustrytypeslistCtrl($scope, Industrytypes, $window, $routeParams){
	$scope.response = Industrytypes.query();
};

function LeadsourcetypeslistCtrl($scope, Leadsourcetypes, $window, $routeParams){
	$scope.response = Leadsourcetypes.query();
};

function TitlestypeslistCtrl($scope, Titletypes, $window, $routeParams){
	$scope.response = Titletypes.query();
};