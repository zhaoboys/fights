<template>
  <div id="main">
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班查询系统</span>
    </div>
    <div class="mainTitle">个人中心</div>
    <div>
      <p>用户名:{{ infoData.uid }}</p>
      <p>昵称:{{ infoData.uname }}</p>
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
    };
  },
  async created() {
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
    console.log(this.tableData);
  },
  methods: {
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
</style>
