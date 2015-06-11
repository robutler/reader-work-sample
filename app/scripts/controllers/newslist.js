(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp');

  /**
   * @ngdoc function
   * @name readerWorkSampleApp.controller:NewsListController
   * @description
   * # NewsListController
   * Controller of the readerWorkSampleApp
   */
  app.controller('NewsListController', ['$scope', 'NewsService', function ($scope, NewsService) {
    NewsService.fetchNews().then(function (data) {
      $scope.news = data;
    });

  }]);

})(this);