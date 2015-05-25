'use strict';

/**
 * @ngdoc function
 * @name dryfireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dryfireApp
 */
angular.module('dryfireApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
