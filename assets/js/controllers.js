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
     * @param  {[type]} skip [description]
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

function CustomertypeslistCtrl($scope, Customertypes, $window, $routeParams){
	$scope.response =  Customertypes.query();
};

function IndustrytypeslistCtrl($scope, Industrytypes, $window, $routeParams){
	$scope.response = Industrytypes.query();
};

function LeadsourcetypeslistCtrl($scope, Leadsourcetypes, $window, $routeParams){
	$scope.response = Leadsourcetypes.query();
};


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