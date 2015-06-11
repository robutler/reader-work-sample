(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp', [
      'ngAnimate',
      'ngResource',
      'ngRoute',
      'ngTouch'
    ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

})(this);