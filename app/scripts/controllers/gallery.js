'use strict';


angular.module('photoApp')
  .controller('GalleryController', [
    'galleryService',
    '$scope',
    '$http',
    'config',
    function (galleryService,$scope,$http,config) {

      $scope.galleryService = galleryService;

      $scope.pictures= [];
      $http.get(config.webservice + "/user/" + $scope.galleryService.selectedUser + "/photo")
        .success(function(data, status) {
          $scope.pictures = data;
          //console.log(data);
        })
        .error(function(data, status) {
          console.log("GET /users failed: " + status);
        });


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
