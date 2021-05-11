<template>
  <div>
    <!-- 搜索 -->
    <div>
      <ManagePlaneHeader
        :companyData="companyData"
        :cityArr="cityArr"
        @headerSearch="headerSearch"
        @addSuccess="addSuccess"
      ></ManagePlaneHeader>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="planeData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="tableLoading"
        stripe
      >
        <el-table-column prop="pid" label="航班id" width="80">
        </el-table-column>
        <el-table-column prop="cid" label="航空公司" width="80">
          <template slot-scope="scope">
            {{
              companyData.find((item) => item.cid === scope.row.cid).cname
                ? companyData.find((item) => item.cid === scope.row.cid).cname
                : "/"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="pname" label="航班名称" width="80">
        </el-table-column>
        <el-table-column prop="pmodel" label="机型" width="80">
        </el-table-column>
        <el-table-column prop="pStartCity" label="出发地" width="80">
        </el-table-column>
        <el-table-column prop="pEndCity" label="目的地" width="80">
        </el-table-column>
        <el-table-column prop="pStartArea" label="出发机场"> </el-table-column>
        <el-table-column prop="pEndArea" label="到达机场"> </el-table-column>
        <el-table-column prop="pStartTime" label="出发时间">
          <template slot-scope="scope">
            {{
              new Date(scope.row.pStartTime).getFullYear() +
              "年" +
              $getHours(scope.row.pStartTime)[0] +
              $getHours(scope.row.pStartTime)[1]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="pEndTime" label="到达时间">
          <template slot-scope="scope">
            {{
              new Date(scope.row.pEndTime).getFullYear() +
              "年" +
              $getHours(scope.row.pEndTime)[0] +
              $getHours(scope.row.pEndTime)[1]
            }}
          </template>
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
    <!-- diagole -->
    <div>
      <!-- 修改弹出开始 -->
      <el-dialog
        title="航班信息修改"
        :visible.sync="changeDialogVisible"
        width="30%"
        :before-close="changeHandleClose"
        :close-on-click-modal="false"
      >
        <el-form
          ref="changePlaneInfo"
          :model="changePlaneInfo"
          :rules="changePlaneInfoForm"
          label-width="100px"
          class="formLeft"
          size="mini"
        >
          <el-form-item label="航班id" prop="pid">
            <el-input v-model="changePlaneInfo.pid"></el-input>
          </el-form-item>
          <el-form-item label="航空公司" prop="cid">
            <el-select
              v-model="changePlaneInfo.cid"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in companyData"
                :key="index"
                :label="item.cname ? item.cname : ''"
                :value="item.cid"
                :disabled="areaDisable(item.city, cityArr)"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="航班名称" prop="pname">
            <el-input v-model="changePlaneInfo.pname"></el-input>
          </el-form-item>
          <el-form-item label="机型" prop="pmodel">
            <el-input v-model="changePlaneInfo.pmodel"></el-input>
          </el-form-item>
          <el-form-item label="出发地" prop="pStartCity">
            <el-select
              v-model="changePlaneInfo.pStartCity"
              filterable
              placeholder="请选择"
              @change="startCityChange"
            >
              <el-option
                v-for="(item, index) in cityArr"
                :key="index"
                :label="item.city"
                :value="item.city"
                :disabled="areaDisable(item.city, cityArr)"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目的地" prop="pEndCity">
            <el-select
              v-model="changePlaneInfo.pEndCity"
              filterable
              placeholder="请选择"
              @change="endCityChange"
            >
              <el-option
                v-for="(item, index) in cityArr"
                :key="index"
                :label="item.city"
                :value="item.city"
                :disabled="areaDisable(item.city, cityArr)"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出发机场" prop="pStartArea">
            <el-select
              v-model="changePlaneInfo.pStartArea"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in planeAreaObj.start"
                :key="index"
                :label="item.cityArea"
                :value="item.cityArea"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到达机场" prop="pEndArea">
            <el-select
              v-model="changePlaneInfo.pEndArea"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in planeAreaObj.end"
                :key="index"
                :label="item.cityArea"
                :value="item.cityArea"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出发时间" prop="pStartTime">
            <el-date-picker
              v-model="changePlaneInfo.pStartTime"
              type="datetime"
              placeholder="选择出发日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到达时间" prop="pEndTime">
            <el-date-picker
              v-model="changePlaneInfo.pEndTime"
              type="datetime"
              placeholder="选择出发日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="changeDialogVisible = false">取消</el-button>
            <el-button @click="changeTo">修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 修改弹出结束 -->
    </div>
  </div>
</template>
<script>
import ManagePlaneHeader from "./managePlaneHeader";
export default {
  components: { ManagePlaneHeader },
  data() {
    return {
      cityArr: [],
      planeData: [],
      changePlaneInfo: {},
      changePlaneInfoForm: {},
      changeDialogVisible: false,
      planeAreaObj: {
        start: null,
        end: null,
      },
      tableLoading: false,
      companyData: [],
    };
  },
  created() {
    this.getAllPlane();
    this.getCity();
    this.getCompany();
  },
  methods: {
    //禁止选中
    areaDisable() {
      // console.log(cityArr);
      // console.log(city, cityArr);
      // for (let i = 0; i < cityArr.length; i++) {
      //   if (cityArr[i].city == city) {
      //     console.log(123);
      //     return true;
      //   }
      //   return false;
      // }
    },
    // 获取所有航班信息
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
    //获取地区
    async getCity() {
      let res = await this.$request({ type: "get", url: "/home/getCity" });
      if (res.data.length > 0) {
        this.cityArr = res.data;
      }
    },
    //获取航空公司
    async getCompany() {
      let res = await this.$request({ type: "get", url: "home/getCompany" });
      if (res) {
        console.log(res);
        this.companyData = res.data;
      }
    },
    // 打开修改航班信息弹窗
    async showPlaneChange(row) {
      this.changePlaneInfo = {
        pid: row.pid,
        cid: row.cid,
        pname: row.pname,
        pmodel: row.pmodel,
        pStartCity: row.pStartCity,
        pEndCity: row.pEndCity,
        pStartArea: row.pStartArea,
        pEndArea: row.pEndArea,
        pStartTime: new Date(row.pStartTime).getTime(),
        pEndTime: new Date(row.pEndTime).getTime(),
      };
      this.changeDialogVisible = true;
      this.getCityPlane(this.changePlaneInfo.pStartCity, "start");
      this.getCityPlane(this.changePlaneInfo.pEndCity, "end");
    },
    changeHandleClose() {
      this.changeDialogVisible = false;
      this.$refs.changePlaneInfo.resetFields();
    },
    //根据城市选机场
    async getCityPlane(city, arr) {
      let res = await this.$request({
        type: "get",
        url: "/home/getPlaneArea",
        params: { city },
      });
      if (res) {
        this.planeAreaObj[arr] = res.data;
      }
    },
    // 出发地改变
    async startCityChange() {
      await this.getCityPlane(this.changePlaneInfo.pStartCity, "start");
      this.changePlaneInfo.pStartArea = this.planeAreaObj.start[0].cityArea;
    },
    // 目的地改变
    async endCityChange() {
      await this.getCityPlane(this.changePlaneInfo.pEndCity, "end");
      this.changePlaneInfo.pEndArea = this.planeAreaObj.end[0].cityArea;
    },
    // 删除航班信息
    async deleteTo(row) {
      this.$confirm("此操作将永久删除该航班信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$request({
          type: "post",
          url: "/user/deletePlane",
          params: {
            pid: row.pid,
          },
        });
        if (res.data.affectedRows > 0) {
          this.getAllPlane();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },

    // 提交修改
    async changeTo() {
      this.$confirm("此操作将修改该航班信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$request({
          type: "post",
          url: "/user/planeChange",
          params: {
            pid: this.changePlaneInfo.pid,
            cid: this.changePlaneInfo.cid,
            pname: this.changePlaneInfo.pname,
            pmodel: this.changePlaneInfo.pmodel,
            pStartCity: this.changePlaneInfo.pStartCity,
            pEndCity: this.changePlaneInfo.pEndCity,
            pStartArea: this.changePlaneInfo.pStartArea,
            pEndArea: this.changePlaneInfo.pEndArea,
            pStartTime: new Date(this.changePlaneInfo.pStartTime).getTime(),
            pEndTime: new Date(this.changePlaneInfo.pEndTime).getTime(),
          },
        });
        if (res) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getAllPlane();
          this.changeDialogVisible = false;
          this.$refs.changePlaneInfo.resetFields();
        }
      });
    },
    async headerSearch(data) {
      this.tableLoading = true;
      this.planeData = await data;
      this.tableLoading = false;
    },
    addSuccess() {
      this.getAllPlane();
    },
  },
};
</script>
<style scoped>
.formLeft .el-form-item__content {
  text-align: left !important;
}
</style>
