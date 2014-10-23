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


    $scope.save = function(){
        if($scope.rating.id){
            $scope.update();
        } else {
            $scope.store();
        }
    }


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
     * New rating type
     *
     * @return {[type]} [description]
     */
    $scope.store = function(){
        Ratingtypes.store($scope.rating).$promise.
            then(function(response){
                $modalInstance.close({});
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