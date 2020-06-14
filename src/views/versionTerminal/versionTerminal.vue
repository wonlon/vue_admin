<template>
  <div class="mainContainer">
    <aside class="leftNav">
        <LeftNavigation></LeftNavigation>
    </aside>
    
     <section class="rightContainer">
         <NavHeader class="mainHeaer">
          <slot name="modelName">终端版本信息</slot>
        </NavHeader>

        <div class="versionContainer" v-loading="listLoading">
          <div class="versionMainContainer" v-loading="listLoading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="高频版本信息" name="first">
                  <div class="versionHeightChart">
                  <div style='height: 30px;'></div>
                  <div id="myChartTplayer"></div>
                  <div id="myChartVplayer"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="vplayer详细版本信息" name="second">
                  <div class="versionTableBak">
                    <div class="versionTable">
                    <el-table
                    :data="vplayerTableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="version"
                      label="版本号"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="count"
                      label="数量"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="accounted"
                      label="占比">
                    </el-table-column>
                  </el-table>
                  </div>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="tplayer详细版本信息" name="three">
                  <div class="versionTableBak">
                    <div class="versionTable">
                    <el-table
                    :data="tplayerTableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="version"
                      label="版本号"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="count"
                      label="数量"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="accounted"
                      label="占比">
                    </el-table-column>
                  </el-table>
                  </div>
                  </div>
              </el-tab-pane>
              </el-tabs>
          </div>
        </div>
      </section>


    
    </div>

  </div>
</template>
<style lang="scss">



</style>
<script>
import './../../assets/scss/versionTerminal.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import axios from 'axios';
import echarts from 'echarts'

export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,

  },
  data() {
    return {
      activeName: 'first',
      tplayerXdatas:[],
      tplayerDatas:[],
      vplayerXdata:[],
      vplayerData:[],
      tplayerCount:0,
      vplayerCount:0,
      listLoading: true,
      vplayerTableData: [],
      tplayerTableData:[]
    };
  },
  computed:{
    tplayerXdata:{
      get:function(){
        return this.tplayerXdatas
      }
    },
    tplayerData:{
      get:function(){
        return this.tplayerDatas
      }
    }
  },

  mounted() {
    this.init();
    //  调用绘制图表的方法
    
  },
  methods: {
    init(){

          axios.get("/api/terminal/version").then((response)=>{
              var res = response.data;
              if(res.status == 10000){
                  this.vplayerXdata = res.data.syncCategories;
                  this.vplayerData = res.data.syncSeries;

                  this.tplayerXdatas = res.data.asynCategories;
                  
                  
                  this.tplayerDatas = res.data.asynSeries;

                  this.tplayerCount = res.data.totalMap.asyn;
                  this.vplayerCount = res.data.totalMap.sync;
                  this.vplayerTableData = res.data.vplayerTableData;
                  this.tplayerTableData = res.data.tplayerTableData;

                   this.tplayerDraw(this.tplayerXdata, this.tplayerData,this.tplayerCount);
                   this.vplayerDraw(this.vplayerXdata, this.vplayerData,this.vplayerCount);
                    this.listLoading = false;

              }else{
                
              }
          });
    },
      vplayerDraw (xdata,ydata,vCount) {
              // 实例化echarts对象

              let myChartVplayerDrawer = echarts.init(document.getElementById('myChartVplayer'))

              // 绘制条形图
              var option = {
                  title: {
                      text: 'vplayer播放器,总数:'+vCount,
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
                      data:xdata,
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
                          barWidth: '15',
                          type: 'bar',
                          data: ydata,
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
                            fontSize: '12'
                          }
                        }
                      }
                  ]
              };
              myChartVplayerDrawer.setOption(option);

      },

      tplayerDraw (xdata,ydata,tCount) {
              // 实例化echarts对象
              let myChartTplayerDrawer = echarts.init(document.getElementById('myChartTplayer'))
              // 绘制条形图
              var optiont = {
                  title: {
                      text: 'Tplayer播放器,总数:'+tCount,
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
                      splitNumber: '1',
                      type : 'category',
                      axisLine: {/*坐标轴，轴线的设置*/
                        lineStyle: {
                          color: "rgba(224,224,224,0.5)",
                        }
                      },
                      axisLabel: {
                        interval:0,
                        rotate:25 ,
                        textStyle: {
                          // color: "rgba(169,226,251,0.5)"
                          color: "#5C5C61"
                        }
                      },
                      data:xdata,
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
                          barWidth: '15',
                          type: 'bar',
                          data: ydata,
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
                            color: 'rgba(113,237,255)',
                            fontSize: '12'
                          }
                        }
                      },
                  ],
                //   dataZoom:{
                //     realtime:true, //拖动滚动条时是否动态的更新图表数据
                //     height:20,//滚动条高度
                //     start:40,//滚动条开始位置（共100等份）
                //     end:65//结束位置（共100等份）
                // }  
              };
              myChartTplayerDrawer.setOption(optiont);
      }
  }
};
</script>
