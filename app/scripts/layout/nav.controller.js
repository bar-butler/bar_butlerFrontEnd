;(function (){

  'use strict';

  angular.module('InvAssist')

  .controller('NavController', ['$scope', 'UserFactory', '$location',

    function ($scope, UserFactory, $location) {

      var user = UserFactory.user();

      if (user) {
        $scope.loggedin = true;
        $scope.user = user;
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
      };



    }

  ]);

}());
