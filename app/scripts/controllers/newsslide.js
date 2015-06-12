(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp');

  /**
   * @ngdoc function
   * @name readerWorkSampleApp.controller:NewsSlideController
   * @requires $scope
   * @requires NewsService
   * @description
   * # NewsSlideController
   * Controller of the readerWorkSampleApp
   */
  app.controller('NewsSlideController', ['$scope', 'NewsService', function ($scope, NewsService) {
    console.info('NewsSlideController started');

    // Parses a string of HTML and returns the first image source it finds.
    function extractImageUrl(string) {
      var html = string,
        div, image;

      // Strip away CDATA tags
      html = html.replace('<![CDATA[', '').replace(']]>', '');

      div = document.createElement('div');
      div.innerHTML = html;

      image = div.getElementsByTagName('img')[0]; // Assume the first one is the right one
      return (image ? image.getAttribute('src') : '');
    }

    NewsService.fetchNews().then(function (data) {
      var items = data;

      // Add image source key to the items if it exists
      items.forEach(function (item) {
        item.imageSrc = extractImageUrl(item.description.__cdata);
      });

      $scope.news = items;
    });

  }]);

})(this);