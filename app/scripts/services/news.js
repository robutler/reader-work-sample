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
      return $http.get(path)
        .then(function (response) {
          var json = x2js.xml_str2json(response.data);

          if (json &&
              json.hasOwnProperty('rss') &&
              json.rss.hasOwnProperty('channel') &&
              json.rss.channel.hasOwnProperty('item')) {
            console.log('[NewsService] Successfully got news from', path, response.status);
            return json.rss.channel.item;
          }

          console.warn('[NewsService] No items in the feed from', path);
          return $q.reject(response);
        })
        .catch(function (response) {
          console.warn('[NewsService] Unable to fetch news from', path, response.status);
          return $q.reject(response.status);
        });
    }

    /**
     * @ngdoc method
     * @name NewsService#fetchNews
     * @methodOf NewsService
     * @description Fetches the news.
     * @returns {Object} Returns a promise object.
     */
    service.fetchNews = function () {
      function setAndResolveNews(data) {
        service.news = data;
        return data;
      }

      return getAndValidateNews(newsPath)
        .then(setAndResolveNews)
        .catch(function () {
          return getAndValidateNews(localNewsPath)
            .then(setAndResolveNews)
            .catch(function (error) {
              return $q.reject(error);
            });
        });
    };

    return service;
  }]);

})(this);