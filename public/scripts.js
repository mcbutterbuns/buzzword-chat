var app = angular.module('chat', ['ui.bootstrap', 'ngRoute', 'react']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/welcome', {templateUrl: '/welcome',   controller: 'WelcomeCtrl'}).
      when('/chat/:username', {templateUrl: '/chat', controller: 'ChatCtrl'}).
      otherwise({redirectTo: '/welcome'});
}]);

app.controller('WelcomeCtrl', ['$scope', '$location',
  function($scope, $location){

    $scope.setupUsername = function(){

      var username = $scope.username;
      $location.path('/chat/' + username);
    }


  }]);

app.controller('ChatCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams){
    var socket = io.connect('http://localhost:8001');
    $scope.transcript = [];
    $scope.username = $routeParams.username;


    socket.emit('userjoined', $scope.username);


    socket.on('chatupdate', function (data) {

      $scope.$apply(function(){
        $scope.transcript.push({timestamp: new Date(), from: data.from, msg: data.msg});
        $scope.transcript = $scope.transcript.slice(0,30);
      });

    });

    $scope.sendMessage = function() {
      socket.emit('sendchat', {from: $scope.username, msg: $scope.message});
      $scope.message = '';
    };

    $scope.clear = function() {
      $scope.transcript = [];
    };
  }]);
