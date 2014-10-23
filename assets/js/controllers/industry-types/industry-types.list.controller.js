/**
 * Listing controller for industry types
 *
 * @param {[type]} $scope           [description]
 * @param {[type]} Industrytypes    [description]
 * @param {[type]} $window          [description]
 * @param {[type]} $routeParams     [description]
 * @param {[type]} $modal           [description]
 */
function IndustrytypeslistCtrl($scope, Industrytypes, $window, $routeParams, $modal, $window){
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
     * Total count of response
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
     * Get Industry Listing
     *
     * @param  {[type]} skip   [description]
     * @param  {[type]} limit  [description]
     *
     * @return {[type]}        [description]
     */
    $scope.list = function(skip, limit){
        Industrytypes.query({skip: skip, limit: limit}).$promise.
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
     * Trigger function for editing Industry.
     * Opens a modal.
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */

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


    /**
     * [create description]
     *
     * @return {[type]} [description]
     */
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: 'industry-form.html',
            controller: 'IndustryModalCtrl',
            size: 'md',
            resolve: {
               industry: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(industry) {
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
            Industrytypes.destroy(
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