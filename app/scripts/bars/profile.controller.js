;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('ProfileController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore', '$rootScope',

    function($scope, BarFactory, $location, $routeParams, $cookieStore, $rootScope){

      $scope.userId = $routeParams.id;


      $scope.beers = [];
      $scope.liquors = [];

      // Display function for beer/liquor that corresponds to user

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

      // Route to Profile pg function for beer/liquor


      $scope.oneBeer = function(beerObj){
        $scope.beer = $routeParams.beerid;
        BarFactory.oneB(beerObj).success(function(res){
          console.log(beerObj.name);

          $location.path('beer/' + beerObj.id);
          $rootScope.beerName = beerObj.name;
        });
      };

      $scope.oneLiq = function(liqObj){
        BarFactory.oneL(liqObj).success(function(res){
          console.log(liqObj.id);
        $location.path('liquor' + liqObj.id);
        });
      };

      // Delete function for beer/liquor

      $scope.deleteB = function(id, index){
        BarFactory.delB(id).success(function(res){
          $scope.beers.splice(index, 1);
          console.log(res);
        });
      };

      $scope.deleteL = function(id, index){
        BarFactory.delL(id).success(function(res){
          $scope.liquors.splice(index, 1);
          console.log(res);
        });
      };


      // Chart configuration

      // var ctx = $("#beerChart").get(0).getContext("2d");
      // var beerBarChart = new Chart(ctx).Bar(data, options);
      // var data = {};


      }

  ]);

}());
