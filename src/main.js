// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from  'element-ui';
import './styles/index.scss';

import './icons/index';
import './styles/element-variables.scss'
import './styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css';
// 带有名字的文件导入，使用直接输入真实的方法名
import {currency} from './utils/currency'
import Vuex from 'vuex'

// 全局声明的工具函数，不加(),
Vue.filter("currency",currency);

Vue.config.productionTip = false

Vue.use(ElementUI);

// vuex
const store = new Vuex.Store({
  state:{
    nickName:'',
    routerLink:''
  },
  mutations:{
    updateUserName(state,nickName){
      state.nickName = nickName;
    },
    setLetfNav(state,routerLink){
      state.routerLink = routerLink;
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 记得需要注入，不然找不到
  store,
  components: { App },
  template: '<App/>'
})
