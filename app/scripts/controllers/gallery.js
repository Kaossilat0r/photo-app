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

        console.log(config.webservice + "/user/"
          + $scope.galleryService.selectedUser + "/photo/byTag" + "  -- "
          + $scope.galleryService.selectedUser + " - " + tagIds);

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

        Array.prototype.remove = function(val) {
          var i = this.indexOf(val);
          return i>-1 ? this.splice(i, 1) : [];
        };


      $scope.activateTag = function(tag) {
        // if not container
          galleryService.activeTagList.push(tag);
          galleryService.tagList.remove(tag);
          $scope.getPhotos();
      };
      $scope.deactivateTag = function(tag) {
        // if not contained
        if (galleryService.tagList.indexOf(tag) == -1
            && galleryService.activeTagList.indexOf(tag) != -1) {
          galleryService.tagList.push(tag);
          galleryService.activeTagList.remove(tag);
          $scope.getPhotos();
        }
      };
      $scope.loadTags = function(p) {
        angular.forEach(p.tags, function(tag) {
          // a small workaround because the tags are in different objects
          angular.forEach(galleryService.tagList, function(galleryTag) {
              if(tag.id == galleryTag.id) {
                $scope.activateTag(galleryTag);
              }
            });
        });
      };
      $scope.updateTags = function(p) {
        p.tags = galleryService.activeTagList;

        var url = config.webservice + "/user/" + $scope.galleryService.selectedUser
          + "/photo/" + p.id;

        $http.post(url, p)
          .success(function (data, status) {
            console.log("photo deleted.");
            $scope.activeImage = null;
            $scope.getPhotos();
          })
          .error(function (data, status) {
            console.log("POST " + url + " failed: " + status);
          });
      }

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
          request.thumbURL = "images/th/" + file.name.replace(".jpg", ".png");
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

      $scope.deletePhoto = function(p) {

        var url = config.webservice + "/user/" + $scope.galleryService.selectedUser
          + "/photo/" + p.id;

        $http.delete(url)
          .success(function (data, status) {
            console.log("photo deleted.");
            $scope.activeImage = null;
            $scope.getPhotos();
          })
          .error(function (data, status) {
            console.log("DELETE " + url + " failed: " + status);
          });
      };

      $scope.toggleActiveImage = function(picture) {
        if ($scope.activeImage == picture) {
          $scope.activeImage = null;
        } else {
          $scope.activeImage = picture;
          $("html,body").animate({ scrollTop: 0 }, "slow");
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
