angular.module('starter.services', [])

.factory('Utils', function($http, $ionicPopup, $location, $ionicLoading, $timeout, $state) {
  
  var Utils = {};

  /**
   * [showPop 加载中]
   * @param  {[type]} template [配置参数对象， 如为空则采用默认模板]
   */
  Utils.showPop = function(template) {
    //默认模板
    var defaultTemplate = {
      template: '<ion-spinner icon="android"></ion-spinner>'
    }
    var template = template ? template : defaultTemplate;

    if (template.duration != undefined) {
      $timeout(function() {
        template.callback != undefined ? template.callback() : '';
      }, template.duration)
    }

    $ionicLoading.show(template);
  };

  /**
   * [hidePop 隐藏加载弹窗]
   */
  Utils.hidePop = function() {
    $ionicLoading.hide();
  };

  Utils.alert = function(data, callback) {
    var alertPopup = $ionicPopup.alert(data);
    alertPopup.then(function(res) {
      callback(res);
    });
  };


  Utils.confirm = function(data, ok, cancel) {
    var confirmPopup = $ionicPopup.confirm(data);
    confirmPopup.then(function(res) {
      if (res) {
        ok();
      } else {
        cancel();
      }
    });
    return arguments;
  };

  /**
   * [getJSON 通过get的方式获取数据]
   * @param  {[type]} url             [接口url]
   * @param  {[type]} successCallback [成功回调]
   * @param  {[type]} errorCallback   [失败回调]
   * @param  {[type]} finallyCallback [description]
   */
  Utils.getJSON = function(url, successCallback, errorCallback, finallyCallback) {

      if(!url) return;
      
      $http.get(url)
        .then(function(data) {
          successCallback != undefined ? successCallback(data.data) : '';
        }, function(data) {
          if (data.status == 404) {
            errorCallback != undefined ? errorCallback() : '';
          }
        })
        .finally(function() {
          finallyCallback != undefined ? finallyCallback() : '';
        });
    };

    return Utils;

})