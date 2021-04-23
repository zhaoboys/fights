<template>
  <div id="main">
    <div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
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
          <el-button @click="getUserInfo(searchForm)">查询</el-button>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="changRoot(scope.row)"
              >{{ scope.row.isRoot == 0 ? "设为管理员 " : "设为普通用户 " }}
            </el-button>
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
      userTableData: [],
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
    };
  },
  created() {
    this.getUserInfo({});
  },
  methods: {
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
          await this.getUserInfo();
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
  },
};
</script>
<style scoped></style>
