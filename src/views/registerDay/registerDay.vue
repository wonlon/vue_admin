<template>
  <div class="mainContainer">
     <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
     </aside>
     <section class="rightContainer">
          <NavHeader>
            <slot name="modelName">注册-日/周视图</slot>
          </NavHeader>
          <section class="registerDayContainer" v-loading="listLoading">
            <div class="searchContainer">
                <div class="searchmainContainer">
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
            </div>
        


           <div class="registerDayChartContainer">
                <LineMarkChart style="height:38vh;width:100%" :chart-data="chartDayData"/>
                <LineMarkChart style="height:38vh;width:100%" :chart-data="chartWeekData"/>
            </div>
          </section>
      </section>

  </div>
</template>
<style lang="scss">
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);

  .dayLine{
    height:50%;
    width:100%;
}
}

</style>
<script>
import './../../assets/scss/registerDay.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import axios from 'axios';
import LineMarkChart from '../../components/chart/LineMarkChart'


import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   LineMarkChart
  },
  mounted() {
     this.init();
  },
  data() {
    return {
      listLoading:true,
        chartDayData:{
            'xData':[],
            'charDataInfo':[],
            'chartTitle':''
        },
        chartWeekData:{
            'xData':[],
            'charDataInfo':[],
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
        starttime: '',
        endtime: '',
        value2: '',
        chartData:{
            'xData':[],
            'mixInfo':[],
            'chartTitle':''
        },
        series:[],
        mediaTableData:[]
    }
  },
  methods: {
  chooseTimeRange() {

       if (!this.exCheckDate) {
          this.minDate = '';
          this.maxDate = '';
          return
        }
        
        this.starttime = this.exCheckDate[0];
        this.endtime = this.exCheckDate[1];

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
          axios.get("/api/analysis/register",{
            params:param
          }).then((response)=>{
              var res = response.data;
              if(res.status == 10000){
                  this.exCheckDate = res.data.exCheckDate;
                  this.chartDayData.xData = res.data.day.xdata;
                  this.chartDayData.charDataInfo = res.data.day.charDataInfo;
                  this.chartDayData.chartTitle = '注册-日视图';

                  this.chartWeekData.xData = res.data.week.xdata;
                  this.chartWeekData.charDataInfo = res.data.week.charDataInfo;
                  this.chartWeekData.chartTitle = '注册-周视图';
                  this.listLoading=false;
              }else{
                
              }
          });
    },
  }
};
</script>
