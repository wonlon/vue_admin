<template>
  <div class="mainContainer">

    <aside class="leftNav">
      <LeftNavigation></LeftNavigation>
    </aside>

    <section class="rightContainer">
      <NavHeader class="mainHeaer">
        <slot name="modelName">组织信息</slot>
      </NavHeader>

      <div class="myTableContainer">
        <div class="myComplexTable">
          <ComplexTable></ComplexTable>
        </div>
      </div>
    </section>
    
    
  </div>
</template>
<style lang="scss">


</style>
<script>
import './../../assets/scss/organization.scss';
import NavHeader from "./../../components/Header/NavHeader";
import LeftNavigation from "./../../components/LeftNavigation/LeftNavigation";
import ComplexTable from "./complex-table";

// import TransactionTable from "./components/TransactionTable";
export default {
  methods: {},
  // 使用组件必须加进来，上面的模板代码才能进行引用
  components: {
   NavHeader,
   LeftNavigation,
   ComplexTable
  },
  data() {
    return {
    //   tableData: []
    };
  }
};
</script>
