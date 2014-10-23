/**
 * Listing controller for customer types
 *
 * @param {[type]} $scope           [description]
 * @param {[type]} Customertypes    [description]
 * @param {[type]} $window          [description]
 * @param {[type]} $routeParams     [description]
 * @param {[type]} $modal           [description]
 */
function CustomertypeslistCtrl($scope, Customertypes, $window, $routeParams, $modal, $window){
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
     * Total count of customer types
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
     * Get Customer Type Listing
     *
     * @param  {[type]} skip   [description]
     * @param  {[type]} limit  [description]
     *
     * @return {[type]}        [description]
     */
    $scope.list = function(skip, limit){
        Customertypes.query({skip: skip, limit: limit}).$promise.
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


    /**
     * Trigger function for editing Customer Type.
     * Opens a modal.
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
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

    /**
     * Create modal.
     *
     * @return {[type]} [description]
     */
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: 'customertype-form.html',
            controller: 'CustomertypeModalCtrl',
            size: 'md',
            resolve: {
               customertype: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(customertype) {
            $window.location.reload();
        }, function() {
            // modal close - no action.
        });

    }


    /**
     * [destroy description]
     *
     * @param  {[type]} $index [description]
     *
     * @return {[type]}        [description]
     */
    $scope.destroy = function(index){
        if($window.confirm('Are you sure?')){
            Customertypes.destroy(
                   $scope.response.items[index],
                   function(response){
                        $window.location.reload();
                   },
                   function(errorResponse){
                        alert('Error deleting item')
                   }
           );
        }
    }
};