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
        var tagIds = [];
        angular.forEach(galleryService.activeTagList, function (tag) {
          tagIds.push(tag.id);
        });

        console.log(tagIds);

        $http.post(config.webservice + "/user/"
          + $scope.galleryService.selectedUser + "/photo", tagIds)
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
