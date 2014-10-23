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
    $scope.customerType;
    $scope.industryType;
    $scope.leadSourceType;
    $scope.titleType;
    $scope.ratingType;


    /**
     * Get various type data related to the customer.
     *
     * @return {[type]} [description]
     */
    $scope.getTypeData = function(customer){
        Customertypes.get(
                    {id: customer.customerTypeId},
                    function(customerType){
                        $scope.customerType = customerType;
                    }
                );


        Industrytypes.get(
                    {id: customer.industryTypeId},
                    function(industryType){
                        $scope.industryType = industryType;
                    }
                );


        Leadsourcetypes.get(
                    {id: customer.leadSourceTypeId},
                    function(leadSourceType){
                        $scope.leadSourceType = leadSourceType;
                    }
                );


        Titletypes.get(
                    {id: customer.titleTypeId},
                    function(titleType){
                        $scope.titleType = titleType;
                    }
                );


        Ratingtypes.get(
                    {id: customer.ratingTypeId},
                    function(ratingType){
                        $scope.ratingType = ratingType;
                    }
                );

    }


        // customer details
        Customers.get(
            {id: $routeParams.id},
            function(response){
                $scope.getTypeData(response);
                $scope.customer = response;
            }
        );

        //Get additional data fields
        var fields = 'email1,email2,email3,homeFax,mobilePhone,pager,webAddress,workFax,workPhone,anniversary';
        //data
        Customers.contactdata({id: $routeParams.id, fields: fields }).$promise
            .then(function(response){
                $scope.contactdata = response;
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