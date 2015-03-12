;(function() {
  "use strict";


  angular.module('InvAssist', ['ngCookies', 'ngRoute'])

  .constant('HEROKU', {
    URL: 'https://inventory-assist.herokuapp.com/',
    CONFIG: {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

  })

  .config(['$routeProvider', function($routeProvider){

    $routeProvider

    .when('/', {
      templateUrl: 'scripts/users/users.login.temp.html',
      controller: 'UserController'
    })

    .when('/register', {
      templateUrl: 'scripts/users/users.register.temp.html',
      controller: 'UserController'
    });

  }]);

}());
