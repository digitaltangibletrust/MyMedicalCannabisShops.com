/* global angular */
'use strict'

angular
  .module('app', []);

// eventually break this into separate file
angular
  .module('app')
  .controller('alldaeOfferController', alldaeOfferController);

alldaeOfferController.$inject = ['$window', '$scope', '$http'];

function alldaeOfferController($window, $scope, $http) {
  $scope.step = 1;

  $scope.submitZip = function(){
    $scope.error = '';
    if (!$scope.zip || $scope.zip.length !== 5) {
      $scope.error = 'Please enter your 5-digit zip code.';
    } else {
      $scope.step = 3;
    }
  };

  $scope.submitEmail = function(){
    $scope.submitted = true;
    $scope.error = '';
    if (!$scope.email) {
      $scope.error = 'Please enter a valid email address.';
    } else {
      $http.post('/subscribe', {
        'email': $scope.email,
        'zip': $scope.zip
      }).success(function(res) {
        $window.location = 'http://alldae.club';
      }).error(function(err) {
        $scope.submitted = false;
        $scope.error = 'We ran into an error: ' + JSON.stringify(err);
      });
    }
  };
}