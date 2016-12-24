//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
            templateUrl     : 'views/index-view.html',
            // Which controller it should use 
            controller      : 'getdataController',
            // what is the alias of that controller.
            controllerAs    : 'getdata'
        })
        .when('/getsachindata',{
            // location of the template
            templateUrl     : 'views/sachin-view.html',
            // Which controller it should use 
            controller      : 'getdataController',
            // what is the alias of that controller.
            controllerAs    : 'getdata'
        })
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);