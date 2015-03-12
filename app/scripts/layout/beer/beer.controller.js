;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('BeerController', ['$scope', 'BeerFactory',

  function($scope, BeerFactory){

      $scope.beers = [];

    }

  ]);

}());
