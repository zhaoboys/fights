<template>
  <div id="login">
    <div><span> 欢迎登录航班查询系统 </span></div>
    <div class="loginBox">
      <transition name="el-zoom-in-center">
        <el-form
          v-show="loginShow"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="loginForm"
        >
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
              placeholder="请输入密码"
              @keyup.enter.native="loginTo('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item class="registerTo">
            没有帐号? 前去<span @click="registerTo">注册</span>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button @click="$router.push('/forgePwd')">忘记密码</el-button>
            <el-button @click="loginTo('loginForm')">登录</el-button>
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
  height: 100%;
  /* width: 100%; */
  padding: 20px;
  overflow: hidden;
  background-image: url("../assets/planeIcon/login2.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 0;
  position: relative;
}
.loginBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginForm {
  border: 1px solid #000;
  border-radius: 4px;
  padding: 20px;
}
::v-deep .btnBox {
  margin-bottom: 0;
}
.registerTo span {
  color: blue;
  cursor: pointer;
}
</style>
