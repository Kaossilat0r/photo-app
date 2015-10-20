'use strict';

angular.module('photoApp', [
    'photoApp.services',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angular.filter',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/gallery.html',
        controller: 'GalleryController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: '../views/import.html',
        controller: 'ImportController',
        controllerAs: 'import'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
