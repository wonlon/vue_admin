<template>
  <div>
    <NavHeader>
      <slot name="modelName">在线终端</slot>

    </NavHeader>
    <LeftNavigation></LeftNavigation>
    <div class="first_perch"></div>

    <div class="terminalContainer">


      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Tplayer播放器" name="first">
      <div class="terminalbk">
      <div class="terminalTable">
         <div id="myChartTplayer"></div>
         <div>
           <PieChart :chart-data="tPlayerPieChartData"></PieChart>
         </div>
      </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Vplayer播放器" name="second">
       <div class="terminalbk">
      <div class="terminalTable">
      <div id="myChartVplayer"></div>
         <div class="vplayerPie">
           <PieChart class="vplayerPieChart" :chart-data="vPlayerPieChartData"></PieChart>
         </div>
      </div>
       </div>
    </el-tab-pane>
    </el-tabs>


      
    </div>
    </div>
    
    

  </div>
</template>
<style lang="scss">

 #myChartTplayer{
        width: 100%;
        min-height: 300px;
        clear: both;
        box-sizing: border-box;
        margin: 30px auto;

    }
    #myChartVplayer{
        width: 100%;
        min-height: 300px;
        clear: both;
        box-sizing: border-box;
        margin: 30px auto;

    }
    .vplayerPie{

      // border: solid 1px red;
      .vplayerPieChart{
        // margin: 20px auto;
        // margin-left: 40%;
        // width: 1005;
      }
    }

</style>
<script>
import './../../assets/scss/onlineTerminal.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import PieChart from "./PieChart";

