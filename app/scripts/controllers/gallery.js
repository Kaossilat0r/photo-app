'use strict';


angular.module('photoApp')
  .controller('GalleryController', [
    'galleryService',
    '$scope',
    '$http',
    'config',
    function (galleryService,$scope,$http,config) {

      $scope.galleryService = galleryService;

      $scope.pictures = [];

      $scope.getPictures = function() {
        var request = [];
        angular.forEach(galleryService.activeTagList, function (tag) {
          request.push(tag.id);
        });

        console.log(request);

        $http.post(config.webservice + "/user/"
          + $scope.galleryService.selectedUser + "/photo", request)
          .success(function (data, status) {
            $scope.pictures = data;
            //console.log(data);
          })
          .error(function (data, status) {
            console.log("GET /users failed: " + status);
          });

      }

      $scope.activateTag = function(tag) {
        galleryService.activeTagList.push(tag);
        galleryService.tagList.splice(galleryService.tagList.indexOf(tag),1);
        $scope.getPictures();
      }
      $scope.deactivateTag = function(tag) {
        galleryService.tagList.push(tag);
        galleryService.activeTagList.splice(galleryService.activeTagList.indexOf(tag),1);
        $scope.getPictures();
      }

      $scope.getPictures();

    }])
  .controller('NavCtrl', [
    'galleryService',
    '$scope',
    function(galleryService, $scope) {
      $scope.galleryService = galleryService;
    }
  ]);
