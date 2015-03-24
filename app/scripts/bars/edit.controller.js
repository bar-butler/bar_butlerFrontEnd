;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('EditController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore',

    function($scope, BarFactory, $location, $routeParams, $cookieStore){

      $scope.beerId = $routeParams.id;


      $scope.editWeight = function(beerObj){
        $scope.weight = {};
        BarFactory.editB(beerObj, $scope.beerId).success(function(res){
          console.log(res);
        });
      };

    }

   ]);

}());
