/**
 * Customer listing controller.
 * Handles logic related to customer listing / querying.
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} Customers    [description]
 * @param {[type]} $window      [description]
 * @param {[type]} $routeParams [description]
 */
function ListingCtrl($scope, Customers, $window, $routeParams){
    /**
     * Max items per page.
     *
     * @type {Number}
     */
    $scope.itemsPerPage = 10;

    /**
     * Current page number
     */
    $scope.currentPage;

    /**
     * Total count of customer
     */
    $scope.totalItems;

    /**
     * response object for the current page number
     */
    $scope.response;

    /**
     * Watching currentPage number which triggers
     * listing call in return.
     *
     * @param  {[type]} newValue [description]
     * @param  {[type]} oldValue [description]
     *
     * @return {[type]}          [description]
     */
    $scope.$watch('currentPage',function(newValue, oldValue){
        if(!newValue){
            return;
        }

        var skip = (newValue - 1) * $scope.itemsPerPage;
        $scope.list(skip, $scope.itemsPerPage);
    });

    /**
     * Get Customer Listing
     *
     * @param  {[type]} skip   [description]
     * @param  {[type]} limit  [description]
     *
     * @return {[type]}        [description]
     */
    $scope.list = function(skip, limit){
        Customers.query({skip: skip, limit: limit}).$promise.
            then(function(response){
                $scope.response = response;
                $scope.totalItems = response.totalItemsCount;
            });
    }


    /**
     * Initialize current page. This will trigger the scope watch
     * and hence listing
     *
     * @type {Number}
     */
    $scope.currentPage = 1;
};

/**
 * Listing controller for customer types
 *
 * @param {[type]} $scope           [description]
 * @param {[type]} Customertypes    [description]
 * @param {[type]} $window          [description]
 * @param {[type]} $routeParams     [description]
 * @param {[type]} $modal           [description]
 */
function CustomertypeslistCtrl($scope, Customertypes, $window, $routeParams, $modal){
	$scope.response =  Customertypes.query();
	
	$scope.edit = function(index){
        var modalInstance = $modal.open({
            templateUrl: 'customertype-form.html',
            controller: 'CustomertypeModalCtrl',
            size: 'md',
            resolve: {
               customertype: function() {
                    return angular.copy($scope.response.items[index]);
                }
            }
        });

        modalInstance.result.then(function(customertype) {
           $scope.response.items[index] = customertype;
        }, function() {
            // modal close - no action.
        });

    }
};

/**
 * Modal controller which handles Customer Type edits.
 *
 * @param {[type]} $scope          [description]
 * @param {[type]} $modalInstance  [description]
 * @param {[type]} customertype        [description]
 * @param {[type]} Customertypes   [description]
 */
function CustomertypeModalCtrl($scope, $modalInstance, customertype, Customertypes){
    /**
     * Passed selected lead object
     *
     * @type {[type]}
     */
    $scope.customertype = customertype;

    /**
     * Update rating
     *
     * @return {[type]} [description]
     */
    $scope.update = function(){
        Customertypes.update($scope.customertype).$promise.
            then(function(response){
                $modalInstance.close($scope.customertype);
            },
            function(errorResponse){
                alert('Error updating label');
            });
    }


    /**
     * Closes the modal.
     *
     * @return {[type]} [description]
     */
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }

}

/**
 * Listing controller for industry types
 *
 * @param {[type]} $scope           [description]
 * @param {[type]} Industrytypes    [description]
 * @param {[type]} $window          [description]
 * @param {[type]} $routeParams     [description]
 * @param {[type]} $modal           [description]
 */
function IndustrytypeslistCtrl($scope, Industrytypes, $window, $routeParams, $modal){
	$scope.response = Industrytypes.query();

    $scope.edit = function(index){
        var modalInstance = $modal.open({
            templateUrl: 'industry-form.html',
            controller: 'IndustryModalCtrl',
            size: 'md',
            resolve: {
               industry: function() {
                    return angular.copy($scope.response.items[index]);
                }
            }
        });

        modalInstance.result.then(function(industry) {
           $scope.response.items[index] = industry;
        }, function() {
            // modal close - no action.
        });

    }
};

/**
 * Modal controller which handles Industry edits.
 *
 * @param {[type]} $scope          [description]
 * @param {[type]} $modalInstance  [description]
 * @param {[type]} industry        [description]
 * @param {[type]} Industrytypes   [description]
 */
function IndustryModalCtrl($scope, $modalInstance, industry, Industrytypes){
    /**
     * Passed selected lead object
     *
     * @type {[type]}
     */
    $scope.industry = industry;

    /**
     * Update rating
     *
     * @return {[type]} [description]
     */
    $scope.update = function(){
        Industrytypes.update($scope.industry).$promise.
            then(function(response){
                $modalInstance.close($scope.industry);
            },
            function(errorResponse){
                alert('Error updating label');
            });
    }


    /**
     * Closes the modal.
     *
     * @return {[type]} [description]
     */
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }

}
/**
 * Listing controller for leadsource types
 *
 * @param {[type]} $scope           [description]
 * @param {[type]} Leadsourcetype   [description]
 * @param {[type]} $window          [description]
 * @param {[type]} $routeParams     [description]
 * @param {[type]} $modal           [description]
 */
