/* global angular */
'use strict'

angular
  .module('app', []);

// eventually break this into separate file
angular
  .module('app')
  .controller('alldaeOfferController', alldaeOfferController);

alldaeOfferController.$inject = ['$scope', '$http'];

function alldaeOfferController($scope, $http) {
  $scope.step = 1;
}