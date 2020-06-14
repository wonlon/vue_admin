<template>
  <div class="mainContainer">
    <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
     </aside>
     <section class="rightContainer">
       <NavHeader>
          <slot name="modelName">订单统计</slot>
        </NavHeader>

        <div class="orderContainer" v-loading="listLoading">
          <div class="searchContainer">
                <span class="demonstration">选择日期(间隔一个月)：</span>
                <el-date-picker
                v-model="exCheckDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="chooseTimeRange"
                @focus="changeDatefocus"
                :picker-options="pickerOptions">
                </el-date-picker>
                 <el-button type="primary" @click="init()">搜索</el-button>
            </div>
           <div class="orderChartContainer">
                <LineMarkChartTwo style="height:38vh;width:100%" :chart-data="chartAllOrderData"/>
                <LineMarkChartFour style="height:38vh;width:100%" :chart-data="chartOrderData"/>
            </div>
        </div>
     </section>
  </div>
</template>
<style lang="scss">


</style>
<script>
import './../../assets/scss/order.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import axios from 'axios';

import LineMarkChartTwo from '../../components/chart/LineMarkChartTwo'
import LineMarkChartFour from '../../components/chart/LineMarkChartFour'


import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   LineMarkChartTwo,
   LineMarkChartFour
  },
  mounted() {
     this.init();
  },
  data() {
    return {
      listLoading:true,
        chartAllOrderData:{
            'xData':[],
            'charDataInfo1':[],
            'charDataInfo2':[],
            'line1':'',
            'line2':'',
            'chartTitle':''
        },
        chartOrderData:{
            'xData':[],
            'charDataInfo1':[],
            'charDataInfo2':[],
            'charDataInfo3':[],
            'charDataInfo4':[],
            'line1':'',
            'line2':'',
            'line3':'',
            'line4':'',
            'chartTitle':''
        },
        exCheckDate: [],
        minDate: '',
        maxDate: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }],
        onPick: ({
            maxDate,
            minDate
          }) => {
            this.maxDate = maxDate;
            this.minDate = minDate;
          },
          disabledDate: (date) => {
            let maxDate = this.maxDate;
            let minDate = this.minDate;
            let endTime = '';
            if (minDate) {
              let val = Date.now() - (new Date(this.minDate).valueOf() + 30 * 24 * 60 * 60 * 1000);
              if (val < 0) {
                endTime = Date.now() - this.nowNum * 24 * 60 * 60 * 1000
                // this.nowNum == 1时不包含当前日期， this.nowNum == 0时包含当前日期
              } else {
                endTime = (new Date(this.minDate).valueOf() + 30 * 24 * 60 * 60 * 1000);
              }
              if (minDate && maxDate) {
                return date && (date.valueOf() > endTime)
              }
              return date && (date.valueOf() > endTime || date.valueOf() < minDate.valueOf() - 30 * 24 * 60 * 60 *
                1000)
            } else {
              return date && (date.valueOf() > Date.now() - this.nowNum * 24 * 60 * 60 * 1000)
            }
          }
        },
        value1: '',
        value2: '',
        chartData:{
            'xData':[],
            'mixInfo':[],
            'chartTitle':''
        },
        starttime: '',
        endtime: '',
        series:[],
        mediaTableData:[]
    }
  },
  methods: {
  chooseTimeRange() {
    this.starttime = this.exCheckDate[0];
        this.endtime = this.exCheckDate[1];
       if (!this.exCheckDate) {
          this.minDate = '';
          this.maxDate = '';
          return
        }
        // console.log([this.minDate,this.maxDate]);
        this.$emit('input', this.exCheckDate);
        this.$emit('change', this.exCheckDate);
    },
    changeDatefocus() {
        this.exCheckDate = []
        this.minDate = '';
        this.maxDate = '';
      },
   init(){
       

  
      var param = {
        start:this.starttime,
        end:this.endtime
      };
      axios.get("/api/order/day",{
        params:param
      }).then((response)=>{
          var res = response.data;
          if(res.status == 10000){
            
              this.chartAllOrderData.xData = res.data.orderTotal.xdata;
              this.chartAllOrderData.charDataInfo1 = res.data.orderTotal.charDataInfo[0];
              this.chartAllOrderData.charDataInfo2 = res.data.orderTotal.charDataInfo[1];
              this.chartAllOrderData.line1 = '总订单';
              this.chartAllOrderData.line2 = '实收金额';
              this.chartAllOrderData.chartTitle = '订单总数统计';



              this.chartOrderData.xData = res.data.orderInfo.xdata;
              this.chartOrderData.charDataInfo1 = res.data.orderInfo.charDataInfo[0];
              this.chartOrderData.charDataInfo2 = res.data.orderInfo.charDataInfo[1];
              this.chartOrderData.charDataInfo3 = res.data.orderInfo.charDataInfo[2];
              this.chartOrderData.charDataInfo4 = res.data.orderInfo.charDataInfo[3];
              this.chartOrderData.line1 = '初始化';
              this.chartOrderData.line2 = '无效订单';
              this.chartOrderData.line3 = '待付款';
              this.chartOrderData.line4 = '已付款';
              this.chartOrderData.chartTitle = '订单情况统计';
              this.listLoading = false;
              this.exCheckDate = res.data.exCheckDate;
              
          }else{
            
          }
      });



    },
  }
};
</script>
