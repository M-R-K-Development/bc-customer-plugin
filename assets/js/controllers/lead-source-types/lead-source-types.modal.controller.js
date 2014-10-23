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


    $scope.save = function(){
        if($scope.lead.id){
            $scope.update();
        } else {
            $scope.store();
        }
    }


    /**
     * Update leadsource
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
     * Create lead source type.
     *
     * @return {[type]} [description]
     */
    $scope.store = function(){
        Leadsourcetypes.store($scope.lead).$promise.
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