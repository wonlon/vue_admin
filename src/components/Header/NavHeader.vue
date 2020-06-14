<template>
    <div class="header">

        <nav class="nav-breadcrumb">
            <a href="/"> <slot></slot></a>
            <!-- 定义一个插槽，可以动态的替换 -->
        
        </nav>

        <ul>
            <li>
                
                <span v-text="nickName" v-if="nickName"></span>
                <i>|</i>
                <a href="javascript:void(0)" class="navbar-link" @click="loginOut">Logout</a>
            </li>
            <li>
                <div>
                 <!-- <img class="icon" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                    <i class="el-icon-caret-bottom down">
                    </i> -->
                    <span>节点选择:</span>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <img style = "width:22px;height:22px;margin:0 3px 0 0" :src=nowImg>{{nowpoint}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="zh"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.zh>{{pointName.zh}}</el-dropdown-item>
                            <el-dropdown-item command="us"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.us>{{pointName.us}}</el-dropdown-item>
                            <el-dropdown-item command="eu"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.eu>{{pointName.eu}}</el-dropdown-item>
                            <el-dropdown-item command="au"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.au>{{pointName.au}}</el-dropdown-item>
                            <el-dropdown-item command="jp"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.jp>{{pointName.jp}}</el-dropdown-item>
                            <el-dropdown-item command="in"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.in>{{pointName.in}}</el-dropdown-item>
                            <el-dropdown-item command="test"><img style = "width:22px;height:22px;margin:0 3px 0 0" :src=pointImg.test>{{pointName.test}}</el-dropdown-item>
                            
                            
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </li>
        </ul>
        
    </div>
</template>
<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    // import { mapState } from 'vuex'
    export default{
        data(){
            return{
            pointImg:{
                  zh:require('./../../assets/images/zh.png'),
                  us:require('./../../assets/images/us.png'), 
                  au:require('./../../assets/images/au.png'), 
                  eu:require('./../../assets/images/eu.png'), 
                  jp:require('./../../assets/images/jp.png'),
                  in:require('./../../assets/images/in.png'),
                  test:require('./../../assets/images/test.png'),
              },
              pointName:{
                  zh:"中国节点",
                  test:"测试环境",
                  us:"美国节点", 
                  au:"澳洲节点", 
                  eu:"欧洲节点", 
                  jp:"日本节点",
                  in:"印度节点",

              },
              userName:'admin',
              userPwd:'123456',
              errorTip:false,
              loginModalFlag:false,
              nowpoint:"加载..", //中国节点
              point:'',
              nowImg:require('./../../assets/images/test.png'),
              // coumputed中已经有nickName属性，所以data，中就不能再定义了
              // nickName:''
            }
        },

        // 在使用vuex的时候
        // 使用实时计算属性，将数据更新到dom中

        //多个可以使用这引入
        computed:{

          // vuex中的封装的一个函数
          // ... 是将对象进行展开 new set可以对数组进行去重
          ...mapState(['nickName'])
        },
        //生命周期的初始化函数
        mounted(){
            this.checkLogin();
        },
        methods:{
            
            handleCommand(point){
                console.log('child:'+point);
                // this.$emit("setNowPoint", point);
                this.point = point;
            
                if(point == 'zh')
                {
                    this.nowImg = this.pointImg.zh;
                    this.nowpoint = this.pointName.zh;
                }
                if(point == 'au')
                {
                    this.nowImg = this.pointImg.au;
                    this.nowpoint = this.pointName.au;
                }
                if(point == 'eu')
                {
                    this.nowImg = this.pointImg.eu;
                    this.nowpoint = this.pointName.eu;
                }
                if(point == 'jp')
                {
                    this.nowImg = this.pointImg.jp;
                    this.nowpoint = this.pointName.jp;
                }
                if(point == 'in')
                {
                    this.nowImg = this.pointImg.in;
                    this.nowpoint = this.pointName.in;
                }
                if(point == 'us')
                {
                    this.nowImg = this.pointImg.us;
                    this.nowpoint = this.pointName.us;
                }
                if(point == 'test')
                {
                    this.nowImg = this.pointImg.test;
                    this.nowpoint = this.pointName.test;
                }
                this.setPoint();
            },



            handleCommands(point){
              
              
                if(point == 'zh')
                {
                    this.nowImg = this.pointImg.zh;
                    this.nowpoint = this.pointName.zh;
                }
                if(point == 'au')
                {
                    this.nowImg = this.pointImg.au;
                    this.nowpoint = this.pointName.au;
                }
                if(point == 'eu')
                {
                    this.nowImg = this.pointImg.eu;
                    this.nowpoint = this.pointName.eu;
                }
                if(point == 'jp')
                {
                    this.nowImg = this.pointImg.jp;
                    this.nowpoint = this.pointName.jp;
                }
                if(point == 'in')
                {
                    this.nowImg = this.pointImg.in;
                    this.nowpoint = this.pointName.in;
                }
                if(point == 'us')
                {
                    this.nowImg = this.pointImg.us;
                    this.nowpoint = this.pointName.us;
                }
                if(point == 'test')
                {
                    this.nowImg = this.pointImg.test;
                    this.nowpoint = this.pointName.test;
                }
            },
            setPoint()
            {
                //  location.reload();
                //         console.log('set point:'+this.point);
                var param = {
                    point:this.point
                };
                axios.get("/api/Login/setPoint",{
                    params:param
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == 10000){
                        location.reload();
                        console.log('set point:'+this.point);
                    }else{
                        
                    }
                });
            },
            checkLogin(){

                //子组件通知父组件
                // var minePoint = 'au';
                // this.$emit("setNowPoint", minePoint);
                // this.handleCommand(minePoint,'check');

                axios.get("/api/Login/checkLogin").then((response)=>{
                    var res = response.data;
                    var path = this.$route.pathname;
                    if(res.status == 10000)
                    {
                        this.$store.commit("updateUserName", res.data.username);
                        this.handleCommands(res.data.point);
                    }
                    else
                    {
                        this.$router.push({path:"/"});
                    }
                });
            },
            loginOut(){
                axios.get("/api/Login/loginOut").then((response)=>{
                    let res = response.data;
                    if(res.status == 10000)
                    {
                        this.$router.push({path:"/"});
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
   .header{
       z-index: 99;
       float: right;
    //    width: 88%;
    //    height: 80px;
       box-shadow: 0 1px 4px rgba(0,21,41,.08);
       .nav-breadcrumb{
           display: inline-block;
           line-height: 80px;
           margin-left: 50px;
           width: 100px;
       }
       ul{
           float: right;
           line-height: 80px;
           margin-right: 50px;
           li{
               display: inline-block;
            //    float:left;
               list-style:none;
               padding-left: 20px;
               i{
                    font-size: 16px;
                    color: gray;
               }
               .navbar-link{
                   font-size: 16px;
               }
               .el-dropdown-link {
                    cursor: pointer;
                    color: #409EFF;
                }
                .el-icon-arrow-down {
                    font-size: 12px;
                }
               img{
                   
                        height: 21px;
                        width: 21px;
                    }
           }
           span{
               font-size: 16px;
           }
           .icon{
               cursor: pointer;
               width: 40px;
               height: 40px;
               border-radius: 10px;
           }
           .down{
               cursor: pointer;
               position: absolute;
               font-size: 12px;
               top: 52px
           }
       }
   }
</style>