<template>
  <div class="leftnavigation">
    <ul>
      <li :class="activeClass == 1 ? 'actived':''" @click="getItem(1)">
        <span class="svg-container">
          <svg-icon icon-class="star" />
        </span>
        <router-link to="/dashboard">首页</router-link>
      </li>

      <li :class="activeClass == 2 ? 'actived':''" @click="getItem(2)">
        <span class="svg-container">
          <svg-icon icon-class="guide" />
        </span>
        <router-link to="/organization">组织信息</router-link>
      </li>
      <li :class="activeClass == 3 ? 'actived':''" @click="getItem(3)">
        <span class="svg-container">
          <svg-icon icon-class="chart" />
        </span>

        <router-link to="/levelTerminal">lite/pro终端统计</router-link>
      </li>
      <li :class="activeClass == 4 ? 'actived':''" @click="getItem(4)">
        <span class="svg-container">
          <svg-icon icon-class="nested" />
        </span>
        <router-link to="/versionTerminal">终端版本信息</router-link>
      </li>
      <li :class="activeClass == 5 ? 'actived':''" @click="getItem(5)">
        <span class="svg-container">
          <svg-icon icon-class="component" />
        </span>
        <router-link to="/media">媒体信息</router-link>
      </li>
      <li :class="activeClass == 6 ? 'actived':''" @click="getItem(6)">
        <span class="svg-container">
          <svg-icon icon-class="dashboard" />
        </span>
        <router-link to="/registerMonth">注册-月视图</router-link>
      </li>
      <li :class="activeClass == 7 ? 'actived':''" @click="getItem(7)">
        <span class="svg-container">
          <svg-icon icon-class="example" />
        </span>
        <router-link to="/registerDay">注册-日/周视图</router-link>
      </li>
      <li :class="activeClass == 8 ? 'actived':''" @click="getItem(8)">
        <span class="svg-container">
          <svg-icon icon-class="table" />
        </span>
        <router-link to="/orgLoginDay">组织登录-日/周视图</router-link>
      </li>
      <li :class="activeClass == 9 ? 'actived':''" @click="getItem(9)">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <router-link to="/userLogin">用户登录统计</router-link>
      </li>
      <li :class="activeClass == 10 ? 'actived':''" @click="getItem(10)">
        <span class="svg-container">
          <svg-icon icon-class="peoples" />
        </span>
        <router-link to="/newUser">新增用户统计</router-link>
      </li>

      <li :class="activeClass == 11 ? 'actived':''" @click="getItem(11)">
        <span class="svg-container">
          <svg-icon icon-class="tab" />
        </span>
        <router-link to="/license">许可证统计</router-link>
      </li>
      <li :class="activeClass == 12 ? 'actived':''" @click="getItem(12)">
        <span class="svg-container">
          <svg-icon icon-class="international" />
        </span>
        <router-link to="/order">订单统计</router-link>
      </li>

      <!-- <li><a href=""></a></li>
           <li><a href=""></a></li>
           <li><a href=""></a></li>
           <li><a href=""></a></li>
      <li><a href=""></a></li>-->
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  //父子通信通过props进行传递
  props: ["routeName"],
  data() {
    return {
      activeClass: 0
    };
  },
  //多个可以使用这引入
  computed: {
    // vuex中的封装的一个函数
    // ... 是将对象进行展开 new set可以对数组进行去重
    ...mapState(["leftItem"])
  },
  //生命周期的初始化函数
  created() {
    this.init();
  },
  methods: {
    getItem(index) {
      this.activeClass = index;
    },
    init() {
      console.log("son:" + this.routeName);
    }
  },
  created() {
    if (this.$route.name == "dashboard") {
      this.activeClass = 1;
    }

    if (this.$route.name == "organization") {
      this.activeClass = 2;
    }
    if (this.$route.name == "levelTerminal") {
      this.activeClass = 3;
    }
    if (this.$route.name == "onlineTerminal") {
    }
    if (this.$route.name == "versionTerminal") {
      this.activeClass = 4;
    }
    if (this.$route.name == "media") {
      this.activeClass = 5;
    }
    if (this.$route.name == "registerMonth") {
      this.activeClass = 6;
    }
    if (this.$route.name == "registerDay") {
      this.activeClass = 7;
    }

    if (this.$route.name == "orgLoginDay") {
      this.activeClass = 8;
    }

    if (this.$route.name == "userLogin") {
      this.activeClass = 9;
    }
    if (this.$route.name == "newUser") {
      this.activeClass = 10;
    }
    if (this.$route.name == "license") {
      this.activeClass = 11;
    }
    if (this.$route.name == "order") {
      this.activeClass = 12;
    }
  }
};
</script>
<style lang="scss">
.leftnavigation {
  z-index: 1001;
  overflow: hidden;
  ul {
    padding-top: 20px;
    li {
      font-size: 14px;
      color: white;
      padding: 20px 20px 20px 30px;
      a{
         color: white;
      }
    }
    li:hover {
      background-color: #263445;
    }
  }
  .actived {
    background-color: #263445;
  }
}
</style>