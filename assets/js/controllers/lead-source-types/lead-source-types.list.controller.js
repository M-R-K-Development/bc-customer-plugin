/**
 * Listing controller for leadsource types
 *
 * @param {[type]} $scope           [description]
 * @param {[type]} Leadsourcetype   [description]
 * @param {[type]} $window          [description]
 * @param {[type]} $routeParams     [description]
 * @param {[type]} $modal           [description]
 */
function LeadsourcetypeslistCtrl($scope, Leadsourcetypes, $window, $routeParams, $modal, $window){
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
     * Get Leadsource Listing
     *
     * @param  {[type]} skip   [description]
     * @param  {[type]} limit  [description]
     *
     * @return {[type]}        [description]
     */
    $scope.list = function(skip, limit){
        Leadsourcetypes.query({skip: skip, limit: limit}).$promise.
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
     * Trigger function for editing Lead Source.
     * Opens a modal.
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
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


    /**
     * Create lead sourec type
     *
     * @return {[type]} [description]
     */
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: 'lead-form.html',
            controller: 'LeadsourceModalCtrl',
            size: 'md',
            resolve: {
               lead: function() {
                    return {}
                }
            }
        });

        modalInstance.result.then(function(lead) {
            $window.location.reload();
        }, function() {
            // modal close - no action.
        });

    }
};