'use strict';


angular.module('photoApp')
  .controller('GalleryController', [
    'galleryService',
    '$scope',
    '$http',
    '$route',
    'config',
    function (galleryService,$scope,$http,$route,config) {

      $scope.galleryService = galleryService;

      $scope.pictures = [];
      $scope.activeImage = null;

      $scope.getPhotos = function() {
        var tagIds = [];
        angular.forEach(galleryService.activeTagList, function (tag) {
          tagIds.push(tag.id);
        });

        console.log($scope.galleryService.selectedUser + " - " + tagIds);

        $http.post(config.webservice + "/user/"
          + $scope.galleryService.selectedUser + "/photo/byTag", tagIds)
          .success(function (data, status) {
            $scope.pictures = data;
            console.log(data);

          })
          .error(function (data, status) {
            console.log("POST /user/{id}/photo/byTag failed: " + status);
          });

      };

      $scope.activateTag = function(tag) {
        galleryService.activeTagList.push(tag);
        galleryService.tagList.splice(galleryService.tagList.indexOf(tag),1);
        $scope.getPhotos();
      };
      $scope.deactivateTag = function(tag) {
        galleryService.tagList.push(tag);
        galleryService.activeTagList.splice(galleryService.activeTagList.indexOf(tag),1);
        $scope.getPhotos();
      };

      $scope.addPhoto = function(){

        console.log("adding photo...");

        var files = document.getElementById('file').files;
        for (var i = 0; i < files.length; i++) {
          var request = {
            fullURL : null,
            thumbURL : null,
            tags : []
          };
          // i'm cheating here since the files are already in the image folder
          var file = files[i];

          request.fullURL = "images/" + file.name;
          request.thumbURL = request.fullURL.replace(".jpg", "_th.png");
          request.tags = galleryService.activeTagList;

          console.log(request);

          $http.post(config.webservice + "/user/"
            + galleryService.selectedUser + "/photo", request)
            .success(function (data, status) {
              console.log("added photo.  " +config.webservice + "/user/"
                + galleryService.selectedUser + "/photo");
              $scope.getPhotos();
            })
            .error(function (data, status) {
              console.log("POST /users/{id}/photo failed: " + status);
            });


        }

      };

      $scope.ping = function(picture) {
        if ($scope.activeImage == picture) {
          $scope.activeImage = null;
        } else {
          $scope.activeImage = picture;
        }
      };

      $scope.getPhotos();

    }])
  .controller('ImportController', [
    '$scope',
    '$http',
    'config',
    'galleryService',
    function ($scope, $http, config, galleryService) {

      $scope.galleryService = galleryService;



    }
  ])
  .controller('NavCtrl', [
    'galleryService',
    '$scope',
    function(galleryService, $scope) {
      $scope.galleryService = galleryService;
    }
  ]);
