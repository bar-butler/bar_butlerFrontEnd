;(function() {
  "use strict";

  angular.module('InvAssist')

  .factory('UserFactory', ['$http', 'HEROKU', '$location', '$cookieStore',

    function($http, HEROKU, $location, $cookieStore){

      var currentUser = function(){
        return $cookieStore.get('auth_token');
      };

      var userDetails = function () {
        return $cookieStore.get('user_object');
      };

      var checkLoginStatus = function(){
        var userToken = currentUser();
        if (userToken){
          HEROKU.CONFIG.headers['auth_token'] = userToken;
        }
      };

      var getUser = function(userObj){
        return $http.get(HEROKU.URL + 'users/' + userObj.user.id, {header: HEROKU.CONFIG.headers});
      };

      var addUser = function(userObj){
       return $http.post(HEROKU.URL + 'users/', {user: userObj}, {header: HEROKU.CONFIG.headers});

      };

      var loginUser = function(userObj){
        return $http.post(HEROKU.URL + 'users/sign_in', {user: userObj});

      };

      var logoutUser = function(){
        $cookieStore.remove('auth_token');
        $cookieStore.remove('user_object');
        $location.path('#/');
      };


    return{
      user : currentUser,
      register : addUser,
      login : loginUser,
      logout : logoutUser,
      status : checkLoginStatus,
      get : getUser,
      userInfo: userDetails

    };

    }]);

  }());
