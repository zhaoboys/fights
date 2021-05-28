<template>
  <el-container id="main">
    <el-aside
      ><ManageAside @selectChange="selectChange"></ManageAside
    ></el-aside>
    <el-main>
      <el-container>
        <el-header><ManageHeader></ManageHeader></el-header>
        <el-main>
          <div v-if="stateIndex == 1"><ManagePlane></ManagePlane></div>
          <div v-if="stateIndex == 2"><ManageUser></ManageUser></div>
          <div v-if="stateIndex == 3"><ManageCity></ManageCity></div>
          <div v-if="stateIndex == 4"><ManageTicket></ManageTicket></div>
          <div v-if="stateIndex == 5"><ManagePub></ManagePub></div>
          <div v-if="stateIndex == 6">
            <MangePlaneDynamic></MangePlaneDynamic>
          </div>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
import ManageAside from "./../components/manageAside";
import ManageHeader from "./../components/manageHeader";
import ManagePlane from "./../components/managePlane";
import ManageUser from "./../components/manageUser";
import ManageCity from "./../components/manageCity";
import ManageTicket from "./../components/manageTicket";
import ManagePub from "./../components/managePub";
import MangePlaneDynamic from "./../components/managePlaneDynamic";
export default {
  components: {
    ManageAside,
    ManageHeader,
    ManagePlane,
    ManageUser,
    ManageCity,
    ManageTicket,
    ManagePub,
    MangePlaneDynamic,
  },
  data() {
    return {
      stateIndex: "1",
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
