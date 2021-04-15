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
            <el-input v-model="loginForm.uid"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="upwd" label-width="80px">
            <el-input v-model="loginForm.upwd"></el-input>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button @click="$router.push('/')">返回首页</el-button>
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
    loginTo(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$request({
            type: "get",
            url: "user/login",
            params: { uid: this.loginForm.uid, upwd: this.loginForm.upwd },
          });
          if (res) {
            console.log(res);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.loginBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loginForm {
  border: 1px solid #000;
  border-radius: 4px;
  padding: 20px;
}
::v-deep .btnBox {
  margin-bottom: 0;
}
</style>
