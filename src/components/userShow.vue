<template>
  <div id="main">
    <div class="showBox">
      <div v-if="!userName">
        <div>
          <router-link to="/login">您好，请登录</router-link>
        </div>
        <div>
          <router-link to="/register"> 免费注册 </router-link>
        </div>
      </div>
      <div class="titleDiv" v-else>
        <div>
          欢迎您,<span>{{ userName }}</span>
        </div>
        <router-link to="/personCenter">
          <div class="peopleCenter">个人中心</div>
        </router-link>
      </div>
      <div class="managediv" v-if="$store.state.isRoot == 1">
        <router-link to="/manageBack">
          <span> 管理后台 </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  created() {
    this.userName = sessionStorage.getItem("uname");
  },
};
</script>
<style scoped>
.peopleCenter {
  cursor: pointer;
  color: #2577e3;
}
.managediv {
  cursor: pointer;
}
.managediv span {
  color: #2577e3;
}
#main {
  position: absolute;
  top: 1%;
  right: 5%;
}

.showBox {
  display: flex;
  justify-content: right;
}

.titleDiv {
  display: flex;
  justify-content: right;
}

.titleDiv div {
  margin-right: 10px;
}
</style>
