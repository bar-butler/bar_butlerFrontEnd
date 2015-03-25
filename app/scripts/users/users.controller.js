;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('UserController', ['$scope', 'UserFactory', '$location', '$cookieStore', 'HEROKU', '$rootScope',

    function($scope, UserFactory, $location, $cookieStore, HEROKU, $rootScope){

      var user = UserFactory.user();


        $scope.loginUser = function(userObj, id){
          UserFactory.login(userObj).success(function(results){
            userObj = results;
            $cookieStore.put('auth_token', results.user.authentication_token);
            $cookieStore.put('user_object', results.user);
            HEROKU.CONFIG.headers['auth_token'] = results.user.authentication_token;
            console.log(userObj.user.id);
            $rootScope.userHome = userObj.user.id;
            $location.path(userObj.user.id);
          });

        };

        $scope.registerUser = function(userObj, id){
          UserFactory.register(userObj).success(function(results){
            userObj = results;
            $cookieStore.put('auth_token', results.user.authentication_token);
            $cookieStore.put('user_object', results.user);
            HEROKU.CONFIG.headers['auth_token'] = results.user.authentication_token;
            // console.log(results.id)
            $location.path(userObj.user.id);
          });
        };

    }

  ]);

}());
