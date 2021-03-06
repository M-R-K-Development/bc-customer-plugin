<div class="panel panel-default">
    <div class="panel-heading" style='height:50px'>
        <div class="pull-left">
            Industry Types
        </div>
        <div class="pull-right">
            <button class="btn btn-primary" ng-click='create()'>New Industry Type</button>
        </div>
    </div>

    <table class="table table-condensed">
        <thead>
            <th>ID</th>
            <th>Label</th>
            <th>Action</th>
        </thead>
        <tbody>
        	<tr ng-repeat="item in response.items">
            	<td>{{item.id}}</td>
                <td>{{item.label}}</td>
                <td><a href="javascript:void(0)" class="btn btn-default" ng-click='edit($index)'>Edit</a><a href="javascript:void(0)" class="btn btn-danger" ng-click='destroy($index)'>Delete</a></td>
            </tr>
        </tbody>
     </table>
     <div class="panel-footer text-center">
     	<pagination boundary-links="true" total-items="totalItems" ng-model="currentPage" class="pagination-md" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" max-size='10'></pagination>
     </div>
</div>

    <script type='text/ng-template' id='industry-form.html'>

        <div class="modal-header">
            <button type="button" class="close" ng-click='close()' aria-hidden="true">&times;</button>
            <h4 class="modal-title"><span ng-show='industry.id'>Edit</span><span ng-hide='industry.id'>New</span> Industry Type</h4>
        </div>

        <div class="modal-body">
                <form class="form-horizontal col-sm-12" role="form" ng-submit='save()'>
                <div class="form-group">
                    <label  class="col-sm-12">Label</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" ng-model='industry.label' required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-default" ng-click='close()'>Close</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </div>
                </form>

        </div>
        <div class="modal-footer" style="clear:both;">

        </div>


    </script>