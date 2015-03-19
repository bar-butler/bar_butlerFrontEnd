(function() {
  "use strict";

  angular.module('InvAssist')

  .factory('BarFactory', ['$http', 'HEROKU', 'UserFactory', '$routeParams',

   function($http, HEROKU, UserFactory, $routeParams){

     var userToken = UserFactory.user();
     var userObj = UserFactory.userInfo();

     var getBeers = function(id){
      return $http.get(HEROKU.URL + 'users/' + userObj.id + '/beers', HEROKU.CONFIG);

    };

     var addBeer = function(beerObj){
       console.log(beerObj);
       return $http.post(HEROKU.URL + 'users/' + userObj.id + '/beers', beerObj, HEROKU.CONFIG);
     };

     var delBeer = function(beerObj, id){
       console.log(beerObj);
       return $http.delete(HEROKU.URL + 'users/' + userObj.id + '/beers/' + beerObj, HEROKU.CONFIG);
     };

     var getOneBeer = function(beerObj, id){
       console.log(beerObj);
       return $http.get(HEROKU.URL + 'users/' + userObj.id + '/beers/' + beerObj.id, HEROKU.CONFIG);
     };

     return{
       get : getBeers,
       add : addBeer,
       del : delBeer,
       one : getOneBeer
     };

    }



   ]);

}());
