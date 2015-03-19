(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('BarController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore',

  function($scope, BarFactory, $location, $routeParams, $cookieStore){

      $scope.beers = [];

      BarFactory.get().success(function(response){
        $scope.beers = response.beers;
        console.log(response);
      })
      .error(function(res){
        console.log(res);
      });

      $scope.addBeer = function(beerObj){

        $scope.beer = {};
        $cookieStore.get('auth_token');
        BarFactory.add(beerObj).success(function(results){
        });
      };

      $scope.deleteMe = function(id, index){
        BarFactory.del(id).success(function(res){
          $scope.beers.splice(index, 1);
          console.log(res);
        });
      };

      $scope.oneBeer = function(beerObj){
        $scope.beer = $routeParams.beerid;
        BarFactory.one(beerObj).success(function(res){
          console.log(beerObj.id);
          $location.path(beerObj.id);
        });
      };



    }

  ]);

}());
