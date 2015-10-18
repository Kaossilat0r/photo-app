'use strict';


angular.module('photoApp')
  .controller('GalleryController', [
    'galleryService',
    '$scope',
    function (galleryService,$scope) {

      $scope.galleryService = galleryService;

      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }])
  .controller('NavCtrl', [
    'galleryService',
    '$scope',
    function(galleryService, $scope) {
      $scope.galleryService = galleryService;
    }
  ]);
