<template>
  <div id="main">
    <div>
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
      >
        <el-form-item label="用户名">
          <el-input v-model="searchForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="密保问题">
          <el-select v-model="searchForm.uquestion" clearable>
            <el-option
              v-for="item in 4"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为管理员">
          <el-select v-model="searchForm.isRoot" clearable>
            <el-option
              v-for="item in rootData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getUserInfo(searchForm)" type="primary"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="userTableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
      >
        <el-table-column prop="uid" label="用户名"></el-table-column>
        <!-- <el-table-column prop="upwd" label="用户密码"></el-table-column> -->
        <el-table-column prop="uname" label="昵称"></el-table-column>
        <el-table-column prop="uquestion" label="密保问题"></el-table-column>
        <!-- <el-table-column prop="uanswer" label="密保答案"></el-table-column> -->
        <el-table-column prop="isRoot" label="是否为管理员">
          <template slot-scope="scope">
            {{ scope.row.isRoot == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="关注航班">
          <template slot-scope="scope">
            <el-button @click="showCare(scope.row)" type="info" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="用户订票">
          <template slot-scope="scope">
            <el-button @click="showTicket(scope.row)" type="info" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="changRoot(scope.row)" size="small"
              >{{ scope.row.isRoot == 0 ? "设为管理员 " : "设为普通用户 " }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="用户关注航班"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-table
        :data="careTableData"
        style="width: 100%"
        v-loading="careLoading"
      >
        <el-table-column prop="uid" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="pid" label="航班ID" width="180">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="用户已购机票"
      :visible.sync="ticketDialogVisible"
      width="40%"
      :before-close="ticketHandleClose"
    >
      <el-table
        :data="userTicketData"
        style="width: 100%"
        height="400"
        v-loading="ticketLoading"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="uid" label="用户ID" width="100">
        </el-table-column>
        <el-table-column prop="pid" label="航班ID" width="100">
        </el-table-column>
        <el-table-column prop="pname" label="航班名称" width="100">
        </el-table-column>
        <el-table-column prop="bname" label="订票人" width="100">
        </el-table-column>
        <el-table-column prop="bphone" label="订票人手机号" width="180">
        </el-table-column>
        <el-table-column prop="bIndextity" label="订票人身份证" width="180">
        </el-table-column>
        <el-table-column label="舱位" width="100">
          <template slot-scope="scope">
            {{ scope.row.isUaual == 1 ? "经济舱" : "商务舱" }}
          </template>
        </el-table-column>
        <el-table-column prop="ticket" label="票价" width="100">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userTableData: [],
      careTableData: [],
      careLoading: false,
      loading: false,
      searchForm: {
        uid: "",
        uanme: "",
        uquestion: "",
        isRoot: "",
      },
      rootData: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      dialogVisible: false,
      ticketDialogVisible: false,
      userTicketData: [],
      ticketLoading: false,
    };
  },
  created() {
    this.getUserInfo({});
  },
  methods: {
    // 显示用户订票
    async showTicket(row) {
      this.ticketDialogVisible = true;
      let res = await this.$request({
        type: "get",
        url: "/ticket/getUserTickets",
        params: {
          uid: row.uid,
        },
      });
      if (res) {
        this.userTicketData = res.data;
        console.log(this.userTicketData);
        this.ticketLoading = false;
      }
    },
    async showCare(row) {
      this.dialogVisible = true;
      this.careLoading = true;
      let res = await this.$request({
        type: "get",
        url: "user/planeCare",
        params: {
          uid: row.uid,
        },
      });
      if (res) {
        this.careTableData = res.data;
        console.log(res);
      }
      setTimeout(() => {
        this.careLoading = false;
      }, 500);
      console.log(row);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 修改权限
    async changRoot(row) {
      this.$confirm("此操作将修改用户权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.loading = true;
        let res = await this.$request({
          type: "post",
          url: "user/changeUserInfo",
          params: {
            uid: row.uid,
            isRoot: row.isRoot == 0 ? 1 : 0,
          },
        });
        if (res) {
          console.log(res);
          await this.getUserInfo({});
          this.loading = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        }
      });
    },
    // 获取用户信息
    async getUserInfo(obj) {
      this.loading = true;
      let a = obj;
      if (
        !obj.uid &&
        !obj.uname &&
        !obj.uquestion &&
        !(obj.isRoot == 1 || obj.isRoot == 0)
      ) {
        a = {};
      }
      let res = await this.$request({
        type: "get",
        url: "/user/getUser",
        params: { ...a },
      });
      if (res) {
        console.log(res, 123);
        this.userTableData = res.data;
        this.loading = false;
      }
    },
    ticketHandleClose() {
      this.ticketDialogVisible = false;
    },
  },
};
</script>
<style scoped></style>
