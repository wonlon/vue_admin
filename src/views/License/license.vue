<template>
  <div class="mainContainer">
     <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
     </aside>
     <section class="rightContainer">
        <NavHeader>
          <slot name="modelName">许可证统计</slot>
        </NavHeader>

        <div class="licenseContainer" v-loading="listLoading">
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
            <div class="licenseChartContainer">
                  <LineMarkChartThree style="height:38vh;width:100%" :chart-data="chartNewlicneseData"/>
                  <LineMarkChartThree style="height:38vh;width:100%" :chart-data="chartDuelicneseData"/>
            </div>
        </div>
     </section>
    
  </div>
</template>
<style lang="scss">


</style>
<script>
import './../../assets/scss/license.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import axios from 'axios';

import LineMarkChartThree from '../../components/chart/LineMarkChartThree'



import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   LineMarkChartThree
  },
  mounted() {
     this.init();
  },
  data() {
    return {
      listLoading:true,
        chartNewlicneseData:{
            'xData':[],
            'charDataInfo1':[],
            'charDataInfo2':[],
            'charDataInfo3':[],
            'line1':'',
            'line2':'',
            'line3':'',
            'chartTitle':''
        },
        chartDuelicneseData:{
            'xData':[],
            'charDataInfo1':[],
            'charDataInfo2':[],
            'charDataInfo3':[],
            'line1':'',
            'line2':'',
            'line3':'',
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
        starttime:'',
        endtime:'',

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
        console.log([this.minDate,this.maxDate]);
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
      axios.get("/api/analysis/license",{
        params:param
      }).then((response)=>{
          var res = response.data;
          if(res.status == 10000){
            
                this.chartNewlicneseData.xData = res.data.newLicense.xdata;
                this.chartNewlicneseData.charDataInfo1 = res.data.newLicense.charDataInfo[1];
                this.chartNewlicneseData.charDataInfo2 = res.data.newLicense.charDataInfo[2];
                this.chartNewlicneseData.charDataInfo3 = res.data.newLicense.charDataInfo[3];
                this.chartNewlicneseData.line1 = '购买';
                this.chartNewlicneseData.line2 = '赠送';
                this.chartNewlicneseData.line3 = '试用';
                this.chartNewlicneseData.chartTitle = '新增许可证统计';



                this.chartDuelicneseData.xData = res.data.expireLicense.xdata;
                this.chartDuelicneseData.charDataInfo1 = res.data.expireLicense.charDataInfo[1];
                this.chartDuelicneseData.charDataInfo2 = res.data.expireLicense.charDataInfo[2];
                this.chartDuelicneseData.charDataInfo3 = res.data.expireLicense.charDataInfo[3];
                this.chartDuelicneseData.line1 = '购买';
                this.chartDuelicneseData.line2 = '赠送';
                this.chartDuelicneseData.line3 = '试用';
                this.chartDuelicneseData.chartTitle = '到期许可证统计';
                this.listLoading = false;
                this.exCheckDate = res.data.exCheckDate;
              
          }else{
            
          }
      });
    },
  }
};
</script>
