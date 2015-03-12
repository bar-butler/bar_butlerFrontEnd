;(function() {
  "use strict";

  angular.module('InvAssist')

  .factory('UserFactory', ['$http', 'HEROKU', '$location', '$cookieStore',

    function($http, HEROKU, $location, $cookieStore){

      var currentUser = function(){
        return $cookieStore.get('auth_token');
      };

      var checkLoginStatus = function(){
        var user = currentUser();
        if (user){
          HEROKU.CONFIG.headers['auth_token'] = user;
        }
      };

      var addUser = function(userObj){
        $http.post(HEROKU.URL + 'users', {user: userObj}, HEROKU.CONFIG)
        .success(function(res){
          console.log(res);
          $cookieStore.put('auth_token', res.user.authentication_token);
          HEROKU.CONFIG.headers['auth_token'] = res.user.authentication_token;
          return $location.path(':id');
        });
      };

      var loginUser = function(userObj){
        $http.post(HEROKU.URL + 'users/sign_in', {user: userObj})
        .success(function(res){
          console.log(res);
          $cookieStore.put('auth_token', res.user.authentication_token);
          HEROKU.CONFIG.headers['auth_token'] = res.user.authentication_token;
        });
      };

      var logoutUser = function(){
        $cookieStore.remove('auth_token');
        $location.path('#/');
      };


    return{
      user : currentUser,
      register : addUser,
      login : loginUser,
      logout : logoutUser,
      status : checkLoginStatus

    };

    }]);

  }());