import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   PieChart
  },
  mounted() {
     // 调用绘制图表的方法
     this.tplayerDraw();
     this.vplayerDraw();
  },
  data() {
    return {
      tPlayerPieChartData:{
        'playerInfo':[
              { value: 320, name: 'V1.8.1' },
              { value: 240, name: 'V1.7.0' },
              { value: 149, name: 'V2.8.0' },
              { value: 100, name: 'V2.9.0' },
              { value: 59, name: 'V3.3.0' }
            ]
      },
      vPlayerPieChartData:{
        'playerInfo':[
              { value: 320, name: 'V1.8.3' },
              { value: 240, name: 'V1.7.0' },
              { value: 149, name: 'V2.8.0' },
              { value: 100, name: 'V2.9.0' },
              { value: 59, name: 'V3.3.0' }
            ]
      },
      activeName: 'first',
      tableData: [{
          id: '1',
          player_id: '21',
          onlineTime: '2018-06-28 16:12：56',
          Ip:"192.9.9.2",
          identifier:"HJJSKAAA"
        }, {
          id: '1',
          player_id: '21',
          onlineTime: '2018-06-28 16:12：56',
          Ip:"192.9.9.2",
          identifier:"HJJSKAAA"
        }, {
          id: '1',
          player_id: '21',
          onlineTime: '2018-06-28 16:12：56',
          Ip:"192.9.9.2",
          identifier:"HJJSKAAA"
        }, {
          id: '1',
          player_id: '21',
          onlineTime: '2018-06-28 16:12：56',
          Ip:"192.9.9.2",
          identifier:"HJJSKAAA"
        }]
 
    };
  },
  methods: {
    handleClick(tab, event) {
        if(tab.name == 'first')
        {

            this.tplayerDraw();
            // this.vplayerDraw();
        }
        else if(tab.name == 'second')
        {
        
            this.vplayerDraw();
            // this.tplayerDraw();
        }
      
      },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      vplayerDraw () {
              // 实例化echarts对象

              let myChartVplayerDrawer = echarts.init(document.getElementById('myChartVplayer'))

              // 绘制条形图
              var option = {
                  title: {
                      text: 'vplayer播放器',
                      top: 5,
                      left: 'center',
                      textStyle:{
                        color:'#5C5C61'
                      } 
                  },
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  legend: {
                      data: [ ],
                      top: 30
                  },
                  // X轴
                  xAxis: [
                    {
                      type : 'category',
                      axisLine: {/*坐标轴，轴线的设置*/
                        lineStyle: {
                          color: "rgba(224,224,224,0.5)",
                          // color: #5C5C61,
                        }
                      },
                      axisLabel: {
                        interval:0,
                        rotate:40 ,
                        textStyle: {
                          // color: "rgba(169,226,251,0.5)"
                          color: "#5C5C61"
                        }
                      },
                      data:[
                          '一月', '二月', '三月', '四月', '无月'
                        
                      ],
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                    
                  ],
                  // Y轴
                  yAxis: [
                    {
                      type : 'value',
                      splitNumber: '7',
                      axisLine: {/*坐标轴，轴线的设置*/
                        lineStyle: {
                          color: "rgba(224,224,224,0.5)",
                        }
                      },
                      splitLine: {
                        show: true,
                        lineStyle:{
                          color: 'rgba(224,224,224,0.2)'
                        }
                      },
                      axisLabel: { /*坐标轴的刻度文字设置*/
                        formatter: '{value}',
                        textStyle: {
                          color: "rgba(169,226,251,0.5)"
                        }
                      }
                    }
                  ],
                  // 数据
                  series: [
                      // {
                      //     name: '衣服',
                      //     type: 'bar',
                      //     data: [120, 100, 440, 320, 150]
                      // },
                      {
                          // name: '帽子',
                          barWidth: '30',
                          type: 'bar',
                          data: [200, 120, 240, 330, 170,200, 120, 240, 330, 170,200, 120, 240, 330, 170,200, 120, 240, 330, 170],
                          itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#45bdc5'
                            }, {
                              offset: 1,
                              color: 'rgba(113,237,255,0.1)'
                            }]),
                          }
                        },
                        label: {
                          show: true, //开启显示
                          position: 'top', //在上方显示
                          textStyle: { //数值样式
                            color: 'rgba(113,237,255,1)',
                            fontSize: '18'
                          }
                        }
                      },
                      // {
                      //     name: 'bar',
                      //     type: 'line',
                      //     data: [120, 200, 240, 260, 300]
                      // },
                      // {
                      //     name: 'bar',
                      //     type: 'line',
                      //     data: [120, 200, 300, 140, 260]
                      // }
                  ]
              };
              myChartVplayerDrawer.setOption(option);

      },

      tplayerDraw () {
              // 实例化echarts对象
              let myChartTplayerDrawer = echarts.init(document.getElementById('myChartTplayer'))
              // 绘制条形图
              var optiont = {
                  title: {
                      text: 'Tplayer播放器',
                      top: 5,
                      left: 'center',
                      textStyle:{
                        color:'#5C5C61'
                      } 
                  },
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  legend: {
                      data: [ ],
                      top: 30
                  },
                  // X轴
                  xAxis: [
                    {
                      type : 'category',
                      axisLine: {/*坐标轴，轴线的设置*/
                        lineStyle: {
                          color: "rgba(224,224,224,0.5)",
                          // color: #5C5C61,
                        }
                      },
                      axisLabel: {
                        interval:0,
                        rotate:40 ,
                        textStyle: {
                          // color: "rgba(169,226,251,0.5)"
                          color: "#5C5C61"
                        }
                      },
                      data:[
                          'V1.1.0', 'V1.2.0', 'V1.3.0', 'V1.4.0', 'V1.5.0',
                          'V1.6.0', 'V1.7.0', 'V1.8.0', 'V1.9.0', 'V2.1.0',
                          'V1.6.0', 'V1.7.0', 'V1.8.0', 'V1.9.0', 'V2.1.0',
                          'V1.6.0', 'V1.7.0', 'V1.8.0', 'V1.9.0', 'V2.1.0'
                      ],
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                    
                  ],
                  // Y轴
                  yAxis: [
                    {
                      type : 'value',
                      splitNumber: '7',
                      axisLine: {/*坐标轴，轴线的设置*/
                        lineStyle: {
                          color: "rgba(224,224,224,0.5)",
                        }
                      },
                      splitLine: {
                        show: true,
                        lineStyle:{
                          color: 'rgba(224,224,224,0.2)'
                        }
                      },
                      axisLabel: { /*坐标轴的刻度文字设置*/
                        formatter: '{value}',
                        textStyle: {
                          color: "#5C5C61"
                        }
                      }
                    }
                  ],
                  // 数据
                  series: [
                      {
                          barWidth: '30',
                          type: 'bar',
                          data: [200, 120, 240, 330, 170,200, 120, 240, 330, 170,200, 120, 240, 330, 170,200, 120, 240, 330, 170],
                          itemStyle: {
                          normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: '#45bdc5'
                            }, {
                              offset: 1,
                              color: 'rgba(113,237,255,0.1)'
                            }]),
                          }
                        },
                        label: {
                          show: true, //开启显示
                          position: 'top', //在上方显示
                          textStyle: { //数值样式
                            color: 'rgba(113,237,255,1)',
                            fontSize: '18'
                          }
                        }
                      },
                  ]
              };
              myChartTplayerDrawer.setOption(optiont);
      }
  }
};
</script>
