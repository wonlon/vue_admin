<template>
  <div class="mainContainer">
    <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
     </aside>

      <section class="rightContainer">
          <NavHeader>
            <slot name="modelName">注册-月视图</slot>
          </NavHeader>

          <div class="registerMonthContainer" v-loading="listLoading">
              <div class="registerMonthChartContainer">
                  <chart height="100%" width="100%" :chart-data="chartData"/>
              </div>
          </div>
      </section>
    
    </div>
</template>
<style lang="scss">

</style>
<script>
import './../../assets/scss/registerMonth.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import axios from 'axios';
import Chart from '../../components/chart/MixChart'


import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   Chart
  },
  mounted() {
     this.init();
  },
  data() {
    return {
      listLoading:true,
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
  
   init(){
          axios.get("/api/analysis/registerMonth").then((response)=>{
              var res = response.data;
              if(res.status == 10000){
                 this.chartData.xData = res.data.xdata;
                this.chartData.mixInfo = res.data.mixInfo;
                this.chartData.chartTitle = '注册-月视图';
                this.listLoading = false;
              }else{
                
              }
          });
    },
  }
};
</script>
