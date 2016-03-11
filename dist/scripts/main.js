;(function() {
  "use strict";


  angular.module('InvAssist', ['ngCookies', 'ngRoute', 'chart.js'])

  .constant('HEROKU', {
    URL: 'https://bar-butler.herokuapp.com/',
    CONFIG: {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

  })

  .config(['$routeProvider', function($routeProvider){

    $routeProvider

    .when('/', {
      templateUrl: 'scripts/users/users.login.temp.html',
      controller: 'UserController'
    })

    .when('/register', {
      templateUrl: 'scripts/users/users.register.temp.html',
      controller: 'UserController'
    })

    .when('/:id', {
      templateUrl: 'scripts/bars/profile.temp.html',
      controller: 'ProfileController'
    })

    .when('/:id/add', {
      templateUrl: 'scripts/bars/addbooze.temp.html',
      controller: 'BarController'
    })

    .when('/beer/:id', {
      templateUrl: 'scripts/bars/onebeer.temp.html',
      controller: 'EditController'
    })

    .when('/liquor/:id', {
      templateUrl: 'scripts/bars/oneliquor.temp.html',
      controller: 'EditController'
    });



  }])

  .run(function ($rootScope, UserFactory) {



      $rootScope.$on('$routeChangeStart', function () {
        UserFactory.status();
      });

  });

}());

;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('UserController', ['$scope', 'UserFactory', '$location', '$cookieStore', 'HEROKU', '$rootScope',

    function($scope, UserFactory, $location, $cookieStore, HEROKU, $rootScope){

      var user = UserFactory.user();


        $scope.loginUser = function(userObj, id){
          UserFactory.login(userObj).success(function(results){
            userObj = results;
            $cookieStore.put('auth_token', results.user.authentication_token);
            $cookieStore.put('user_object', results.user);
            HEROKU.CONFIG.headers['auth_token'] = results.user.authentication_token;
            console.log(userObj.user.id);
            $rootScope.userHome = userObj.user.id;
            $location.path(userObj.user.id);
          });

        };

        $scope.registerUser = function(userObj, id){
          UserFactory.register(userObj).success(function(results){
            userObj = results;
            $cookieStore.put('auth_token', results.user.authentication_token);
            $cookieStore.put('user_object', results.user);
            HEROKU.CONFIG.headers['auth_token'] = results.user.authentication_token;
            // console.log(results.id)
            $location.path(userObj.user.id);
          });
        };

    }

  ]);

}());

;(function() {
  "use strict";

  angular.module('InvAssist')

  .factory('UserFactory', ['$http', 'HEROKU', '$location', '$cookieStore',

    function($http, HEROKU, $location, $cookieStore){

      var currentUser = function(){
        return $cookieStore.get('auth_token');
      };

      var userDetails = function () {
        return $cookieStore.get('user_object');
      };

      var checkLoginStatus = function(){
        var userToken = currentUser();
        if (userToken){
          HEROKU.CONFIG.headers['auth_token'] = userToken;
        }
      };

      var getUser = function(userObj){
        console.log(userObj);
        // return $http.get(HEROKU.URL + 'users/' + userObj.user.id, {header: HEROKU.CONFIG.headers});
      };

      var addUser = function(userObj){
       return $http.post(HEROKU.URL + 'users', {user: userObj}, HEROKU.CONFIG);

      };

      var loginUser = function(userObj){
        return $http.post(HEROKU.URL + 'users/sign_in', {user: userObj});

      };

      var logoutUser = function(){
        $cookieStore.remove('auth_token');
        $cookieStore.remove('user_object');
        $location.path('#/');
      };


    return{
      user : currentUser,
      register : addUser,
      login : loginUser,
      logout : logoutUser,
      status : checkLoginStatus,
      get : getUser,
      userInfo: userDetails

    };

    }]);

  }());

