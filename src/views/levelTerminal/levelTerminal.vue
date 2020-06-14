<template>
  <div class="mainContainer">
      <aside class="leftNav">
        <LeftNavigation></LeftNavigation>
      </aside>
      <section class="rightContainer">
         <NavHeader class="mainHeaer">
          <slot name="modelName">lite/pro终端统计</slot>
        </NavHeader>
        <div class="levelTerminalContainer" v-loading="listLoading">
            <div class="levelTerminalChart">
              <div>
                  <h4>Tplayer播放器,Lite总数:{{tplayerLiteCount}},pro总数:{{tplayerProCount}}</h4>
                  <BarChart :chart-data="tPlayerLevelBarChartData"></BarChart>
                </div>
                <div>
                  <h4>Vplayer播放器,Lite总数:{{vplayerLiteCount}},pro总数:{{vplayerProCount}}</h4>
                  <BarChart :chart-data="vPlayerLevelBarChartData"></BarChart>
              </div>
            </div>
        </div>
      </section>
  </div>
</template>
<style lang="scss">
</style>
<script>
import './../../assets/scss/levelTerminal.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import axios from 'axios'
import echarts from 'echarts'
// import TransactionTable from "./components/TransactionTable";
export default {
  
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   PieChart,
   BarChart
  },
  created() {
    this.init();
  },
  data() {
    return {
      tplayerXdata:[],
      tplayerLiteData:[],
      tplayerProData:[],
      tplayerLiteCount:0,
      tplayerProCount:0,
      vplayerLiteCount:0,
      vplayerProCount:0,
      vplayerXdata:[],
      vplayerLiteData:[],
      vplayerProData:[],
      listLoading: true,
    };
  },
  computed:{
    vPlayerLevelBarChartData:{
      get:function(){
        return {
              'xdata':this.vplayerXdata,
              'liteData':this.vplayerLiteData,
              'proData':this.vplayerProData
        }
      }
    },
    tPlayerLevelBarChartData:{
      get:function(){
        return {
              'xdata':this.tplayerXdata,
              'liteData':this.tplayerLiteData,
              'proData':this.tplayerProData
        }
      }
    }

},
  methods: {
    init(){

  
          axios.get("/api/terminal/users").then((response)=>{
              var res = response.data;
              if(res.status == 10000){
                  this.vplayerXdata = res.data.syncCategories;
                  this.vplayerLiteData = res.data.syncSeries[0].data;
                  this.vplayerProData = res.data.syncSeries[1].data;

                  this.tplayerXdata = res.data.asynCategories;
                  this.tplayerLiteData = res.data.asynSeries[0].data;
                  this.tplayerProData = res.data.asynSeries[1].data;
                  this.tplayerLiteCount = res.data.totalMap.asynLite;
                  this.tplayerProCount = res.data.totalMap.asynPro;
                  this.vplayerLiteCount = res.data.totalMap.syncLite;
                  this.vplayerProCount = res.data.totalMap.syncPro;
                  this.listLoading = false;

              }else{
                
              }
          });
      },
  }
};
</script>
