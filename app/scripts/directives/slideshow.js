(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp');

  app.directive('slideShow', [function () {

    var colorPalette = [
      {
        name: 'Red',
        fill: '#f44336',
        dark: '183, 28, 28'
      }, {
        name: 'Pink',
        fill: '#e91e63',
        dark: '136, 14, 79'
      }, {
        name: 'DeepPurple',
        fill: '#673ab7',
        dark: '49, 27, 146'
      }, {
        name: 'Blue',
        fill: '#2196f3',
        dark: '13, 71, 161'
      }, {
        name: 'Teal',
        fill: '#009688',
        dark: '0, 77, 64'
      }, {
        name: 'Green',
        fill: '#4caf50',
        dark: '27, 83, 32'
      }
    ];

    function compile(element, attrs) {
      element.append('');
      return link;
    }

    function link(scope, element, attrs) {
      scope.getFillColorHex = function (index) {
        return colorPalette[index % colorPalette.length].fill;
      };
      scope.getDarkColorRgb = function (index) {
        return colorPalette[index % colorPalette.length].dark;
      };
    }

    return {
      templateUrl: 'views/slideshow.html',
      restrict: 'E',
      scope: {
        items: '='
      },
      link: link
    }

  }]);

  app.directive('slideShowItem', [function () {

    function link(scope, element, attrs) {

    }

    return {
      templateUrl: 'views/slideshowitem.html',
      restrict: 'E',
      link: link
    }

  }]);

})(this);