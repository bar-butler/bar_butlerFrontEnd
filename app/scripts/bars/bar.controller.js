(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('BarController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore',

  function($scope, BarFactory, $location, $routeParams, $cookieStore){

      $scope.beers = [];

      BarFactory.get().success(function(response){
        $scope.beers = response.listings;
        console.log(response);
      })
      .error(function(res){
        console.log(res);
      });

      $scope.addBeer = function(beerObj){

        $scope.beer = {};
        $cookieStore.get('auth_token');
        BarFactory.add(beerObj).success(function(results){
          console.log(results);
        });
      };

      $scope.deleteMe = function(id, index){
        BarFactory.del(id).success(function(res){
          $scope.beers.splice(index, 1);
          console.log(response);
        });
      };

      $scope.oneBeer = function(){
        BarFactory.one($routeParams.id).success(function(res){
          console.log(res);
          $scope.beer = res.listing;
        });
      };



    }

  ]);

}());
