<template>
  <div id="asideBox">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="selectChange"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">航班管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-discount"></i>
        <span slot="title">航班动态管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-office-building"></i>
        <span slot="title">城市管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-postcard"></i>
        <span slot="title">机票管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-discount"></i>
        <span slot="title">酒店管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    selectChange(index) {
      console.log(index);
      this.$emit("selectChange", index);
    },
  },
};
</script>
<style scoped>
#asideBox {
  height: 100%;
  /* width: 140px; */
}
#asideBox .el-menu {
  height: 100%;
  width: 179px;
}
</style>
