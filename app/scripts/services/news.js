(function (window) {
  'use strict';

  var angular = window.angular,
    console = window.console,
    x2js = new window.X2JS(),
    app = angular.module('readerWorkSampleApp');

  /**
   * @ngdoc service
   * @name NewsService
   * @requires $http
   * @requires $q
   * @description Service to fetch news.
   */
  app.factory('NewsService', ['$http', '$q', function ($http, $q) {
    console.info('NewsService started');

    var service = {},
      newsPath = 'http://localhost:9000/dn/nyheter/m/rss/';

    /**
     * @ngdoc method
     * @name NewsService#fetchNews
     * @methodOf MewsService
     * @description Fetches the news.
     * @returns {Object} Returns a promise object.
     */
    service.fetchNews = function () {
      var deferred = $q.defer();

      $http.get(newsPath)
        .success(function (data, status, headers, config) {
          var json = x2js.xml_str2json(data);

          service.news = json;
          deferred.resolve(json);
        })
        .error(function (data, status, headers, config) {
          deferred.reject('Unable to fetch news');
        });

      return deferred.promise;
    };

    return service;
  }]);

})(this);