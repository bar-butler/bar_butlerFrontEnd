(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('BarController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore',

  function($scope, BarFactory, $location, $routeParams, $cookieStore){

      $scope.beers = [];

      BarFactory.get().success(function(response){
        $scope.beers = response.listings;
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



    }

  ]);

}());
