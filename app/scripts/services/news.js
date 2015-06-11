(function (window) {
  'use strict';

  var angular = window.angular,
    console = window.console,
    X2JS = window.X2JS,
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
      // Proxied locally to avoid cross-domain request issues, resolves to http://www.dn.se/nyheter/m/rss/
      newsPath = 'http://localhost:9000/dn/nyheter/m/rss/';

    /**
     * @ngdoc method
     * @name NewsService#fetchNews
     * @methodOf MewsService
     * @description Fetches the news.
     * @returns {Object} Returns a promise object.
     */
    service.fetchNews = function () {
      var deferred = $q.defer(),
        x2js = new X2JS();

      $http.get(newsPath)
        .success(function (data, status, headers, config) {
          var json = x2js.xml_str2json(data);

          if (json.hasOwnProperty('rss') &&
              json.rss.hasOwnProperty('channel') &&
              json.rss.channel.hasOwnProperty('item')) {
            service.news = json.rss.channel.item;
            deferred.resolve(json.rss.channel.item);
          } else {
            deferred.reject('No items in the feed');
          }

        })
        .error(function (data, status, headers, config) {
          deferred.reject('Unable to fetch news');
        });

      return deferred.promise;
    };

    return service;
  }]);

})(this);