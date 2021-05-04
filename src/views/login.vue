<template>
  <div id="login">
    <div class="loginTitle">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span> 欢迎登录航班查询系统 </span>
    </div>
    <div class="imgBox">
      <img src="./../assets/planeIcon/login3.jpeg" alt="" />
    </div>
    <div class="loginBox">
      <transition name="el-zoom-in-center">
        <el-form
          v-show="loginShow"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="loginForm"
        >
          <el-form-item class="formTitle"><span>帐号登录</span></el-form-item>
          <el-form-item label="用户名:" prop="uid" label-width="80px">
            <el-input
              v-model="loginForm.uid"
              placeholder="请输入用户名"
              @keyup.enter.native="loginTo('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="upwd" label-width="80px">
            <el-input
              v-model="loginForm.upwd"
              placeholder="请输入登录密码"
              @keyup.enter.native="loginTo('loginForm')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="registerTo">
            <span>没有帐号? 前去</span> <span @click="registerTo">注册</span> ||
            <span @click="$router.push('/forgePwd')">忘记密码?</span>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button @click="loginTo('loginForm')">登录</el-button>
          </el-form-item>
          <el-form-item class="noLoginBox">
            <span @click="noLoginTo">游客身份进入</span>
          </el-form-item>
        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginShow: false,
      loginForm: {
        uid: "",
        upwd: "",
      },
      loginRules: {
        uid: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.loginShow = true;
  },
  methods: {
    noLoginTo() {
      this.$confirm("您是否以游客身份进入航班查询系统？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$notify({
          title: "游客登录提示",
          message: "三秒后您将自动进入航班查询系统",
          position: "bottom-right",
        });
        setTimeout(() => {
          this.$router.push("/planeSearch");
        }, 3000);
      });
    },
    registerTo() {
      this.$router.push("/register");
    },
    loginTo(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$request({
            type: "get",
            url: "user/login",
            params: { uid: this.loginForm.uid, upwd: this.loginForm.upwd },
          });
          if (res.data.length > 0) {
            this.$store.commit("setUserInfo", res.data[0]);
            sessionStorage.setItem("uid", res.data[0].uid);
            sessionStorage.setItem("uname", res.data[0].uname);
            this.$router.push("/planeSearch");
          } else {
            this.$message.error("用户名或密码不正确");
            this.$refs[name].resetFields();
          }
        }
      });
    },
  },
};
</script>
<style scoped>
#login {
}

.loginTitle {
  padding: 20px 0 20px 10%;
  font-size: 30px;
  color: #2577e3;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  vertical-align: middle;
}

.loginTitle img {
  width: 50px;
  vertical-align: middle;
}
.imgBox {
  margin-top: 50px;
}
.imgBox img {
  max-width: 100%;
}

.loginBox {
  min-width: 400px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
  background: #fff;
}
.loginForm {
  /* border: 1px solid #000; */
  border-radius: 4px;
  padding: 20px;
  text-align: center;
}
::v-deep .btnBox {
  margin-bottom: 0;
}

.btnBox .el-button {
  background-color: #ff9a14;
  color: #fff;
  width: 250px;
}

.btnBox .el-button:hover {
  background: #835212;
}
.registerTo {
  vertical-align: middle;
}
.registerTo span {
  vertical-align: middle;
}
.registerTo span:nth-child(2) {
  color: blue;
  cursor: pointer;
  vertical-align: middle;
}
.registerTo span:nth-child(3) {
  vertical-align: middle;
  cursor: pointer;
  color: #beb8b8;
}

.formTitle span {
  font-size: 18px;
  color: #111;
}
.noLoginBox span {
  font-size: 5px;
  cursor: pointer;
  color: #a79c9c;
}
</style>
