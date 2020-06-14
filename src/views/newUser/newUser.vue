<template>
  <div class="mainContainer">
    <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
     </aside>
     <section class="rightContainer">
      <NavHeader class="mainHeaer">
        <slot name="modelName">新增用户统计</slot>
      </NavHeader>
        <div class="userContainer" v-loading="listLoading">
        <div class="userChartContainer">
            <div class="searchUserLoginContainer">
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
           <div class="userchart-container">
                <LineMarkChart style="height:70vh;;width:100%" :chart-data="chartDayData"/>
            </div>
        </div>
    </div>
     </section>
      </div>
    

  </div>
</template>
<style lang="scss">


</style>
<script>
import './../../assets/scss/userLogin.scss';
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

        this.$emit('input', this.exCheckDate);
        this.$emit('change', this.exCheckDate);
    },
    changeDatefocus() {
        this.exCheckDate = []
        this.minDate = '';
        this.maxDate = '';
      },
   init(){
        // this.chartDayData.xData = ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09',
        //                         '2018-10','2018-11','2018-12','2019-01','2019-02','2019-03','2019-04','2019-05','2019-06',
        //                         '2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09',
        //                         '2018-10','2018-11','2018-12','2019-01','2019-02','2019-03','2019-04','2019-05','2019-06'];
        // this.chartDayData.charDataInfo = [20,30,40,50,60,70,30,17,18,
        //                         28,38,47,55,66,77,30,19,112,20,30,40,50,60,70,30,17,18,
        //                         28,38,47,55,66,77,30,19,112];
        // this.chartDayData.chartTitle = '新增用户人数日视图';

        
        var param = {
        start:this.starttime,
        end:this.endtime
      };
      axios.get("/api/user/dayNew",{
        params:param
      }).then((response)=>{
          var res = response.data;
          if(res.status == 10000){
                this.chartDayData.xData = res.data.xdata;
                this.chartDayData.charDataInfo = res.data.charDataInfo;
                this.exCheckDate = res.data.exCheckDate;
                this.chartDayData.chartTitle = '新增用户人数日视图';
                this.listLoading = false;
          }else{
            
          }
      });
    },
  }
};
</script>
