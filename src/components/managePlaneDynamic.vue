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
        <el-form-item label="航班ID" prop="pid">
          <el-input v-model="searchForm.pid"></el-input>
        </el-form-item>
        <el-form-item label="值机柜台" prop="checkInCounter">
          <el-input v-model="searchForm.checkInCounter"> </el-input>
        </el-form-item>
        <el-form-item label="预计出发时间" prop="expectedFly">
          <el-date-picker
            v-model="searchForm.expectedFly"
            type="datetime"
            placeholder="选择出发日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计到达时间" prop="expectedLand">
          <el-date-picker
            v-model="searchForm.expectedLand"
            type="datetime"
            placeholder="选择出发日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="登机口" prop="signIn">
          <el-input v-model="searchForm.signIn"> </el-input>
        </el-form-item>
        <el-form-item label="出口" prop="signOut">
          <el-input v-model="searchForm.signOut"> </el-input>
        </el-form-item>
        <el-form-item label="行李转盘" prop="luggage">
          <el-input v-model="searchForm.luggage"> </el-input>
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
    <!-- 展示内容 -->
    <div>
      <el-table
        :data="planeStateData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        stripe
        v-loading="tableLoading"
      >
        <el-table-column prop="pid" label="航班id" width="80">
        </el-table-column>
        <el-table-column prop="checkInCounter" label="值机柜台" width="80">
          <template slot-scope="scope">
            {{ scope.row.checkInCounter ? scope.row.checkInCounter : "--" }}
          </template>
        </el-table-column>
        <el-table-column prop="expectedFly" label="预计起飞时间" width="200">
          <template slot-scope="scope">
            {{
              new Date(parseInt(scope.row.expectedFly)).getFullYear() +
              "年" +
              $getHours(parseInt(scope.row.expectedFly))[0] +
              $getHours(parseInt(scope.row.expectedFly))[1]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="expectedLand" label="预计降落时间" width="200">
          <template slot-scope="scope">
            {{
              new Date(parseInt(scope.row.expectedLand)).getFullYear() +
              "年" +
              $getHours(parseInt(scope.row.expectedLand))[0] +
              $getHours(parseInt(scope.row.expectedLand))[1]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="signIn" label="登机口" width="80">
        </el-table-column>
        <el-table-column prop="signOut" label="出口" width="80">
        </el-table-column>
        <el-table-column prop="luggage" label="行李转盘" width="80">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-dropdown split-button type="info" size="small">
              操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showPlaneChange(scope.row)"
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
    <!-- 弹窗Div -->
    <div>
      <!-- 修改弹框 -->
      <el-dialog
        title="修改动态航班"
        :visible.sync="changeDialogVisible"
        width="30%"
        :before-close="changeHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          ref="changePlaneInfo"
          :model="changePlaneInfo"
          :rules="changePlaneInfoForm"
          label-width="110px"
          class="formLeft"
          size="mini"
        >
          <el-form-item label="航班id:" prop="pid">
            <el-input v-model="changePlaneInfo.pid" disabled></el-input>
          </el-form-item>
          <el-form-item label="值机柜台:" prop="checkInCounter">
            <el-input
              v-model="changePlaneInfo.checkInCounter"
              placeholder="请输入值机柜台"
            ></el-input>
          </el-form-item>
          <el-form-item label="预计出发时间:" prop="expectedFly">
            <el-date-picker
              v-model="changePlaneInfo.expectedFly"
              type="datetime"
              placeholder="选择出发日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预计出发时间:" prop="expectedLand">
            <el-date-picker
              v-model="changePlaneInfo.expectedLand"
              type="datetime"
              placeholder="选择到达日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登机口:" prop="signIn">
            <el-input
              v-model="changePlaneInfo.signIn"
              placeholder="请输入登机口"
            ></el-input>
          </el-form-item>
          <el-form-item label="出口:" prop="signOut">
            <el-input
              v-model="changePlaneInfo.signOut"
              placeholder="请输入出口"
            ></el-input>
          </el-form-item>
          <el-form-item label="行李转盘:" prop="luggage">
            <el-input
              v-model="changePlaneInfo.luggage"
              placeholder="请输入行李转盘编号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeDialogVisible = false">取消</el-button>
            <el-button @click="changeTo('changePlaneInfo')">修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 增加弹框 -->
      <el-dialog
        title="新增动态航班"
        :visible.sync="addDialogVisible"
        width="30%"
        :before-close="addHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          ref="addPlaneInfo"
          :model="addPlaneInfo"
          :rules="addPlaneInfoForm"
          label-width="110px"
          class="formLeft"
          size="mini"
        >
          <el-form-item label="航班id:" prop="pid">
            <el-select v-model="addPlaneInfo.pid">
              <el-option
                v-for="item in allPlaneInfo"
                :key="item.pid"
                :label="item.pid"
                :value="item.pid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值机柜台:" prop="checkInCounter">
            <el-input
              v-model="addPlaneInfo.checkInCounter"
              placeholder="请输入值机柜台"
            ></el-input>
          </el-form-item>
          <el-form-item label="预计出发时间:" prop="expectedFly">
            <el-date-picker
              v-model="addPlaneInfo.expectedFly"
              type="datetime"
              placeholder="选择出发日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预计出发时间:" prop="expectedLand">
            <el-date-picker
              v-model="addPlaneInfo.expectedLand"
              type="datetime"
              placeholder="选择到达日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登机口:" prop="signIn">
            <el-input
              v-model="addPlaneInfo.signIn"
              placeholder="请输入登机口"
            ></el-input>
          </el-form-item>
          <el-form-item label="出口:" prop="signOut">
            <el-input
              v-model="addPlaneInfo.signOut"
              placeholder="请输入出口"
            ></el-input>
          </el-form-item>
          <el-form-item label="行李转盘:" prop="luggage">
            <el-input
              v-model="addPlaneInfo.luggage"
              placeholder="请输入行李转盘编号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button @click="addTo('addPlaneInfo')">添加</el-button>
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
      tableLoading: false,
      planeStateData: [],
      changeDialogVisible: false,
      changePlaneInfo: [],
      changePlaneInfoForm: {
        expectedFly: [
          { required: true, message: "请输入预计出发时间", trigger: "blur" },
        ],
        expectedLand: [
          { required: true, message: "请输入预计达到时间", trigger: "blur" },
        ],
      },
      addPlaneInfo: {
        pid: "",
        checkInCounter: "",
        expectedFly: "",
        expectedLand: "",
        signIn: "",
        signOut: "",
        luggage: "",
      },
      addPlaneInfoForm: {
        pid: [
          { required: true, message: "请输入预计出发时间", trigger: "blur" },
        ],
        expectedFly: [
          { required: true, message: "请输入预计出发时间", trigger: "blur" },
        ],
        expectedLand: [
          { required: true, message: "请输入预计达到时间", trigger: "blur" },
        ],
      },
      searchForm: {
        pid: "",
        checkInCounter: "",
        expectedFly: "",
        expectedLand: "",
        signIn: "",
        signOut: "",
        luggage: "",
      },
      addDialogVisible: false,
      allPlaneInfo: {},
    };
  },
  async created() {
    this.tableLoading = true;
    let arr = [];
    arr.push(this.getState({}));
    arr.push(this.getPlaneInfo());
    await Promise.all(arr);
    this.tableLoading = false;
  },
  methods: {
    async addTo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (
            this.planeStateData.find(
              (item) => item.pid === this.addPlaneInfo.pid
            )
          ) {
            return this.$message.error("请勿重复添加相同航班");
          }
          let a = this.addPlaneInfo;
          a.expectedFly = new Date(this.addPlaneInfo.expectedFly).getTime();
          a.expectedLand = new Date(this.addPlaneInfo.expectedLand).getTime();
          let res = await this.$request({
            type: "post",
            url: "/home/addState",
            params: { ...this.addPlaneInfo },
          });
          if (res) {
            this.$message.success("添加成功");
            this.$refs[formName].resetFields();
            this.getState({});
            this.addDialogVisible = false;
          }
        }
      });
    },
    async searchPub() {
      let params;
      if (
        !this.searchForm.pid &&
        !this.searchForm.checkInCounter &&
        !this.searchForm.expectedFly &&
        !this.searchForm.expectedLand &&
        !this.searchForm.signIn &&
        !this.searchForm.signOut &&
        !this.searchForm.luggage
      ) {
        params = {};
      } else {
        params = { ...this.searchForm };
      }
      let res = await this.$request({
        type: "get",
        url: "/home/searchState",
        params,
      });
      if (res) {
        this.planeStateData = res.data;
      }
    },
    resetTo() {
      this.$refs["searchForm"].resetFields();
    },
    changeTo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将修改该航班动态, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(async () => {
            let res = await this.$request({
              type: "post",
              url: "/home/changeState",
              params: { ...this.changePlaneInfo },
            });
            if (res) {
              this.getState({});
              this.changeDialogVisible = false;
              this.$refs[formName].resetFields();
              this.$message.error("修改成功");
            }
          });
        }
      });
    },
    showPlaneChange(row) {
      this.changeDialogVisible = true;
      row.expectedFly = parseInt(row.expectedFly);
      row.expectedLand = parseInt(row.expectedLand);
      this.changePlaneInfo = { ...row };
    },
    changeHandleClose() {
      this.changeDialogVisible = false;
      this.$refs["changePlaneInfo"].resetFields();
    },
    addHandleClose() {
      this.addDialogVisible = false;
      this.$refs["addPlaneInfo"].resetFields();
    },
    // 搜寻航班动态
    async getState(obj) {
      let params;
      if (
        !obj.pid &&
        !obj.checkInCounter &&
        !obj.expectedFly &&
        !obj.expectedLand &&
        !obj.signIn &&
        !obj.signOut &&
        !obj.luggage
      ) {
        params = {};
      } else {
        params = { ...obj };
      }
      let res = await this.$request({
        type: "get",
        url: "/home/searchState",
        params,
      });
      if (res) {
        console.log(res);
        this.planeStateData = res.data;
      }
    },
    // 删除航班动态
    async deleteTo(row) {
      this.$confirm("此操作将永久删除该航班动态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$request({
          type: "post",
          url: "/home/deleteState",
          params: { pid: row.pid },
        });
        if (res) {
          this.getState({});
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    // 获取航班信息
    async getPlaneInfo() {
      let res = await this.$request({
        type: "get",
        url: "/home/getlist",
      });
      if (res) {
        this.allPlaneInfo = res.data;
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
