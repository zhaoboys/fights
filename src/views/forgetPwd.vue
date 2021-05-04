<template>
  <div id="main">
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎注册航班查询系统</span>
    </div>
    <transition name="el-zoom-in-top">
      <el-form
        :model="pwdForm"
        :rules="pwdRules"
        ref="pwdForm"
        label-width="100px"
        v-show="transitionShow"
      >
        <el-form-item prop="uid" label="用户名:">
          <el-input v-model="pwdForm.uid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="upwd" label="新密码:">
          <el-input
            v-model="pwdForm.upwd"
            placeholder="请输入新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="newUpwd" label="重复密码:">
          <el-input
            v-model="pwdForm.newUpwd"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="uquestion" label="密保问题:" class="questionDiv">
          <el-select v-model="pwdForm.uquestion">
            <el-option
              v-for="item of queArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="uanswer" label="密保答案:">
          <el-input
            v-model="pwdForm.uanswer"
            placeholder="请输入密保答案"
          ></el-input>
        </el-form-item>
        <el-form-item class="btnDiv">
          <router-link to="/login"><el-button>返回</el-button> </router-link>
          <el-button @click="pwdChange('pwdForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pwdForm: {
        uid: "",
        upwd: "",
        newUpwd: "",
        uquestion: 1,
        uanswer: "",
      },
      pwdRules: {
        uid: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newUpwd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
        uanswer: [
          { required: true, message: "请输入密保答案", trigger: "blur" },
        ],
      },
      queArr: [
        {
          value: 1,
          label: "父亲的名字？",
        },
        {
          value: 2,
          label: "母亲的名字？",
        },
        {
          value: 3,
          label: "小学学校的名字？",
        },
        {
          value: 4,
          label: "最好朋友的名字",
        },
      ],
      transitionShow: false,
    };
  },
  mounted() {
    this.transitionShow = true;
  },
  methods: {
    pwdChange(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          if (this.pwdForm.upwd !== this.pwdForm.newUpwd) {
            return this.$message({
              showClose: true,
              message: "两次密码不一样",
              type: "error",
            });
          }

          let res = await this.$request({
            type: "post",
            url: "user/newPwd",
            params: {
              uid: this.pwdForm.uid,
              upwd: this.pwdForm.upwd,
              uquestion: this.pwdForm.uquestion,
              uanswer: this.pwdForm.uanswer,
            },
          });
          if (res.data) {
            console.log(res.data);
            if (res.data.affectedRows > 0) {
              this.$message.success("修改成功");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            } else {
              this.$message.error("修改失败");
            }
          }
        }
      });
    },
  },
};
</script>
<style scoped>
#main {
  text-align: center;
}
#main ::v-deep .el-form {
  width: 400px;
  margin: auto;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
  padding: 20px;
}
.questionDiv ::v-deep .el-form-item__content {
  text-align: left;
}
.btnDiv ::v-deep .el-form-item__content {
  margin: 0 !important;
}
.btnDiv .el-button {
  margin-right: 10px;
}
.titleBox {
  /* padding: 20px 0 20px 10%; */
  font-size: 30px;
  color: #2577e3;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  vertical-align: middle;
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
  background-color: #2e2363;
  margin-bottom: 40px;
  /* align-self: flex-start; */
}
.titleBox img {
  width: 50px;
  vertical-align: middle;
}
</style>
