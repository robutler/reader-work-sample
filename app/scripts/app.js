'use strict';

/**
 * @ngdoc overview
 * @name readerWorkSampleApp
 * @description
 * # readerWorkSampleApp
 *
 * Main module of the application.
 */
angular
  .module('readerWorkSampleApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
