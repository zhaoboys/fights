<template>
  <div id="main">
    <span> 欢迎来到管理后台，管理员 </span>
    <span>
      {{ $store.state.uname }}
    </span>
    <span @click="quietTo">退出</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    quietTo() {
      this.$confirm("此操作将退出管理系统返回登录页, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push("/login");
      });
    },
  },
};
this;
</script>
<style scoped>
#main {
}
#main span:last-child {
  color: dodgerblue;
  cursor: pointer;
}
</style>
