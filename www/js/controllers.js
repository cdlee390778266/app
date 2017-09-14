angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.baseConfig = {
      theme:'default',
      dataLoaded:true
  };

})
//饼状图
.controller('pieCtrl', function($scope, Utils) { 
  $scope.pieOption = {}
  Utils.showPop();

  Utils.getJSON('data/pie.json', function(data) {
    Utils.hidePop()
    $scope.pieOption = {
      title : {
          text: '2017年中报',
          x:'center'
      },
      tooltip : {
          //trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          right: 0,
          top: 'middle',
          data: data
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:1, name:'生态修复项目'},
                  {value:2, name:'市政绿化项目'},
                  {value:3, name:'地产景观'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
        ]
    };

  })
})

//柱状图-h
.controller('barhCtrl', function($scope, Utils) {
  $scope.barhOption = {}
  Utils.showPop();

  Utils.getJSON('data/barh.json', function(data) {
    Utils.hidePop()
    $scope.barhOption = {
      title: {
          text: '总市值(单位：亿)',
          subtext: '数据来自网络'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          show: false
      },
      yAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLine: {
            show: false 
          },
          axisTick: {
            show: false
          },
          data: ['行业水平','浦发银行','工商银行','建设银行','中国银行','农业银行']
      },
      label: {
          normal: {
              show: true,
              position: 'right'
          }
      },
      series: [
          {
              name: '2011年',
              type: 'bar',
              data: data
          }
      ]
    }

  })
})

//柱状图-h
.controller('barvCtrl', function($scope, Utils) {
  $scope.barvOption = {}
  Utils.showPop();

  Utils.getJSON('data/barh.json', function(data) {
    Utils.hidePop()
    $scope.barvOption = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
}

  })
})

.controller('PlaylistsCtrl', function($scope) {
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
