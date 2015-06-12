(function (window) {
  'use strict';

  var angular = window.angular,
    app = angular.module('readerWorkSampleApp');

  /**
    * @ngdoc directive
    * @name readerWorkSampleApp.directive:slideShow
    * @restrict E
    * @element ANY
    * @scope
    * @description
    * Creates a slide show from an array of news items.
    *
    * @example
      <slide-show items="myItems"></slide-show>
    **/
  app.directive('slideShow', ['$interval', function ($interval) {

    // Colors borrowed from Material design
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

    function link(scope, element, attrs) {
      var timer;

      scope.currentIndex = 0;

      scope.getFillColorHex = function (index) {
        return colorPalette[index % colorPalette.length].fill;
      };

      scope.getDarkColorRgb = function (index) {
        return colorPalette[index % colorPalette.length].dark;
      };

      scope.nextSlide = function () {
        if (scope.currentIndex === (scope.items.length - 1)) {
          scope.currentIndex = 0;
        } else {
          scope.currentIndex++;
        }
      }

      scope.startSlideShow = function () {
        if (timer) {
          $interval.cancel(timer);
        }

        timer = $interval(function () {
          scope.nextSlide();
        }, 5000);
      };

      scope.stopSlideShow = function () {
        $interval.cancel(timer);
      };

      scope.$on('$destroy', function() {
        $interval.cancel(timer);
      });

      scope.startSlideShow();

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

})(this);