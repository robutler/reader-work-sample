(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp');

  /**
   * @ngdoc function
   * @name readerWorkSampleApp.controller:NewsListController
   * @requires $scope
   * @requires NewsService
   * @description
   * # NewsListController
   * Controller of the readerWorkSampleApp
   */
  app.controller('NewsListController', ['$scope', 'NewsService', function ($scope, NewsService) {
    console.info('NewsListController started');

    NewsService.fetchNews().then(function (data) {
      $scope.news = data;
    });

    $scope.expandedItem = undefined;

    $scope.toggleExpanded = function (item) {
      item.expanded  = !item.expanded;

      if (item.expanded) {

        if ($scope.expandedItem) {
          $scope.expandedItem.expanded = false;
        }
        $scope.expandedItem = item;

      } else {
        $scope.expandedItem = undefined;
      }
    };

    $scope.markAsRead = function (item) {
      if (!item.read) {
        item.read = true;
      }
    };

    $scope.formatDate = function (date) {
      var dateObj = new Date(date);
      return dateObj.toDateString() + ', ' + dateObj.toLocaleTimeString();
    };

  }]);

})(this);