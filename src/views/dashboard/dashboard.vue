<template>
  <div class="mainContainer">

    <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
    </aside>
    <section class="rightContainer">
      <NavHeader class="mainHeaer">
        <slot name="modelName">首页</slot>
      </NavHeader>
      <section class="mainContent">
          <div class="main-containers" v-loading="listLoading">

              <div class="orgContanier">
                <ul>
                  <li>
                    <div class="icoContanier">
                      <div class="peopleShadow">
                        <svg-icon icon-class="user" class="userIcon icon-people card-panel-icon-wrapper" />
                      </div>
                    </div>
                    <div class="dataContanier">
                      <h4>用户总数</h4>
                      <span>{{userCount|currency()}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="icoContanier">
                      <div class="orgShadow">
                        <svg-icon icon-class="peoples" class="orgIcon icon-org card-panel-icon-wrapper" />
                      </div>
                    </div>
                    <div class="dataContanier">
                      <h4>组织总数</h4>
                      <span>{{organizationCount |currency()}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="icoContanier">
                      <div class="teminalShadow">
                        <svg-icon
                          icon-class="chart"
                          class="terminalIcon icon-terminal card-panel-icon-wrapper"
                        />
                      </div>
                    </div>
                    <div class="dataContanier">
                      <h4>终端总数</h4>
                      <span>{{playerCount |currency()}}</span>
                    </div>
                  </li>
                  <li>
                    <div class="icoContanier">
                      <div class="mediaShadow">
                        <svg-icon
                          icon-class="component"
                          class="mediaIcon icon-media card-panel-icon-wrapper"
                        />
                      </div>
                    </div>
                    <div class="dataContanier">
                      <h4>媒体总数</h4>
                      <span>{{mediaCount |currency()}}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="novaChar" >
                <div class="el-row line_chart" style="background: rgb(255, 255, 255); padding: 16px 16px 0px; margin-bottom: 32px;">
                    <LineChart :chart-data="lineChartData"></LineChart>
                </div>

              </div>
          </div>
      </section>

    </section>
  </div>
</template>
<style lang="scss">
html,body,#app{
  height: 100vh;
}
.mainContent{
    height: 100%;
    background-color: #ebedf0;
    display: flex;
}
.main-containers{
  margin: 20px 20px 20px 20px;
  width: 100%;
  display: flex;
  flex-direction:column;

}

.icoContanier {
  float: left;
  width: 80px;
  margin: 20px 0 20px 20px;
  .iconShadow {
    background-color: #ffffff;
    // transition: all .38s ease-out;
    border-radius: 6px;
  }
  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }
    .peopleShadow,
    .icon-user {
      background-color: #36a3f7;
    }

    .orgShadow,
    .icon-org {
      background-color: #40c9c6;
    }

    .teminalShadow,
    .icon-termianl {
      background-color: #f4516c;
    }

    .mediaShadow,
    .icon-media {
      background-color: #34bfa3;
    }
  }
}
.dataContanier {
  float: right;
  width: 120px;
  height: 110px;

  h4 {
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-top: 25px;
  }
  span {
    padding-top: 10px;
    font-size: 20px;
    font-weight: 700;
  }
}
.novaChar{
  flex: 3;
}
.orgContanier {
  flex: 1;
  margin: 20px 0 20px 0;
  ul {
   
    // padding-top: 40px;
    li {
       background-color: #ffffff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      margin-left: 3%;
      float: left;
      width: 21%;
      height: 110px;
      // background-color: #ffffff;
      // border: solid 1px green;
      .userIcon {
        width: 50px;
        height: 50px;
        margin: 10px 0 10px 16px;
        color: #36a3f7;
      }
      .orgIcon {
        width: 50px;
        height: 50px;
        margin: 10px 0 10px 16px;
        color: #40c9c6;
      }
      .terminalIcon {
        width: 50px;
        height: 50px;
        margin: 10px 0 10px 16px;
        color: #f4516c;
      }
      .mediaIcon {
        width: 50px;
        height: 50px;
        margin: 10px 0 10px 16px;
        color: #34bfa3;
      }
    }
  }
}


.line_chart{

  background: rgb(255, 255, 255); 
  padding: 16px 16px 60px; 
  margin-bottom: 32px;
  margin-left: 38px;
  margin-right: 48px;
}
.chart-wrapper{
    width: 30%;
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
}
</style>
<script>
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import RaddarChart from "./components/RaddarChart";
import axios from 'axios';
// import TransactionTable from "./components/TransactionTable";
export default {
  created() {
    this.init()
  },
  methods: {
    init(){
      var param = {};
      axios.get("/api/Org/orgInfo",{
                  params:param
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == 10000)
                    {
                      let data = res.data;
                      this.userCount = data.userCount;
                      this.mediaCount = data.mediaCount;
                      this.organizationCount = data.organizationCount;
                      this.playerCount = data.playerCount;
                      this.lineChartData = data.chartData;
                      this.listLoading = false;
                    }
                    else
                    {
                      console.log(res);
                    }


                });
    },
  },
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
    NavHeader,
    LeftNavigation,
    PieChart,
    LineChart,
    BarChart,
    RaddarChart
  },
  data() {
    return {
      listLoading: true,
      userCount:0,
      mediaCount:0,
      organizationCount:0,
      playerCount:0,
      lineChartData:null,
    };
  }
};
</script>
