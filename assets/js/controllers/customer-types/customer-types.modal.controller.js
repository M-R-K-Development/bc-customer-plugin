/**
 * Modal controller which handles Customer Type edits.
 *
 * @param {[type]} $scope          [description]
 * @param {[type]} $modalInstance  [description]
 * @param {[type]} customertype    [description]
 * @param {[type]} Customertypes   [description]
 */
function CustomertypeModalCtrl($scope, $modalInstance, customertype, Customertypes){
    /**
     * Passed selected Customer Type object
     *
     * @type {[type]}
     */
    $scope.customertype = customertype;


    /**
     * Wrapper save function
     *
     * @return {[type]} [description]
     */
    $scope.save = function(){
        if($scope.customertype.id){
            $scope.update();
        } else {
            $scope.store();
        }
    }



    /**
     * Update Customer Type
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
     * Create new customer type
     *
     * @return {[type]} [description]
     */
   $scope.store = function(){
        Customertypes.store($scope.customertype).$promise.
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