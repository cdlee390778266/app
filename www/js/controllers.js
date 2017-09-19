angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.baseConfig = {
      theme:'default',
      dataLoaded:true
  };

})
//饼状图
.controller('pieCtrl', function($scope, $window, Utils) { 
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
        formatter: "{a} <br/>{b} : {c}"
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: '25%',
        data: [
            {value:8, name:'生态修复项目'},
            {value:3, name:'市政绿化项目'},
            {value:1, name:'地产景观'}
          ]
      },
      series : [
        {
          name: '2017年中报',
          type: 'pie',
          radius : '50%',
          center: ['40%', '50%'],
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
          data: [402029, 359166, 2095669, 1720076, 1239373, 1218978].reverse(),
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        },
        formatter: '{b0}<br />{a0}: {c0}k<br />{a1}: {c1}'
      },
      grid: {
        left: '5%',
        right: '0%',
        bottom: '10%',
        containLabel: true
      },
      legend: {
        bottom: 0,
        data:['股东人数(户)', '股价(元)']
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
          data: ['2016年中报', '2016年三季报', '2016年年报',  '2017年一季报', '2017年中报']
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '股东人数(户)',
          max: 200,
          min: 0,
          axisLabel: {
              formatter: '{value} k'
          },
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: '股价(元)',
          max: 20,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name:'股东人数(户)',
          type:'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          color: ['#418dd9'],
          axisLabel: {
            formatter: '{value} k'
          },
          data: [170, 160, 155, 175, 180]
        },
        {
          name:'股价(元)',
          type:'line',
          xAxisIndex: 0,
          yAxisIndex: 1,
          color: ['#ff5959'],
          symbolSize: 10,
          symbol: 'circle',
          data: [14, 17, 16,16.5, 7.5]
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
        text: '雷达图'
      },
      tooltip: {
        formatter: function(params) {
          var tip = [params.name];
          for(var i = 0; i < $scope.radarOption.radar[0].indicator.length; i++) {
            tip.push($scope.radarOption.radar[0].indicator[i].dsc.text + ': ' +  $scope.radarOption.series[0].data[0].value[i]);
          }
          return tip.join('<br/>');
        }
      },
      radar: [
      {
        indicator: [
            { name: 'R', max: 500, dsc: {level: '良', text: '风控能力', index: 17, levelNum: 1, showIndex: 1}},
            { name: 'D', dsc: {level: '良', text: '成长能力', index: 3, levelNum: 1, showIndex: 2}},
            { name: 'P', dsc: {level: '优', text: '盈利能力', index: 4, levelNum: 2, showIndex: 3}},
            
            { name: 'C', dsc: {level: '良', text: '资本充足率', index: 18, levelNum: 1, showIndex: 4}}
        ],
        radius: 66,
        startAngle: -45,
        splitNumber: 10,
        shape: 'circle',
        name: {
          formatter: function(value, indicator) {
            var top = '';
            var bottom = '';
            var valA = '{a|' + value + '}';
            var valB = '{b|' + indicator.dsc.level + '}';
            var valC = '{c|' + indicator.dsc.text + '}';
            var valD = '{d|[' + indicator.dsc.index + ']}';
            var valE = '';
            if(indicator.dsc.levelNum == 2) {
              valB = '{b1|' + indicator.dsc.level + '}';
              valD = '{d1|[' + indicator.dsc.index + ']}';
            }
            
            switch(indicator.dsc.showIndex){
              case 1: 
                top = valA + valE + valB;
                bottom = valC + valD;
                break;
              case 2: 
                top = valC + valD;
                bottom = valA + valB;
                break;
              case 3: 
                top = valD + valC;
                bottom = valB  + valE  + valA;
                break;
              case 4: 
                top = valB  + valE  + valA;
                bottom = valD  + valC;
                break;
            }

            return [top, bottom].join('\n');
          },
          rich: {
            a: {
             color: '#333',
             fontSize: 14
            },
            b: {
              width: 24,
              height: 24,
              lineHeight: 24,
              fontSize: 14,
              align: 'center',
              color: '#fff',
              backgroundColor: '#e5621c',
              borderColor: '#b3714e'
            },
            b1: {
              width: 24,
              height: 24,
              lineHeight: 24,
              fontSize: 14,
              align: 'center',
              color: '#fff',
              backgroundColor: '#f74f4f',
              borderColor: '#bd6466'
            },
            c: {
              height: 40,
              color: '#333',
              fontSize: 14
            },
            d: {
              color: '#e5621c',
              fontSize: 16,
              fontWeight: 'bold'
            },
            d1: {
              color: '#e83e3f',
              fontSize: 16,
              fontWeight: 'bold'
            } 
          }
        }
      }],
      series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          symbol: 'circle',
          symbolSize: 8,
          areaStyle: {
            normal: {
              opacity: 0.5,
              color: '#ffb782'
            }
          },
          lineStyle: {
            normal: {
              color: '#e76409'
            }
          },
          itemStyle: {
            normal: {
              color: '#e76409'
            }
          },
          data : [
             {
              value : [440, 380, 310, 420],
              name : '能力'
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
        formatter: "公司排名 : {c}"
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
