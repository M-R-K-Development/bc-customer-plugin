/**
 * Listing controller for rating types
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} Ratingtype   [description]
 * @param {[type]} $window      [description]
 * @param {[type]} $routeParams [description]
 * @param {[type]} $modal       [description]
 */
function RatingtypeslistCtrl($scope, Ratingtypes, $window, $routeParams, $modal, $window){
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
        Ratingtypes.query({skip: skip, limit: limit}).$promise.
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
     * Trigger function for editing Rating.
     * Opens a modal.
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */

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


    /**
     * [create description]
     *
     * @return {[type]} [description]
     */
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: 'rating-form.html',
            controller: 'RatingModalCtrl',
            size: 'md',
            resolve: {
                rating: function() {
                    return {}
                 }
            }
        });

        modalInstance.result.then(function(rating) {
            $window.location.reload();
        }, function() {
            // modal close - no action.
        });

    }
};