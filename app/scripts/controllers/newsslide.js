(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp');

  /**
   * @ngdoc function
   * @name readerWorkSampleApp.controller:NewsSlideController
   * @description
   * # NewsSlideController
   * Controller of the readerWorkSampleApp
   */
  app.controller('NewsSlideController', ['$scope', 'NewsService', function ($scope, NewsService) {
    console.info('NewsSlideController started');

    NewsService.fetchNews().then(function (data) {
      $scope.news = data;
    });

  }]);

})(this);