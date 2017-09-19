/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('starter.directives',[])
  .directive('ngEcharts',['$window', function ($window){
    return {
      link: function(scope,element,attrs,ctrl){
        function refreshChart(){
          var theme = (scope.config && scope.config.theme)
              ? scope.config.theme : 'default';
          element[0].style.width = element[0].parentElement.offsetWidth + 'px';
          scope.chart = echarts.init(element[0],theme);
          if(scope.config && scope.config.dataLoaded === false){
            scope.chart.showLoading();
          }

          if(scope.config && scope.config.dataLoaded){
            scope.chart.setOption(scope.option);
            scope.chart.resize();
            scope.chart.hideLoading();
          }

          if(scope.config && scope.config.event){
            if(angular.isArray(scope.config.event)){
              angular.forEach(scope.config.event,function(value,key){
                  for(var e in value){
                    scope.chart.on(e,value[e]);
                  }
              });
            }
          }
        };

        //自定义参数 - config
        // event 定义事件
        // theme 主题名称
        // dataLoaded 数据是否加载

        scope.$watch(
          function () { return scope.config; },
          function (value) {if (value) {refreshChart();}},
          true
        );

        //图表原生option
        scope.$watch(
          function () { return scope.option; },
          function (value) {if (value) {refreshChart();}},
          true
        );

        $window.onresize = function() {
          element[0].style.width = element[0].parentElement.offsetWidth + 'px';
          scope.chart.resize(); 
        }; 

        refreshChart();
      },
      scope:{
        option:'=ecOption',
        config:'=ecConfig'
      },
      restrict:'EA'
    }
  }])
