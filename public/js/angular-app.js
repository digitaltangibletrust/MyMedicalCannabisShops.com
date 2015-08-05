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
  var endDate = moment('2015-08-06 18:00:00').valueOf();
  var diff = (endDate - moment().valueOf()) / 1000;
  if (diff < 0) {
    $scope.errorView = 'expired';
  } else {
    $scope.step = 1;
  }

  var alamedaZips = ['94505', '94601', '94597', '94604', '94605', '94502', '94602', '94503', '94603', '94589', '94587', '94588', '95628', '94514', '94618', '94403', '94621', '95035', '94619', '94609', '94501', '94608', '94607', '94606', '94613', '94612', '93292', '94611', '94610', '94661', '94702', '94703', '94704', '94705', '94660', '95666', '94806', '94707', '94706', '94709', '94708', '94062', '94710', '94720', '94577', '94580', '94578', '95129', '95128', '94579', '94586', '94582', '94557', '94555', '94560', '94558', '94565', '94568', '94566', '94537', '94538', '94539', '94541', '94542', '94544', '94545', '95391', '94546', '95603', '94550', '94551', '94552', '95377', '95376'];

  $scope.submitZip = function(){
    $scope.error = '';
    if (!$scope.zip || $scope.zip.length !== 5) {
      $scope.error = 'Please enter your 5-digit zip code.';
    } else {
      $scope.step = 3;
    }
  };

  $scope.submitEmail = function(){
    $scope.error = '';
    if (!$scope.email) {
      $scope.error = 'Please enter a valid email address.';
    } else if (!$scope.zip || $scope.zip.length !== 5) {
      $scope.error = 'Please enter your 5-digit zip code.';
    } else {
      $scope.submitted = true;
      $http.post('/subscribe', {
        'email': $scope.email,
        'zip': $scope.zip
      }).success(function(res) {
        if ($scope.step === 'expired') {
          $window.location = '/';
        } else if (alamedaZips.indexOf($scope.zip) !== -1) {
          $window.location = 'http://www.alldae.club/24-hour-all-dae-payday/';
        } else {
          $scope.errorView = 'badZip';
        }
      }).error(function(err) {
        $scope.submitted = false;
        $scope.error = 'We ran into an error: ' + JSON.stringify(err);
      });
    }
  };
}