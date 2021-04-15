<template>
  <div>
    <div>
      <span>欢迎来到航班查询系统</span>
    </div>
    <div class="searchBox">
      <el-collapse-transition>
        <el-tabs v-show="show" v-model="activeName">
          <el-tab-pane label="航班查询" name="first">
            <PlaneSearchTable :cityArr="cityArr"></PlaneSearchTable>
          </el-tab-pane>
          <el-tab-pane label="航班动态查询" name="second">
            <PlaneIdSearch :cityArr="cityArr"></PlaneIdSearch>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
import PlaneSearchTable from "./../components/planeSearchTable";
import PlaneIdSearch from "./../components/planeIdSearch";
export default {
  components: {
    PlaneSearchTable,
    PlaneIdSearch,
  },
  data() {
    return {
      show: false,
      activeName: "first",
      cityArr: null,
    };
  },
  created() {
    this.show = true;
    this.getCity();
  },
  methods: {
    async getCity() {
      let res = await this.$request({ type: "get", url: "/home/getCity" });
      if (res.data.length > 0) {
        this.cityArr = res.data;
        console.log(this.cityArr);
      }
    },
  },
};
</script>
<style scoped>
.searchBox {
  width: 500px;
  margin: auto;
  border: 1px solid #000;
}
::v-deep .searchBox .el-tabs__nav {
  width: 100%;
}
/* ::v-deep .searchBox .el-form-item {
  padding-left: 20%;
} */
::v-deep .searchBox .el-tabs__nav .el-tabs__item {
  width: 50%;
}
::v-deep .searchBox .el-form-item__content {
  text-align: left;
}
::v-deep .searchBtn .el-form-item__content {
  text-align: center;
}
::v-deep .searchBox .el-button {
  width: 100px;
}
::v-deep .el-tabs__content {
  padding: 0 19%;
}

::v-deep .el-scrollbar__wrap {
  max-height: 200px;
}
</style>
