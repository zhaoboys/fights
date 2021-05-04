<template>
  <div id="main">
    <div><router-link to="/planeSearch"> 返回</router-link></div>
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班查询系统</span>
    </div>
    <div class="mainTitle">个人中心</div>
    <div class="personInfo">
      <p>用户名:{{ infoData.uid }}</p>
      <p>昵称:{{ infoData.uname }}</p>
      <p @click="dialogVisible = true">修改个人信息</p>
    </div>
    <div id="tableDiv">
      <div style="text-align: center"><span>关注航班</span></div>
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="cid" label="航班公司" width="100">
          <template slot-scope="scope">
            <div>
              {{ companyData.find((item) => item.cid === scope.row.cid).cname }}
            </div>
            <div>{{ scope.row.pname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="pname"
          label="航班名称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pmodel"
          label="机型"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pStartCity"
          label="出发地"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pEndCity"
          label="目的地"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pStartArea"
          label="出发机场"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="pEndArea"
          label="到达机场"
          width="180"
        ></el-table-column>
        <el-table-column prop="pStartTime" label="出发时间" width="180">
          <template slot-scope="scope">
            <div>
              {{
                $getHours(scope.row.pStartTime)[0] +
                $getHours(scope.row.pStartTime)[1]
              }}
            </div>
            <div>{{ $getHours(scope.row.pStartTime)[2] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="pEndTime" label="到达时间" width="180">
          <template slot-scope="scope">
            <div>
              {{
                $getHours(scope.row.pEndTime)[0] +
                $getHours(scope.row.pEndTime)[1]
              }}
            </div>
            <div>{{ $getHours(scope.row.pEndTime)[2] }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="small" @click="deleteTo(scope.row)"
              >取消关注</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改个人信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="personForm"
        :model="personForm"
        label-width="80px"
        :rules="personRules"
      >
        <el-form-item label="昵称" prop="uname">
          <el-input v-model="personForm.uname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="userChange('personForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      infoData: {
        uid: "",
        uname: "",
      },
      userCareData: [],
      planeData: [],
      tableLoading: false,
      companyData: [],
      dialogVisible: false,
      personForm: {
        uname: window.sessionStorage.getItem("uname"),
      },
      personRules: {
        uname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  async created() {
    this.tableLoading = true;
    this.infoData.uid = window.sessionStorage.getItem("uid");
    this.infoData.uname = window.sessionStorage.getItem("uname");
    let arr = [];
    arr.push(this.getAllPlane());
    arr.push(this.getUserCare());
    arr.push(this.getCopany());
    await Promise.all(arr);
    let text = [];
    this.userCareData.forEach((item) => {
      let a = this.planeData.find((item1) => item1.pid === item.pid);
      if (a) {
        text.push({ ...a });
      }
    });
    this.tableData = text;
    this.tableLoading = false;
    console.log(this.tableData);
  },
  methods: {
    userChange(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$request({
            type: "post",
            url: "/user/changeUserInfo",
            params: {
              uid: window.sessionStorage.getItem("uid"),
              uname: this.personForm.uname,
            },
          });
          if (res) {
            this.getUserInfo();
            this.dialogVisible = false;
            this.$message.success("修改成功");
          }
        }
      });
    },
    //获取用户信息
    async getUserInfo() {
      let res = await this.$request({
        type: "get",
        url: "/user/getUser",
        params: {
          uid: window.sessionStorage.getItem("uid"),
        },
      });
      if (res) {
        console.log(res.data.uname);
        sessionStorage.setItem("uname", res.data[0].uname);
        this.infoData.uname = window.sessionStorage.getItem("uname");
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async deleteTo(row) {
      this.tableLoading = true;
      let res = await this.$request({
        type: "post",
        url: "/user/deleteCare",
        params: {
          uid: window.sessionStorage.getItem("uid"),
          pid: row.pid,
        },
      });
      if (res) {
        await this.getUserCare();
        let text = [];
        this.userCareData.forEach((item) => {
          let a = this.planeData.find((item1) => item1.pid === item.pid);
          if (a) {
            text.push({ ...a });
          }
        });
        this.tableData = text;
        this.tableLoading = false;
      }
    },
    //获取航班公司
    async getCopany() {
      let res = await this.$request({
        type: "get",
        url: "/home/getCompany",
      });
      if (res) {
        this.companyData = res.data;
      }
    },
    // 获取所有航班
    async getAllPlane() {
      this.tableLoading = true;
      let res = await this.$request({
        type: "get",
        url: "/home/getlist",
      });
      if (res) {
        this.planeData = res.data;
        this.tableLoading = false;
      }
    },
    //获取用户关注航班
    async getUserCare() {
      let res = await this.$request({
        type: "get",
        url: "/user/planeCare",
        params: {
          uid: window.sessionStorage.getItem("uid"),
        },
      });
      if (res) {
        console.log(res, 123456489);
        this.userCareData = res.data;
      }
    },
  },
};
</script>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.titleBox {
  padding: 20px 0 20px 10%;
  font-size: 30px;
  color: #2577e3;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  vertical-align: middle;
  align-self: flex-start;
}
.titleBox img {
  width: 50px;
  vertical-align: middle;
}
.mainTitle {
  font-size: 20px;
  font-weight: bold;
}
.personInfo {
  display: flex;
}
.personInfo p {
  margin: 20px 20px;
}
.personInfo p:nth-child(3) {
  cursor: pointer;
  color: #2577e3;
}
</style>
