<template>
  <div id="main">
    <!-- 顶部搜索 -->
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchForm"
        label-width="120px"
        class="demo-form-inline"
        size="mini"
      >
        <el-form-item label="航班ID" prop="pid">
          <el-input
            v-model="searchForm.pid"
            placeholder="请输入整数"
          ></el-input>
        </el-form-item>
        <el-form-item label="经济舱票数" prop="usualNumber">
          <el-input
            v-model="searchForm.usualNumber"
            placeholder="请输入整数"
          ></el-input>
        </el-form-item>
        <el-form-item label="经济舱价格" prop="usualPrice">
          <el-input
            v-model="searchForm.usualPrice"
            placeholder="请输入整数"
          ></el-input>
        </el-form-item>
        <el-form-item label="商务舱票数" prop="noUsualNumber">
          <el-input
            v-model="searchForm.noUsualNumber"
            placeholder="请输入整数"
          ></el-input>
        </el-form-item>
        <el-form-item label="商务舱价格" prop="noUsualPrice">
          <el-input
            v-model="searchForm.noUsualPrice"
            placeholder="请输入整数"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTicket">查询</el-button>
          <el-button @click="$refs.searchForm.resetFields()">重置</el-button>
          <el-button type="warning" @click="addDialogVisible = true"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 展示 -->
    <div>
      <el-table
        :data="allPlaneData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
      >
        <el-table-column prop="pid" label="飞机ID" width="180">
        </el-table-column>
        <el-table-column prop="usualNumber" label="经济舱票数" width="180">
        </el-table-column>
        <el-table-column prop="usualPrice" label="经济舱票价" width="180">
        </el-table-column>
        <el-table-column prop="noUsualNumber" label="商务舱票数" width="180">
        </el-table-column>
        <el-table-column prop="noUsualPrice" label="商务票价" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-dropdown split-button type="info" size="small">
              更多操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showChangeTicket(scope.row)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item @click.native="deletePlaneTicket(scope.row)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框div -->
    <div>
      <el-dialog
        title="修改机票信息"
        :visible.sync="changeDialogVisible"
        width="30%"
        :before-close="changeHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="changeForm"
          :rules="changeRules"
          ref="changeForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="航班ID" prop="pid">
            <el-input v-model.number="changeForm.pid" disabled></el-input>
          </el-form-item>
          <el-form-item label="经济舱票数" prop="usualNumber">
            <el-input v-model.number="changeForm.usualNumber"></el-input>
          </el-form-item>
          <el-form-item label="经济舱价格" prop="usualPrice">
            <el-input v-model.number="changeForm.usualPrice"></el-input>
          </el-form-item>
          <el-form-item label="商务舱票数" prop="noUsualNumber">
            <el-input v-model.number="changeForm.noUsualNumber"></el-input>
          </el-form-item>
          <el-form-item label="商务舱价格" prop="noUsualPrice">
            <el-input v-model.number="changeForm.noUsualPrice"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeTicketTo('changeForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="增加机票信息"
        :visible.sync="addDialogVisible"
        width="30%"
        :before-close="addHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addForm"
          :rules="addRules"
          ref="addForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="航班ID" prop="pid">
            <!-- <el-input v-model.number="addForm.pid"></el-input> -->
            <el-select v-model.number="addForm.pid" placeholder="请选择航班ID">
              <el-option
                v-for="item in planeInfoData"
                :key="item.pid"
                :label="item.pid"
                :value="item.pid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经济舱票数" prop="usualNumber">
            <el-input v-model.number="addForm.usualNumber"></el-input>
          </el-form-item>
          <el-form-item label="经济舱价格" prop="usualPrice">
            <el-input v-model.number="addForm.usualPrice"></el-input>
          </el-form-item>
          <el-form-item label="商务舱票数" prop="noUsualNumber">
            <el-input v-model.number="addForm.noUsualNumber"></el-input>
          </el-form-item>
          <el-form-item label="商务舱价格" prop="noUsualPrice">
            <el-input v-model.number="addForm.noUsualPrice"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addTicketTo('addForm')"
              >添加</el-button
            >
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
      allPlaneData: [],
      loading: false,
      changeDialogVisible: false,
      addDialogVisible: false,
      changeForm: {},
      changeRules: {
        pid: [
          { required: true, message: "id不能为空" },
          { type: "number", message: "id必须为数字值" },
        ],
        usualNumber: [
          { required: true, message: "经济舱票数不能为空" },
          { type: "number", message: "经济舱票数必须为数字值" },
        ],
        usualPrice: [
          { required: true, message: "经济舱价格不能为空" },
          { type: "number", message: "经济舱价格必须为数字值" },
        ],
        noUsualNumber: [
          { required: true, message: "商务舱票数不能为空" },
          { type: "number", message: "商务舱票数必须为数字值" },
        ],
        noUsualPrice: [
          { required: true, message: "商务舱价格不能为空" },
          { type: "number", message: "商务舱价格必须为数字值" },
        ],
      },
      searchForm: {
        pid: "",
        usualNumber: "",
        usualPrice: "",
        noUsualNumber: "",
        noUsualPrice: "",
      },
      addForm: {
        pid: "",
        usualNumber: "",
        usualPrice: "",
        noUsualNumber: "",
        noUsualPrice: "",
      },
      addRules: {
        pid: [
          { required: true, message: "id不能为空" },
          { type: "number", message: "id必须为数字值" },
        ],
        usualNumber: [
          { required: true, message: "经济舱票数不能为空" },
          { type: "number", message: "经济舱票数必须为数字值" },
        ],
        usualPrice: [
          { required: true, message: "经济舱价格不能为空" },
          { type: "number", message: "经济舱价格必须为数字值" },
        ],
        noUsualNumber: [
          { required: true, message: "商务舱票数不能为空" },
          { type: "number", message: "商务舱票数必须为数字值" },
        ],
        noUsualPrice: [
          { required: true, message: "商务舱价格不能为空" },
          { type: "number", message: "商务舱价格必须为数字值" },
        ],
      },
      planeInfoData: [],
    };
  },
  async created() {
    let arr = [];
    arr.push(this.getPlaneTicket());
    arr.push(this.getPlaneInfo());
    await Promise.all(this.getPlaneTicket());
  },
  methods: {
    // 添加机票
    async addTicketTo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.allPlaneData.find((item) => item.pid === this.addForm.pid)) {
            return this.$message.error("不可重复添加相同航班机票");
          }
          let res = await this.$request({
            type: "post",
            url: "/ticket/addTicket",
            params: { ...this.addForm },
          });
          if (res) {
            this.$message.success("添加成功");
            this.$refs[formName].resetFields();
            this.getPlaneTicket();
            this.addDialogVisible = false;
          }
        }
      });
    },
    // 搜寻机票信息
    async searchTicket() {
      let url = "";
      if (
        this.searchForm.pid === "" &&
        this.searchForm.usualNumber === "" &&
        this.searchForm.usualPrice === "" &&
        this.searchForm.noUsualNumber === "" &&
        this.searchForm.noUsualPrice === ""
      ) {
        url = "/ticket/getAllNumber";
      } else {
        url = "/ticket/getNumber";
      }
      let res = await this.$request({
        type: "get",
        url,
        params: { ...this.searchForm },
      });
      if (res) {
        this.allPlaneData = res.data;
      }
    },
    // 修改机票信息
    changeTicketTo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$confirm("此操作将永久修改机票信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(async () => {
            let res = await this.$request({
              type: "post",
              url: "/ticket/updataTickets",
              params: {
                ...this.changeForm,
              },
            });
            if (res) {
              console.log(res);
              this.getPlaneTicket();
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.changeDialogVisible = false;
            }
          });
        }
      });
    },
    // 显示修改机票价格弹窗
    showChangeTicket(row) {
      console.log(row);
      this.changeDialogVisible = true;
      this.changeForm = { ...row };
    },
    // 删除机票
    deletePlaneTicket(row) {
      console.log(row);
    },
    // 获取机票
    async getPlaneTicket() {
      this.loading = true;

      let res = await this.$request({
        type: "get",
        url: "/ticket/getAllNumber",
      });
      if (res) {
        this.allPlaneData = res.data;
        console.log(this.allPlaneData);
        this.loading = false;
      }
    },
    // 修改机票价格弹窗关闭
    changeHandleClose() {
      this.changeDialogVisible = false;
    },
    addHandleClose() {
      this.addDialogVisible = false;
      this.$refs["addForm"].resetFields();
    },
    //获取航班信息
    async getPlaneInfo() {
      let res = await this.$request({
        type: "get",
        url: "/home/getlist",
      });
      if (res) {
        this.planeInfoData = res.data;
        console.log(this.planeInfoData);
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
</style>
