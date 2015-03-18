(function() {
  "use strict";

  angular.module('InvAssist')

  .factory('BarFactory', ['$http', 'HEROKU', 'UserFactory', '$routeParams',

   function($http, HEROKU, UserFactory, $routeParams){

     var userToken = UserFactory.user();
     var userObj = UserFactory.userInfo();
     console.log(userToken);


     var getBeers = function(id){
      return $http.get(HEROKU.URL + 'users/' + userObj.id + '/beers', HEROKU.CONFIG);

    };

     var addBeer = function(beerObj){
       return $http.post(HEROKU.URL + 'users/' + userObj.id + '/beers', beerObj, HEROKU.CONFIG);
     };

     return{
       get : getBeers,
       add : addBeer
     };

    }



   ]);

}());
