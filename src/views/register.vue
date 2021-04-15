<template>
  <div id="main">
    <div>
      <span>欢迎注册航班查询系统</span>
    </div>
    <div class="registerBox">
      <transition name="el-zoom-in-top">
        <el-form
          v-show="registerShow"
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          label-position="right"
          class="registerFrom"
        >
          <el-form-item prop="uid" label="用户名" label-width="80px">
            <el-input v-model="registerForm.uid"></el-input>
          </el-form-item>
          <el-form-item prop="upwd" label="密码" label-width="80px">
            <el-input v-model="registerForm.upwd"></el-input>
          </el-form-item>
          <el-form-item prop="uname" label="昵称" label-width="80px">
            <el-input v-model="registerForm.uname"></el-input>
          </el-form-item>
          <el-form-item
            class="questionDiv"
            prop="uquestion"
            label="密保问题"
            label-width="80px"
          >
            <el-select v-model="registerForm.uquestion">
              <el-option
                v-for="item of queArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="uanswer" label="密保答案" label-width="80px">
            <el-input v-model="registerForm.uanswer"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="$router.push('/')">返回首页</el-button>
            <el-button @click="registerTo('registerForm')">注册</el-button>
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
      registerShow: false,
      registerForm: {
        uid: "",
        upwd: "",
        uname: "",
        uquestion: 1,
        uanswer: "",
        isRoot: 0,
      },
      registerRules: {
        uid: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        uname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
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
    };
  },
  methods: {
    async registerTo(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$request({
            type: "post",
            url: "user/register",
            params: {
              uid: this.registerForm.uid,
              upwd: this.registerForm.upwd,
              uname: this.registerForm.uname,
              uquestion: this.registerForm.uquestion,
              uanswer: this.registerForm.uanswer,
              isRoot: 0,
            },
          });
          if (res.data) {
            if (res.data.msg === 1) {
              this.$message.success("注册成功");
              this.$refs[name].resetFields();
            } else {
              this.$message.error("注册失败，用户名可能重复");
            }
          }
        }
      });
    },
  },
  mounted() {
    this.registerShow = true;
  },
};
</script>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.registerBox {
  width: 50%;
  /* padding: 0 30%; */
  margin-top: 50px;
  text-align: center;
}
.registerFrom {
  /* width: 50%; */
  margin: 0;
  padding: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 18px;
}
::v-deep .questionDiv .el-form-item__content {
  text-align: left;
}
</style>
