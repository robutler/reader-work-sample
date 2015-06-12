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

      items.forEach(function (item) {
        item.imageSrc = extractImageUrl(item.description.__cdata);
      });

      $scope.news = items;
    });

  }]);

})(this);