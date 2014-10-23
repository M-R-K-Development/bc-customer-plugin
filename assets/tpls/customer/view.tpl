<div class="panel panel-default">
    <div class="panel-heading">
        Customer Details - {{  customer.firstName }} {{ customer.middleName }} {{ customer.lastName }}
    </div>

<div class="panel panel-default">
    <div class="panel-body">
        <!-- basic -->
        <div class="row">
            <div class="col-sm-4">Customer Basic</div>
            <div class="col-sm-8">

                <pre>
                    {{ customer | json }}
                </pre>
            </div>
        </div>


        <!-- additional -->
        <div class="row">
            <div class="col-sm-4">Customer Additional</div>
            <div class="col-sm-8">

                <pre>
                    {{ contactdata | json }}
                </pre>
            </div>
        </div>

        <!-- title -->
        <div class="row">
            <div class="col-sm-4">title type</div>
            <div class="col-sm-8">

                <pre>
                    {{ titleType  | json }}
                </pre>
            </div>
        </div>

        <!-- customer -->
        <div class="row">
            <div class="col-sm-4">customer type</div>
            <div class="col-sm-8">

                <pre>
                    {{ customerType  | json }}
                </pre>
            </div>
        </div>

        <!-- lead source -->
        <div class="row">
            <div class="col-sm-4">lead source type</div>
            <div class="col-sm-8">

                <pre>
                    {{ leadSourceType  | json }}
                </pre>
            </div>
        </div>

        <!-- industry -->
        <div class="row">
            <div class="col-sm-4">industry type</div>
            <div class="col-sm-8">

                <pre>
                    {{ industryType  | json }}
                </pre>
            </div>
        </div>

        <!-- rating -->
        <div class="row">
            <div class="col-sm-4">rating type</div>
            <div class="col-sm-8">

                <pre>
                    {{ ratingType  | json }}
                </pre>
            </div>
        </div>



        <!-- addresses -->
        <div class="row">
            <div class="col-sm-4">addresses</div>
            <div class="col-sm-8">

                <pre>
                    {{ addresses  | json }}
                </pre>
            </div>
        </div>


        <!-- orders -->
        <div class="row">
            <div class="col-sm-4">orders</div>
            <div class="col-sm-8">

                <pre>
                    {{ orders  | json }}
                </pre>
            </div>
        </div>


        <!-- securezones -->
        <div class="row">
            <div class="col-sm-4">securezones</div>
            <div class="col-sm-8">

                <pre>
                    {{ securezones  | json }}
                </pre>
            </div>
        </div>


    </div>
</div>


</div>