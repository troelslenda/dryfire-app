'use strict';

/**
 * @ngdoc function
 * @name dryfireApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dryfireApp
 */
angular.module('dryfireApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
