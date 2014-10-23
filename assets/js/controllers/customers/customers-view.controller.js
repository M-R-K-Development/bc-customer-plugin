/**
 * Controller for customer details page
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} $routeParams [description]
 */
function CustomerViewCtrl($scope, $routeParams, Customers, Customertypes, Industrytypes, Leadsourcetypes, Titletypes, Ratingtypes){
    $scope.customer;
    $scope.orders;
    $scope.addresses;
    $scope.securezones;
    $scope.contactdata;
    $scope.customerType, $scope.industryType, $scope.leadSourceType, $scope.titleType, $scope.ratingType;


    /**
     * Get various type data related to the customer.
     *
     * @return {[type]} [description]
     */
    $scope.getTypeData = function(customer){
        Customertypes.get({id: customer.customerTypeId}).$promise
            .then(function(customerType){
                console.log(customerType);
            });

    }


    // customer details
    Customers.get({id: $routeParams.id, fields: fields}).$promise
        .then(function(response){
            $scope.getTypeData(response);
            $scope.customer = response;
            console.log('calling type data');
        });

    //Get additional data fields
    var fields = 'email1,email2,email3,homeFax,mobilePhone,pager,webAddress,workFax,workPhone,anniversary';
    //data
    Customers.contactdata({id: $routeParams.id, fields: fields }).$promise
        .then(function(response){
            $scope.contactdata = response.items;
        });

    //orders
    Customers.orders({id: $routeParams.id, skip:0, limit:200}).$promise
        .then(function(response){
            $scope.orders = response.items;
        });


    //addresses
    Customers.addresses({id: $routeParams.id, skip:0, limit:200}).$promise
        .then(function(response){
            $scope.addresses = response.items;
        });


    //securezones
    Customers.securezones({id: $routeParams.id, skip:0, limit:200}).$promise
        .then(function(response){
            $scope.securezones = response.items;
        });


}