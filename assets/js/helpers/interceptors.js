
app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers['Authorization'] = API_KEY;
      config.headers['Content-Type'] = 'application/json';
      return config;
    }
  };
});

app.factory('httpResponseInterceptor', function ($q) {
  return {
    response: function (response) {
        if(response.data && response.data.token){
          API_KEY = response.data.token;
        }

        return response;
    },
    responseError: function (response) {
        if(response.data && response.data.token){
          API_KEY = response.data.token;
        }
        // do something on error
        return $q.reject(response);
    }
  };
});




app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
  $httpProvider.interceptors.push('httpResponseInterceptor');
});


// not a great place to put a directive. Placing here to make it globally available.
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});