function LeadsourcetypeslistCtrl($scope, Leadsourcetypes, $window, $routeParams, $modal){
	$scope.response = Leadsourcetypes.query();

    $scope.edit = function(index){
        var modalInstance = $modal.open({
            templateUrl: 'lead-form.html',
            controller: 'LeadsourceModalCtrl',
            size: 'md',
            resolve: {
               lead: function() {
                    return angular.copy($scope.response.items[index]);
                }
            }
        });

        modalInstance.result.then(function(lead) {
           $scope.response.items[index] = lead;
        }, function() {
            // modal close - no action.
        });

    }
};

/**
 * Modal controller which handles Lead Source edits.
 *
 * @param {[type]} $scope          [description]
 * @param {[type]} $modalInstance  [description]
 * @param {[type]} lead            [description]
 * @param {[type]} Leadsourcetypes [description]
 */
function LeadsourceModalCtrl($scope, $modalInstance, lead, Leadsourcetypes){
    /**
     * Passed selected lead object
     *
     * @type {[type]}
     */
    $scope.lead = lead;


    /**
     * Update rating
     *
     * @return {[type]} [description]
     */
    $scope.update = function(){
        Leadsourcetypes.update($scope.lead).$promise.
            then(function(response){
                $modalInstance.close($scope.lead);
            },
            function(errorResponse){
                alert('Error updating label');
            });
    }


    /**
     * Closes the modal.
     *
     * @return {[type]} [description]
     */
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }

}

/**
 * Listing controller for rating types
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} Ratingtype   [description]
 * @param {[type]} $window      [description]
 * @param {[type]} $routeParams [description]
 * @param {[type]} $modal       [description]
 */
function RatingtypeslistCtrl($scope, Ratingtypes, $window, $routeParams, $modal){
	$scope.response = Ratingtypes.query();

    $scope.edit = function(index){
        var modalInstance = $modal.open({
            templateUrl: 'rating-form.html',
            controller: 'RatingModalCtrl',
            size: 'md',
            resolve: {
                rating: function() {
                    return angular.copy($scope.response.items[index]);
                }
            }
        });

        modalInstance.result.then(function(rating) {
           $scope.response.items[index] = rating;
        }, function() {
            // modal close - no action.
        });

    }
};

/**
 * Modal controller which handles title edits.
 *
 * @param {[type]} $scope          [description]
 * @param {[type]} $modalInstance  [description]
 * @param {[type]} rating          [description]
 * @param {[type]} Ratingtypes     [description]
 */
function RatingModalCtrl($scope, $modalInstance, rating, Ratingtypes){
    /**
     * Passed selected rating object
     *
     * @type {[type]}
     */
    $scope.rating = rating;


    /**
     * Update rating
     *
     * @return {[type]} [description]
     */
    $scope.update = function(){
        Ratingtypes.update($scope.rating).$promise.
            then(function(response){
                $modalInstance.close($scope.rating);
            },
            function(errorResponse){
                alert('Error updating label');
            });
    }


    /**
     * Closes the modal.
     *
     * @return {[type]} [description]
     */
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }

}

/**
 * Listing controller for customer titles
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} Titletypes   [description]
 * @param {[type]} $window      [description]
 * @param {[type]} $routeParams [description]
 * @param {[type]} $modal       [description]
 */
function TitlestypeslistCtrl($scope, Titletypes, $window, $routeParams, $modal){
	$scope.response = Titletypes.query();

    /**
     * Trigger function for editing title.
     * Opens a modal.
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
    $scope.edit = function(index){
        var modalInstance = $modal.open({
            templateUrl: 'title-form.html',
            controller: 'TitleModalCtrl',
            size: 'md',
            resolve: {
                title: function() {
                    return angular.copy($scope.response.items[index]);
                }
            }
        });

        modalInstance.result.then(function(title) {
           $scope.response.items[index] = title;
        }, function() {
            // modal close - no action.
        });



    }

};


/**
 * Modal controller which handles title edits.
 *
 * @param {[type]} $scope         [description]
 * @param {[type]} $modalInstance [description]
 * @param {[type]} title          [description]
 * @param {[type]} Titletypes     [description]
 */
function TitleModalCtrl($scope, $modalInstance, title, Titletypes){
    /**
     * Passed selected title object
     *
     * @type {[type]}
     */
    $scope.title = title;


    /**
     * Update title
     *
     * @return {[type]} [description]
     */
    $scope.update = function(){
        Titletypes.update($scope.title).$promise.
            then(function(response){
                $modalInstance.close($scope.title);
            },
            function(errorResponse){
                alert('Error updating label');
            });
    }


    /**
     * Closes the modal.
     *
     * @return {[type]} [description]
     */
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }

}