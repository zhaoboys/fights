<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    航班查询系统
    <el-button @click="register">注册</el-button>
    <el-button @click="resetPwd">忘记密码</el-button>
    <el-button @click="changePlane">修改航班信息</el-button>
    <router-link to="/login"><el-button>登录</el-button></router-link>
    <router-link to="/register"><el-button>注册</el-button></router-link>
    <router-link to="/planeSearch"><el-button>查询</el-button></router-link>
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  // components: {
  //   HelloWorld,
  // },
  data() {
    return {
      a: "",
    };
  },
  methods: {
    async changePlane() {
      // this.axios.post('user/planeChange').then(res=>{
      //   console.log(res);
      // })
      let res = await this.$request({
        type: "post",
        url: "user/planeChange",
        params: { pmodel: "gssggs", pid: 1, cid: "SC" },
      });
      console.log(res);
    },
    resetPwd() {
      // this.axios.post("user/newPwd").then((res) => {
      //   console.log(res);
      // });
    },
    async register() {
      // this.axios.post('user/register').then(res=>{
      // console.log(res);
      // })
      let res = await this.$request({
        type: "post",
        url: "user/register",
        params: {
          uid: "user2",
          upwd: "user2",
          uname: "user2",
          uquestion: 1,
          uanswer: "user2",
          isRoot: 0,
        },
      });
      console.log(res, "res");
    },
    async getlist() {
      console.log(this.$api);
      this.axios.get("/home/getlist").then((res) => {
        console.log(res, "所有航班");
        this.a = res;
      });
      this.axios.post("/home/postlist", { pid: 1 }).then((res) => {
        console.log(res);
      });
      this.axios.get("/home/planeSearch").then((res) => {
        console.log(res, "航班查询");
      });
      this.axios.get("/home/getCompany").then((res) => {
        console.log(res, "公司");
      });
      this.axios.get("/home/pcSearch").then((res) => {
        console.log(res, "公司1");
      });
      this.axios.get("/home/pcpSearch").then((res) => {
        console.log(res, "公司2");
      });
      this.axios.get("/home/companySearch").then((res) => {
        console.log(res, "公司3");
      });

      let time = this.$getHours(new Date().getTime());
      console.log(time);

      let res = await this.$request({
        type: "get",
        url: "/home/companySearch",
        params: { cid: "DF" },
      });
      console.log(res, "res");
      let arr = this.$oneDayTime(1616986166000);
      let aaa = await this.$request({
        type: "get",
        url: "/home/airSearch",
        params: { pStartCity: "南京", pStartTime: arr[0], pEndTime: arr[1] },
      });
      console.log(aaa, "aaa");
    },
  },
  created() {
    // this.getlist();
  },
};
</script>
<style scoped>
.home {
}
</style>
