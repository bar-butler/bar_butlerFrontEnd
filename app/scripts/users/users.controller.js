;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('UserController', ['$scope', 'UserFactory', '$location',

    function($scope, UserFactory, $location){

      var user = UserFactory.user();

        $scope.loginUser = function(userObj){
          UserFactory.login(userObj);
        };

        $scope.registerUser = function(userObj){
          UserFactory.register(userObj);
        };

    }

  ]);

}());
