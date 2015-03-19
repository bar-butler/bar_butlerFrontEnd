;(function() {
  "use strict";


  angular.module('InvAssist', ['ngCookies', 'ngRoute'])

  .constant('HEROKU', {
    URL: 'https://bar-butler.herokuapp.com/',
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
    })

    .when('/:id', {
      templateUrl: 'scripts/bars/profile.temp.html',
      controller: 'BarController'
    })

    .when('/:id/add', {
      templateUrl: 'scripts/bars/addbooze.temp.html',
      controller: 'BarController'
    });



  }])

  .run(function ($rootScope, UserFactory) {

      $rootScope.$on('$routeChangeStart', function () {
        UserFactory.status();
      });

  });

}());
