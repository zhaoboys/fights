<template>
  <div>
    <div>
      <ManageCityHeader
        :cityArr="cityArr"
        @headerSearch="headerSearch"
        @addPlane="addPlane"
      ></ManageCityHeader>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      v-loading="loading"
      height="500"
      stripe
    >
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="城市" prop="city"></el-table-column>
      <el-table-column label="机场" prop="cityArea"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown split-button type="info" size="small">
            更多操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showChangeCity(scope.row)"
                >修改</el-dropdown-item
              >
              <el-dropdown-item @click.native="deletePlane(scope.row)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改城市"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item prop="id" label="序号">
          <el-input v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item prop="city" label="城市">
          <el-select v-model="ruleForm.city" filterable>
            <el-option
              v-for="(item, index) in cityArr"
              :key="index"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cityArea" label="机场">
          <el-input v-model="ruleForm.cityArea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="changeTo('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import ManageCityHeader from "./manageCityHeader";
export default {
  components: {
    ManageCityHeader,
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        city: "",
        cityArea: "",
      },
      rules: {
        city: [{ required: true, message: "请输入城市名称", trigger: "blur" }],
        cityArea: [
          { required: true, message: "请输入机场名称", trigger: "blur" },
        ],
      },
      cityArr: null,
      loading: false,
    };
  },
  async created() {
    let arr = [];
    this.loading = true;
    arr.push(this.getAllArea());
    arr.push(this.getAllCity());
    await Promise.all(arr);
    this.loading = false;
  },
  methods: {
    //获取所有城市
    async getAllCity() {
      let res = await this.$request({
        type: "get",
        url: "/home/getCity",
      });
      if (res) {
        this.cityArr = res.data;
      }
    },
    // 获取城市机场
    async getAllArea() {
      let res = await this.$request({
        type: "get",
        url: "/home/geAllPlaneArea",
      });
      if (res) {
        console.log(res);
        this.loading = false;
        this.tableData = res.data;
      }
    },
    async headerSearch(data) {
      this.loading = true;
      this.tableData = await data;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    addPlane() {
      this.loading = true;
      this.getAllArea();
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    async changeTo(name) {
      this.$refs[name].validate(async (valid) => {
        this.$confirm("此操作将修改该航班信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          if (valid) {
            this.loading = true;
            let res = await this.$request({
              type: "post",
              url: "/user/changeCityPlane",
              params: { ...this.ruleForm },
            });
            if (res.data) {
              this.$message.success("修改成功");
              this.$refs.ruleForm.resetFields();
              this.dialogVisible = false;
              this.getAllArea();
              this.loading = true;
            }
          }
        });
      });
    },
    showChangeCity(row) {
      this.dialogVisible = true;
      this.ruleForm = { ...row };
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    deletePlane(row) {
      this.$confirm("此操作将永久删除该航班, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.loading = true;
        let res = await this.$request({
          type: "post",
          url: "/user/deleteCityPlane",
          params: { ...row },
        });
        if (res) {
          this.getAllArea();
          this.loading = false;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
  },
};
</script>
<style scoped></style>
