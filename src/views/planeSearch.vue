<template>
  <div id="main">
    <div class="imgBox">
      <img src="./../assets/planeIcon/sky.jpeg" alt="" />
    </div>
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班查询系统</span>
    </div>
    <div><UserShow></UserShow></div>
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
import UserShow from "./../components/userShow";
export default {
  components: {
    PlaneSearchTable,
    PlaneIdSearch,
    UserShow,
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
    console.log(this.$store.state.uid, 123);
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
  text-align: center;
  padding: 0 6px 6px;
  border: 1px solid #2f79da;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
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

.titleBox {
  padding: 20px 0 20px 10%;
  font-size: 30px;
  color: #2577e3;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  vertical-align: middle;
}
.titleBox img {
  width: 50px;
  vertical-align: middle;
}
.imgBox {
  position: absolute;
  z-index: -1;
}
.imgBox img {
  max-width: 100%;
}
</style>
