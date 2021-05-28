<template>
  <div id="main">
    <!-- 顶部搜索 -->
    <div>
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
        ref="searchForm"
      >
        <el-form-item label="id" prop="id">
          <el-input v-model="searchForm.id"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="searchForm.city">
            <el-option
              v-for="item in cityData"
              :key="item.city"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店名称" prop="pub">
          <el-input v-model="searchForm.pub"></el-input>
        </el-form-item>
        <el-form-item label="酒店网址" prop="http">
          <el-input v-model="searchForm.http"> </el-input>
        </el-form-item>
        <el-form-item label="评分" prop="ratings">
          <el-input v-model="searchForm.ratings"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchPub" type="primary">查询</el-button>
          <el-button @click="resetTo">重置</el-button>
          <el-button @click="addDialogVisible = true" type="warning"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 展示 -->
    <div>
      <el-table
        :data="pubData"
        stripe
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="city" label="城市" width="180">
        </el-table-column>
        <el-table-column prop="pub" label="酒店名称" width="180">
        </el-table-column>
        <el-table-column prop="http" label="网址" width="200">
        </el-table-column>
        <el-table-column
          prop="ratings"
          label="评分"
          width="180"
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-dropdown split-button type="info" size="small">
              操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showPubChange(scope.row)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item @click.native="deleteTo(scope.row)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 修改酒店弹窗 -->
      <el-dialog
        title="修改酒店"
        :visible.sync="changeDialogVisible"
        width="30%"
        :before-close="changeHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="changeForm"
          :rules="changerules"
          ref="changeForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="ID" prop="id">
            <el-input v-model="changeForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="changeForm.city" placeholder="请选择城市">
              <el-option
                v-for="item in cityData"
                :key="item.city"
                :label="item.city"
                :value="item.city"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="酒店名称" prop="pub">
            <el-input v-model="changeForm.pub"></el-input>
          </el-form-item>
          <el-form-item label="网址" prop="http">
            <el-input v-model="changeForm.http"></el-input>
          </el-form-item>
          <el-form-item label="评分" prop="ratings">
            <el-input v-model="changeForm.ratings"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeTo('changeForm')">修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 增加酒店弹窗 -->
      <el-dialog
        title="增加酒店"
        :visible.sync="addDialogVisible"
        width="30%"
        :before-close="addHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addForm"
          :rules="addrules"
          ref="addForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="ID" prop="id">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="addForm.city" placeholder="请选择城市">
              <el-option
                v-for="item in cityData"
                :key="item.city"
                :label="item.city"
                :value="item.city"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="酒店名称" prop="pub">
            <el-input v-model="addForm.pub"></el-input>
          </el-form-item>
          <el-form-item label="网址" prop="http">
            <el-input v-model="addForm.http"></el-input>
          </el-form-item>
          <el-form-item label="评分" prop="ratings">
            <el-input v-model="addForm.ratings"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="addTo('addForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pubData: [],
      changeDialogVisible: false,
      changeForm: {},
      changerules: {
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        pub: [{ required: true, message: "请输入酒店名称", trigger: "blur" }],
        http: [{ required: true, message: "请输入酒店网址", trigger: "blur" }],
        ratings: [{ required: true, message: "请输入评分", trigger: "blur" }],
      },
      addForm: {
        id: "",
        city: "",
        pub: "",
        http: "",
        ratings: "",
      },
      addrules: {
        id: [{ required: true, message: "请输入ID", trigger: "blur" }],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        pub: [{ required: true, message: "请输入酒店名称", trigger: "blur" }],
        http: [{ required: true, message: "请输入酒店网址", trigger: "blur" }],
        ratings: [{ required: true, message: "请输入评分", trigger: "blur" }],
      },
      cityData: [],
      loading: false,
      searchForm: {
        id: "",
        city: "",
        pub: "",
        http: "",
        ratings: "",
      },
      addDialogVisible: false,
    };
  },
  async created() {
    this.loading = true;
    let arr = [];
    arr.push(this.getPub({}));
    arr.push(this.getCity());
    await Promise.all(arr);
    this.loading = false;
  },
  methods: {
    // 搜寻特定酒店
    async searchPub() {
      let params = null;
      if (
        this.searchForm.id == "" &&
        this.searchForm.city == "" &&
        this.searchForm.pub == "" &&
        this.searchForm.http == "" &&
        this.searchForm.ratings == ""
      ) {
        params = {};
      } else {
        params = { ...this.searchForm };
      }
      let res = await this.$request({
        type: "get",
        url: "/ticket/getPub",
        params,
      });
      if (res) {
        this.pubData = res.data;
      }
    },
    // 获取酒店
    async getPub(obj) {
      let res = await this.$request({
        type: "get",
        url: "/ticket/getPub",
        params: { ...obj },
      });
      if (res) {
        console.log(res);
        this.pubData = res.data;
      }
    },
    // 显示酒店修改弹窗
    showPubChange(row) {
      this.changeDialogVisible = true;
      this.changeForm = { ...row };
    },
    // 修改酒店
    changeTo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$confirm("此操作将修改该酒店信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(async () => {
            let res = await this.$request({
              type: "post",
              url: "/ticket/updataPub",
              params: { ...this.changeForm },
            });
            if (res) {
              this.$message.success("修改成功");
              this.getPub();
              this.changeDialogVisible = false;
              this.$refs[formName].resetFields();
            }
          });
        }
      });
    },
    addTo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$confirm("此操作将添加该酒店信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(async () => {
            let res = await this.$request({
              type: "post",
              url: "/ticket/addPub",
              params: { ...this.addForm },
            });
            if (res) {
              this.$message.success("添加成功");
              this.getPub();
              this.addDialogVisible = false;
              this.$refs[formName].resetFields();
            }
          });
        }
      });
    },
    // 删除酒店
    async deleteTo(row) {
      this.$confirm("此操作将永久删除该酒店信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$request({
          type: "post",
          url: "/ticket/deletePub",
          params: {
            id: row.id,
          },
        });
        if (res) {
          this.getPub();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    // 获取城市
    async getCity() {
      let res = await this.$request({
        type: "get",
        url: "/home/getCity",
      });
      if (res) {
        this.cityData = res.data;
      }
    },
    changeHandleClose() {
      this.changeDialogVisible = false;
    },
    addHandleClose() {
      this.addDialogVisible = false;
      this.$refs["addForm"].resetFields();
    },
    resetTo() {
      this.$refs["searchForm"].resetFields();
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
</style>
