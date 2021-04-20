<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    // if (!this.$store.state.uid) {
    //   this.$message.error("请登录");
    //   this.$router.push("/login");
    // }
  },
  mounted() {
    this.getHeight();
  },
  methods: {
    getHeight() {
      document.getElementById("app").style.height =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) + "px";
      console.log(document.getElementById("app").style.height);
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  text-align: center;
  color: #2c3e50;
  /* background: #aaa; */
}
html {
  /* -ms-overflow-style: none; */
  overflow: auto;
}
</style>
