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

//折线图
.controller('lineCtrl', function($scope, Utils) {
  $scope.lineOption = {}
  Utils.showPop();

  Utils.getJSON('data/barv.json', function(data) {
    Utils.hidePop()
    $scope.lineOption = {
      title: {
          text: '折线图堆叠'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
          type: 'value'
      },
      series: [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'直接访问',
          type:'line',
          stack: '总量',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  })
  
})

//柱状图+折线图
.controller('barLineCtrl', function($scope, Utils) {
  $scope.barLineOption = {}
  Utils.showPop();

  Utils.getJSON('data/barv.json', function(data) {
    Utils.hidePop()
    $scope.barLineOption = {
        title: {
            text: '动态数据',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data:['最新成交价', '预购队列']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: (function (){
                    var now = new Date();
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                        now = new Date(now - 2000);
                    }
                    return res;
                })()
            },
            {
                type: 'category',
                boundaryGap: true,
                data: (function (){
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.push(len + 1);
                    }
                    return res;
                })()
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '价格',
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: '预购量',
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name:'预购队列',
                type:'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data:(function (){
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            },
            {
                name:'最新成交价',
                type:'line',
                data:(function (){
                    var res = [];
                    var len = 0;
                    while (len < 10) {
                        res.push((Math.random()*10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    }
  })
})

//雷达图
.controller('radarCtrl', function($scope, Utils) {
  $scope.radarOption = {}
  Utils.showPop();

  Utils.getJSON('data/barv.json', function(data) {
    Utils.hidePop()
    $scope.radarOption = {
      title: {
          text: '基础雷达图'
      },
      tooltip: {},
      legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
          // shape: 'circle',
          name: {
              textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
             }
          },
          indicator: [
             { name: '销售（sales）', max: 6500},
             { name: '管理（Administration）', max: 16000},
             { name: '信息技术（Information Techology）', max: 30000},
             { name: '客服（Customer Support）', max: 38000},
             { name: '研发（Development）', max: 52000},
             { name: '市场（Marketing）', max: 25000}
          ]
      },
      series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '预算分配（Allocated Budget）'
              },
               {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name : '实际开销（Actual Spending）'
              }
          ]
      }]
    }
  })
})

.controller('gaugeCtrl', function($scope, Utils) {
  $scope.gaugeOption = {}
  Utils.showPop();

  Utils.getJSON('data/barv.json', function(data) {
    Utils.hidePop()
    $scope.gaugeOption = {
      tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
          feature: {
              restore: {},
              saveAsImage: {}
          }
      },
      series: [
          {
              name: '业务指标',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 50, name: '完成率'}]
          }
      ]
    }
  })
});
