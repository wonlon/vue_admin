<template>
    <div class="select">
        <div class="select-head">
            <span class="select-head-cont">{{siteTxt}}</span>
            <span class="select-icon">▼</span>
        </div>
        <ul class="option">
            <li class="option-item" v-for="item in siteList" @click="changeSite(item)">            
            {{item.siteName}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            siteList: [{
                 siteCode: "zh",
                 siteName: "中国节点"
               },{
                 siteCode: "en",
                 siteName: "美国节点"
               },
            ],
            lang:'zh',
            siteTxt: this.lang === 'zh' ? '中国节点' : '美国节点',
        }
    },
methods: {
   changeSite(item) {
       this.siteTxt = item.siteName;
   },
}
}
</script>

<style scoped>
.select {
    position: relative;
}
.select-head{
    /* border: solid 1px red; */
    overflow: hidden;
    width: 100px;
    height: 40px;
    font-size: 14px;
    color: #202020;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: 40px;
    cursor: pointer;
}
.select-head .select-head-cont {
    float: left;
    padding-right: 10px;
}
.select-head .select-icon {
    float: right;
    font-size: 1px;
    color: gray;
}
.select:hover .option {
    display: block;
}
.option {
    position: absolute;
    left: 0;
    font-size: 14px;
    width: 74px;
    color: #63666E;
    background: #FFFFFF;
    line-height: 25px;
    display: none;
    z-index: 20000;
    box-shadow:0px 2px 15px 0px rgba(0,0,0,0.09);
    border-radius:8px;
    padding: 10px 0;
    text-align: left;
}
.option-item {
    border-bottom: .5px solid rgba(197, 197, 197, 0.27);
    padding: 5px;
    text-indent: 8px;
    cursor: pointer;
}
.option-item:last-child {
    border: none;
}
.option-item:hover{
    color: #535AF8;
}
</style>