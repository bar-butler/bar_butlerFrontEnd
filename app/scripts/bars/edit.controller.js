;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('EditController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore', '$rootScope',

    function($scope, BarFactory, $location, $routeParams, $cookieStore, $rootScope){

      $scope.beerId = $routeParams.id;


      $scope.editWeight = function(beerObj){
        $scope.weight = {};
        BarFactory.editB(beerObj, $scope.beerId).success(function(res){
          $rootScope.dryAt = res.beer.dry_at;
          $rootScope.kegNum = res.beer.keg_number;
          console.log(beerObj);
          // updateChart(res);
        });
      };

    



      // BarFactory.getBeerWeightByTime().success( function (res) {
      //   updateChart(res);
      // });


      // var updateChart = function (data) {
      //   // might have to loop or do somethign with the data before sending it to the graph.
      //   var ctx = document.getElementById("beerChart").getContext("2d");
      //   var newBeerChart = new Chart(ctx).Line(data);
      //   new Chart(ctx).Line(data);
      // };


    }

   ]);

}());
