<template>
  <div class="mainContainer">
     <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
     </aside>

    <section class="rightContainer">
         <NavHeader>
          <slot name="modelName">媒体信息</slot>
        </NavHeader>
        <div class="mediaContainer" v-loading="listLoading">

                 <div id="myChartMediaplayer"></div>

                 <div class="mediaTable">
                        <el-table
                        :data="mediaTableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            type='index'
                            label="序号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="item_type_name"
                            label="媒体类型"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="item_type_count"
                            label="使用量">
                        </el-table-column>
                        </el-table>
                  </div>
            </div>
    </section>
    </div>
  
</template>
<style lang="scss">

</style>
<script>
import './../../assets/scss/media.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import axios from 'axios';

import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
  },
  mounted() {
     this.init();
  },
  data() {
    return {
      listLoading:true,
        xdata:[],
        series:[],
        mediaTableData:[]
    }
  },
  methods: {

   init(){

          axios.get("/api/media/type").then((response)=>{
              var res = response.data;
              if(res.status == 10000){
                  this.xdata = res.data.categoriesJson;
                  this.series = res.data.seriesJson[0].data;
                  this.mediaTableData = res.data.rows;
                  this.mediaDraw(this.xdata,this.series);
                  this.listLoading = false;
              }else{
                
              }
          });
    },

      mediaDraw (xdata, series) {
              // 实例化echarts对象
              let myChartMediaplayerDrawer = echarts.init(document.getElementById('myChartMediaplayer'))

              // 绘制条形图
              var option = {
                  title: {
                      text: '媒体信息',
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
                        // rotate:40 ,
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

                          barWidth: '30',
                          type: 'bar',
                          data: series,
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
                            fontSize: '13'
                          }
                        }
                      }
                  ]
              };
              myChartMediaplayerDrawer.setOption(option);

      }
  }
};
</script>
