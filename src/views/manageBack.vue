<template>
  <el-container id="main">
    <el-aside
      ><ManageAside @selectChange="selectChange"></ManageAside
    ></el-aside>
    <el-main>
      <el-container>
        <el-header><ManageHeader></ManageHeader></el-header>
        <el-main>main</el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
import ManageAside from "./../components/manageAside";
import ManageHeader from "./../components/manageHeader";
export default {
  components: {
    ManageAside,
    ManageHeader,
  },
  data() {
    return {
      stateIndex: 1,
    };
  },
  methods: {
    selectChange(index) {
      this.stateIndex = index;
    },
  },
};
</script>
<style scoped>
#main {
  height: 100%;
}
#main .el-aside {
  height: 100%;
  width: 180px !important;
}
</style>
