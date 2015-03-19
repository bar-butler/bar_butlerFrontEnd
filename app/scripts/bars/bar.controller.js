(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('BarController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore',

  function($scope, BarFactory, $location, $routeParams, $cookieStore){

      $scope.beers = [];
      $scope.liquors = [];

      BarFactory.getB().success(function(response){
        $scope.beers = response.beers;
        console.log(response);
      })
      .error(function(res){
        console.log(res);
      });

      BarFactory.getL().success(function(response){
        $scope.liquors = response.liquors;
        console.log(response);
      })
      .error(function(res){
        console.log(res);
      });

      $scope.addBeer = function(beerObj){

        $scope.beer = {};
        $cookieStore.get('auth_token');
        BarFactory.addB(beerObj).success(function(results){
        });
      };

      $scope.deleteB = function(id, index){
        BarFactory.delB(id).success(function(res){
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

      $scope.addLiquor = function (liqObj){
        $scope.liquor = {};
        $cookieStore.get('auth_token');
        BarFactory.addL(liqObj).success(function(results){
          console.log(results);
        });
      };

      $scope.deleteL = function(id, index){
        BarFactory.delL(id).success(function(res){
          $scope.liquors.splice(index, 1);
          console.log(res);
        });
      };

    }

  ]);

}());
