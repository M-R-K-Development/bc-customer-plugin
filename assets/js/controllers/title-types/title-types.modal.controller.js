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
     * Wrapper save function
     *
     * @return {[type]} [description]
     */
    $scope.save = function(){
        if($scope.title.id){
            $scope.update();
        } else {
            $scope.store();
        }
    }


    /**
     * [store description]
     *
     * @return {[type]} [description]
     */
    $scope.store = function(){
        Titletypes.store($scope.title).$promise.
            then(function(response){
                $modalInstance.close($scope.title);
            },
            function(errorResponse){
                alert('Error creating label');
            });

    }


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