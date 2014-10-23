var app = angular.module('CustomersApp',['ngResource','ngRoute', 'ui.bootstrap']);


app.config(['$routeProvider',function($routeProvider) {
   $routeProvider
   .when('/list', {
    templateUrl: 'assets/tpls/customer/list.tpl',
    controller: 'ListingCtrl'
   })
   .when('/customers/view/:id', {
    templateUrl: 'assets/tpls/customer/view.tpl',
    controller: 'CustomerViewCtrl'
   })
   .when('/leadsourcelist', {
    templateUrl: 'assets/tpls/leadsource/list.tpl',
    controller: 'LeadsourcetypeslistCtrl'
   })
   .when('/customertypelist', {
    templateUrl: 'assets/tpls/customertypes/list.tpl',
    controller: 'CustomertypeslistCtrl'
   })
   .when('/titletypelist', {
    templateUrl: 'assets/tpls/title/list.tpl',
    controller: 'TitlestypeslistCtrl'
   })
   .when('/indutrytypeslist', {
    templateUrl: 'assets/tpls/industry/list.tpl',
    controller: 'IndustrytypeslistCtrl'
   })
   .when('/ratingtypeslist', {
    templateUrl: 'assets/tpls/ratings/list.tpl',
    controller: 'RatingtypeslistCtrl'
   })
   .otherwise({
		redirectTo: '/list'
	});
}]);