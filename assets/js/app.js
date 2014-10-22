var app = angular.module('CustomersApp',['ngResource','ngRoute', 'ui.bootstrap']);


app.config(['$routeProvider',function($routeProvider) {
   $routeProvider
   .when('/list', {
    templateUrl: 'assets/tpls/customer/list.html',
    controller: 'ListingCtrl'
   })
   .when('/leadsourcelist', {
    templateUrl: 'assets/tpls/leadsource/list.html',
    controller: 'LeadsourcetypeslistCtrl'
   })
   .when('/customertypelist', {
    templateUrl: 'assets/tpls/customertypes/list.html',
    controller: 'CustomertypeslistCtrl'
   })
   .when('/titletypelist', {
    templateUrl: 'assets/tpls/title/list.html',
    controller: 'TitlestypeslistCtrl'
   })
   .when('/indutrytypeslist', {
    templateUrl: 'assets/tpls/industry/list.html',
    controller: 'IndustrytypeslistCtrl'
   })
   .when('/ratingtypeslist', {
    templateUrl: 'assets/tpls/ratings/list.html',
    controller: 'RatingtypeslistCtrl'
   })
   .otherwise({
		redirectTo: '/list'
	});
}]);