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
      newsPath = '/dn/nyheter/m/rss/', // Proxied locally to avoid cross-domain request issues, resolves to http://www.dn.se/nyheter/m/rss/
      localNewsPath = 'localDn.xml', // Local backup in case proxy fails,
      x2js = new X2JS();

    function getAndValidateNews(path) {
      var deferred = $q.defer();

      $http.get(path)
        .success(function (data, status, headers, config) {
          var json = x2js.xml_str2json(data);

          if (json &&
              json.hasOwnProperty('rss') &&
              json.rss.hasOwnProperty('channel') &&
              json.rss.channel.hasOwnProperty('item')) {
            console.log('[NewsService] Successfully got news from', path, status);
            deferred.resolve(json.rss.channel.item);
          } else {
            deferred.reject('[NewsService] No items in the feed from', path, status);
          }

        })
        .error(function (data, status, headers, config) {
          deferred.reject('[NewsService] Unable to fetch news from', path, status);
        });

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name NewsService#fetchNews
     * @methodOf NewsService
     * @description Fetches the news.
     * @returns {Object} Returns a promise object.
     */
    service.fetchNews = function () {
      var deferred = $q.defer();

      function resolveNews(data) {
        service.news = data;
        deferred.resolve(data);
      }

      getAndValidateNews(newsPath)
        .then(resolveNews)
        .catch(function () {
          console.warn('[NewsService.fetchNews] Unable to fetch news from ' + newsPath + ', trying local backup');
          getAndValidateNews(localNewsPath)
            .then(resolveNews)
            .catch(function (error) {
              console.warn('[NewsService.fetchNews] error:', error);
              deferred.reject(error);
            });
        });

      return deferred.promise;

    };

    return service;
  }]);

})(this);