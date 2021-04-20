<template>
  <div>
    <div>
      <div v-if="!$store.state.uname">
        <div>
          <router-link to="/login">您好，请登录</router-link>
        </div>
        <div>
          <router-link to="/register"> 免费注册 </router-link>
        </div>
      </div>
      <div v-else>
        <div>
          欢迎您，<span>{{ $store.state.uname }}</span>
        </div>
        <router-link to="" v-if="$store.state.isRoot == 0">
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
    return {};
  },
};
</script>
<style scoped>
.peopleCenter {
  cursor: pointer;
}
.managediv {
  cursor: pointer;
}
</style>
