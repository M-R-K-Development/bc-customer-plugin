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
     * Passed selected industry object
     *
     * @type {[type]}
     */
    $scope.industry = industry;

    $scope.save = function(){
        if($scope.industry.id){
            $scope.update();
        } else {
            $scope.store();
        }
    }

    /**
     * Update industry type
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
     * Create new industry type
     *
     * @return {[type]} [description]
     */
    $scope.store = function(){
        Industrytypes.store($scope.industry).$promise.
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