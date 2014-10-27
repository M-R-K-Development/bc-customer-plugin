/**
 * Customer listing controller.
 * Handles logic related to customer listing / querying.
 *
 * @param {[type]} $scope       [description]
 * @param {[type]} Customers    [description]
 * @param {[type]} $window      [description]
 * @param {[type]} $routeParams [description]
 */
function ListingCtrl($scope, Customers, $window, $routeParams, $location){

    /**
     * Max items per page.
     *
     * @type {Number}
     */
    $scope.itemsPerPage = 10;


    /**
     * Available options for items per page.
     *
     * @type {Array}
     */
    $scope.itemsPerPageOptions = [10, 25, 50, 100];

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
     * Currently selected index.
     */
    $scope.selectedIndex;

    /**
    * Filter enabled
    */

    $scope.filteractive = false;

    $scope.filterterms;

    $scope.filtervalue;

    $scope.filterlabel;

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
     * Watching itemsPerPage number which triggers
     * listing call in return.
     *
     * @param  {[type]} newValue [description]
     * @param  {[type]} oldValue [description]
     *
     * @return {[type]}          [description]
     */
    $scope.$watch('itemsPerPage',function(){
        var skip = $scope.currentPage * $scope.itemsPerPage;
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
        if($scope.filteractive==true){

            $scope.filterterms = '{"'+$scope.filterlabel+'": {"$contains":"'+$scope.filtervalue+'"}}';

            Customers.query({skip: skip, limit: limit, where: $scope.filterterms}).$promise.
                then(function(response){
                    $scope.selectedIndex = null;
                    $scope.response = response;
                    $scope.totalItems = response.totalItemsCount;
                });


        }else{
            Customers.query({skip: skip, limit: limit}).$promise.
                then(function(response){
                    $scope.selectedIndex = null;
                    $scope.response = response;
                    $scope.totalItems = response.totalItemsCount;
                });
        }
    }


    /**
     * trigger for customer view page
     *
     * @param  {[type]} index [description]
     *
     * @return {[type]}       [description]
     */
    $scope.view = function(index){
        var customer = $scope.response.items[index];
        $location.path('/customers/view/' + customer.id)
    }


    $scope.filter = function(){
        $scope.filteractive = true;

        if($scope.currentPage != 1) {
            $scope.currentPage = 1;
        } else {
            $scope.list(0, $scope.itemsPerPage);
        }

    }

    $scope.clearfilter = function(){
        $scope.filteractive = false;
        $scope.filterlabel = "";
        $scope.filtervalue = "";
        if($scope.currentPage != 1) {
            $scope.currentPage = 1;
        } else {
            $scope.list(0, $scope.itemsPerPage);
        }
    }


    /**
     * Finds duplicates for a given customer
     *
     * @param  {[type]} customer [description]
     *
     * @return {[type]}          [description]
     */
    $scope.findDuplicates = function(index){
        $scope.selectedIndex = index;
        var customer = $scope.response.items[index];
        var duplicates = [];

        var where = '{' +
                '"firstName" : {"$contains" : "' + customer.firstName + '"},' +
                '"lastName" : {"$contains" : "' + customer.lastName + '"},' +
                '"id" : {"$ne" : ' + customer.id+ '}' +
                '}';


        Customers.query({skip: 0, limit: 100, where: where}).$promise.
            then(function(response){
                if(response.items.length){
                    var ids = [];
                    angular.forEach(response.items, function(customer){
                        ids.push(customer.id);
                    });

                    alert('Duplicates found with customer ID - ' + ids.join(', ') );


                } else {
                    alert('No duplicates found');
                }
            });
    }


    /**
     * [mergeContact description]
     *
     * @param  {[type]} from [description]
     * @param  {[type]} to   [description]
     *
     * @return {[type]}      [description]
     */
    $scope.mergeContact = function(from, to){

    }

    /**
     * Initialize current page. This will trigger the scope watch
     * and hence listing
     *
     * @type {Number}
     */
    $scope.currentPage = 1;
};