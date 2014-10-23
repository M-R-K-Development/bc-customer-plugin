/**
 * Listing controller for customer titles
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} Titletypes   [description]
 * @param {[type]} $window      [description]
 * @param {[type]} $routeParams [description]
 * @param {[type]} $modal       [description]
 */
function TitlestypeslistCtrl($scope, Titletypes, $window, $routeParams, $modal, $window){
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
        Titletypes.query({skip: skip, limit: limit}).$promise.
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


        /**
     * Create modal.
     *
     * @return {[type]} [description]
     */
    $scope.create = function(){
        var modalInstance = $modal.open({
            templateUrl: 'title-form.html',
            controller: 'TitleModalCtrl',
            size: 'md',
            resolve: {
               title: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(title) {
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
            Titletypes.destroy(
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