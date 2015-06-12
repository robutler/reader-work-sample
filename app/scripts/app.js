(function (window) {
  'use strict';

  var angular = window.angular,
    console = window.console,
    app = angular.module('readerWorkSampleApp', [
      'ngAnimate',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch'
    ]);

  console.info('###########################');
  console.info('# NEWS READER WORK SAMPLE #');
  console.info('###########################');

  app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.navigateTo = function (url) {
      $location.path(url);
    };
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'views/newslist.html',
        controller: 'NewsListController'
      })
      .when('/slide', {
        templateUrl: 'views/newsslide.html',
        controller: 'NewsSlideController'
      })
      .otherwise({
        redirectTo: '/list'
      });
  }]);

})(this);