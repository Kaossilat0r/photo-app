angular.module('photoApp.services', [])
  .value('version', '0.1')
  .factory('galleryService', [
    "$http",
    "$rootScope",
    "$route",
    "config",
    function ($http, $rootScope, $route, config) {
      var model =
      {
        userList: [],
        tagList: [],
        activeTagList: [],
        selectedUser: null,
        reload: function () {
          $rootScope.$broadcast('galleryService.change');
          $route.reload();
        },
        getTags: function() {
          $http.get(config.webservice + "/user/" + model.selectedUser + "/tags")
            .success(function (data, status) {
              model.tagList = data;
            })
            .error(function (data, status) {
              console.log("GET /user/{id}/tags failed: " + status);
            });
        }
      };

      model.selectedUser = 1;

      $http.get(config.webservice + "/user")
        .success(function(data, status) {
          model.userList = data;
        })
        .error(function(data, status) {
          console.log("GET /user failed: " + status);
        });



      model.getTags();
      return model;
    }
  ])
  .factory('config', [function () {
    return {
      webservice: window.location.protocol + '//' + window.location.hostname + ':8080/photo-server',
      debug: true
    };

  }]);