(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('BarController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore',

  function($scope, BarFactory, $location, $routeParams, $cookieStore){

      $scope.userId = $routeParams.id;

      $scope.beers = [];
      $scope.liquors = [];

      // BarFactory.getB().success(function(response){
      //   $scope.beers = response.beers;
      //   console.log(response);
      // })
      // .error(function(res){
      //   console.log(res);
      // });

      // BarFactory.getL().success(function(response){
      //   $scope.liquors = response.liquors;
      //   console.log(response);
      // })
      // .error(function(res){
      //   console.log(res);
      // });

      $scope.addBeer = function(beerObj){

        $scope.beer = {};
        $cookieStore.get('auth_token');
        BarFactory.addB(beerObj).success(function(results){
        });
      };

      // $scope.deleteB = function(id, index){
      //   BarFactory.delB(id).success(function(res){
      //     $scope.beers.splice(index, 1);
      //     console.log(res);
      //   });
      // };

      // $scope.oneBeer = function(beerObj){
      //   $scope.beer = $routeParams.beerid;
      //   BarFactory.oneB(beerObj).success(function(res){
      //     console.log(beerObj.id);
      //     $location.path(beerObj.id);
      //   });
      // };

      $scope.addLiquor = function (liqObj){
        $scope.liquor = {};
        $cookieStore.get('auth_token');
        BarFactory.addL(liqObj).success(function(results){
          console.log(results);
        });
      };
      //
      // $scope.deleteL = function(id, index){
      //   BarFactory.delL(id).success(function(res){
      //     $scope.liquors.splice(index, 1);
      //     console.log(res);
      //   });
      // };

      // $scope.oneLiq = function(liqObj){
      //   BarFactory.oneL(liqObj).success(function(res){
      //     console.log(liqObj.id);
      //   $location.path();
      //   });
      // };

    }

  ]);

}());

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
          console.log(beerObj);
          $location.path('beer/' + beerObj.id);
          $rootScope.beerName = beerObj.name;
        });
      };

      $scope.oneLiq = function(liqObj){
        BarFactory.oneL(liqObj).success(function(res){
          console.log(liqObj);
        $location.path('liquor/' + liqObj.id);
          $rootScope.liqName = liqObj.name;
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


    }

  ]);

}());

;(function() {
  "use strict";

  angular.module('InvAssist')

  .controller('EditController', ['$scope', 'BarFactory', '$location', '$routeParams', '$cookieStore', '$rootScope',

    function($scope, BarFactory, $location, $routeParams, $cookieStore, $rootScope){

      $scope.beerId = $routeParams.id;
      $scope.weights = [];


      $scope.editWeight = function(beerObj){
        $scope.weight = {};
        BarFactory.editB(beerObj, $scope.beerId).success(function(res){
          $rootScope.dryAt = res.beer.dry_at;
          $rootScope.kegNum = res.beer.keg_number;
          console.log(beerObj);
          // updateChart(res);
        });
      };

    $scope.editKegs = function(beerObj){
      BarFactory.editK(beerObj, $scope.beerId).success(function(res){
        console.log(res);
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
       return $http.post(HEROKU.URL + 'users/' + userObj.id + '/beers', beerObj, HEROKU.CONFIG);
     };

     var delBeer = function(beerObj, id){
       return $http.delete(HEROKU.URL + 'users/' + userObj.id + '/beers/' + beerObj, HEROKU.CONFIG);
     };

     var getOneBeer = function(beerObj, id){
       return $http.get(HEROKU.URL + 'users/' + userObj.id + '/beers/' + beerObj.id, HEROKU.CONFIG);
     };

     var addLiquor = function(liqObj){
       return $http.post(HEROKU.URL + 'users/' + userObj.id + '/liquors', liqObj, HEROKU.CONFIG);
     };

     var getLiquors = function(id){
       return $http.get(HEROKU.URL + 'users/' + userObj.id + '/liquors', HEROKU.CONFIG);
     };

     var delLiquors = function(liqObj, id){
       return $http.delete(HEROKU.URL + 'users/' + userObj.id + '/liquors/' + liqObj, HEROKU.CONFIG);
     };

     var getOneLiq = function(liqObj, id){
       return $http.get(HEROKU.URL + 'users/' + userObj.id + '/liquors/' + liqObj.id, HEROKU.CONFIG);
     };

     var editBeer = function(beerObj, id){
       return $http.put(HEROKU.URL + 'users/' + userObj.id + '/beers/' + id, beerObj, HEROKU.CONFIG);
     };

     var editKeg = function(beerObj, id){
       return $http.put(HEROKU.URL + 'users/' + userObj.id + '/beers/' + id, beerObj, HEROKU.CONFIG);
     };

     return{
       getB : getBeers,
       addB : addBeer,
       delB : delBeer,
       oneB : getOneBeer,
       addL : addLiquor,
       getL : getLiquors,
       delL : delLiquors,
       oneL : getOneLiq,
       editB : editBeer,
       editK : editKeg
     };

    }



   ]);

}());

;(function (){

  'use strict';

  angular.module('InvAssist')

  .controller('NavController', ['$scope', 'UserFactory', '$location',

    function ($scope, UserFactory, $location) {

      var user = UserFactory.user();

      if (user) {
        $scope.loggedin = true;
        $scope.user = user;
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
      };



    }

  ]);

}());
