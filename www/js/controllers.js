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
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14
          }
      },
      tooltip : {
          //trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          right: 0,
          top: '25%',
          data: data
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '50%',
              color:['#eb536c', '#7dc9fa','#c03bbb'],
              label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                  {value:8, name:'生态修复项目'},
                  {value:3, name:'市政绿化项目'},
                  {value:1, name:'地产景观'}
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
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '10%',
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
              data: data.reverse(),
              itemStyle: {   
                normal:{  
                    color: function (params){
                        var colorList = ['#ed9943', '#f24a64', '#16a1e4', '#7766cc', '#aa8abc', '#eb536c'].reverse();
                        return colorList[params.dataIndex];
                    }
                }
            }
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
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          min: -1,
          max: 6,

          axisLabel :{  
              interval:0   
          },
          data: ['2014\n年年报','2015\n年年报','2016\n年年报','2017\n年年报','2017\n一季报','2017\n年中报']
      },
      yAxis: {
          type: 'value'
      },
      series: [
        {
          type:'line',
          stack: '总量',
          color: ['#6aa8e5'],
          data:[1.4, 1.9, 2.8, 0.6, 1.4, 1.2]
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
    $scope.p = {
      // title: {
      //   text: '综合评分在银行行业25家',
      //   subtext: '公司中名列：',
      //   textStyle: {
      //     color: '#666',
      //     fontSize: 14,
      //     fontWeight: 'normal'
      //   }
      // },
      tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
          {
              name: '业务指标',
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 25,
              splitNumber: 5,
              pointer: {
                length: '30%'
              },
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#c33430'],[0.8, '#d38310'],[1, '#399437']],
                    width: 20
                }
            },
              // detail: {
              //   formatter:'第【{value}】名',
              //   color: '#333',
              //   fontSize: 18
              // },
              data: [{value: 5, name: ''}]
          }
      ]
    }

    Utils.hidePop()
    $scope.gaugeOption = {
      tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
          {
              name: '业务指标',
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 25,
              splitNumber: 5,
              pointer: {
                length: '30%'
              },
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#c33430'],[0.8, '#d38310'],[1, '#399437']],
                    width: 20
                }
            },
            detail: {
              formatter: [
                '{a|第} {b|【{value}】} {a|名}',
                '{c|环球排名持平     评分74.5} {d|良}'
              ].join('\n'),
              rich: {
                  a: {
                   color: '#666',
                   fontSize: 14
                  },
                  b: {
                    color: '#c33430',
                    fontSize: 16,
                    fontWeight: 'bold'
                  },
                  c: {
                    height: 40,
                    color: '#333',
                    fontSize: 14
                  },
                  d: {
                    width: 24,
                    height: 24,
                    lineHeight: 24,
                    fontSize: 14,
                    color: '#fff',
                    backgroundColor: '#e5621c'
                  } 
              }

            },

            data: [{value: 5, name: ''}]
          }
      ]
    }
  })
});
