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
      $scope.activeImage = null;

      $scope.getPictures = function() {
        var tagIds = [];
        angular.forEach(galleryService.activeTagList, function (tag) {
          tagIds.push(tag.id);
        });

        $http.post(config.webservice + "/user/"
          + $scope.galleryService.selectedUser + "/photo/byTag", tagIds)
          .success(function (data, status) {
            $scope.pictures = data;
            //console.log(data);
          })
          .error(function (data, status) {
            console.log("POST /user/{id}/photo/byTag failed: " + status);
          });

      };

      $scope.activateTag = function(tag) {
        galleryService.activeTagList.push(tag);
        galleryService.tagList.splice(galleryService.tagList.indexOf(tag),1);
        $scope.getPictures();
      };
      $scope.deactivateTag = function(tag) {
        galleryService.tagList.push(tag);
        galleryService.activeTagList.splice(galleryService.activeTagList.indexOf(tag),1);
        $scope.getPictures();
      };

      $scope.ping = function(picture) {
        if ($scope.activeImage == picture) {
          $scope.activeImage = null;
        } else {
          $scope.activeImage = picture;
        }
      };

      $scope.getPictures();

    }])
  .controller('ImportController', [
    '$scope',
    '$http',
    'config',
    'galleryService',
    function ($scope, $http, config, galleryService) {

      $scope.galleryService = galleryService;

      $scope.addPhoto = function(){

        var files = document.getElementById('file').files;
        for (var i = 0; i < files.length; i++) {
          var request = {
            fullURL : null,
            thumbURL : null
          };
          // i'm cheating here since the files are already in the image folder
          var file = files[i];

          request.fullURL = "images/" + file.name;
          request.thumbURL = request.fullURL.replace(".jpg", "_th.png");

          console.log(request);

          $http.post(config.webservice + "/user/"
            + $scope.galleryService.selectedUser + "/photo", request)
            .success(function (data, status) {
              console.log("added photo.");
            })
            .error(function (data, status) {
              console.log("POST /users/{id}/photo failed: " + status);
            });
        }



      };

    }
  ])
  .controller('NavCtrl', [
    'galleryService',
    '$scope',
    function(galleryService, $scope) {
      $scope.galleryService = galleryService;
    }
  ]);
