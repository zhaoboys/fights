<template>
  <div id="mian">
    <div><UserShow></UserShow></div>
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班查询系统</span>
    </div>
    <!-- 左侧栏搜索条件选择框 -->
    <div class="searchLeftBox">
      <el-form ref="searchLeftForm" :model="searchLeftForm">
        <el-form-item label="出发机场">
          <el-select
            v-model="searchLeftForm.pStartArea"
            filterable
            placeholder="请选择出发机场"
            clearable
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
            v-model="searchLeftForm.pEndArea"
            filterable
            placeholder="请选择"
            clearable
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
        <el-form-item label="航空公司" prop="cid">
          <el-select
            v-model="searchLeftForm.cid"
            filterable
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in companyData"
              :key="index"
              :label="item.cname"
              :value="item.cid"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧酒店推荐div -->
    <div class="pubBox">
      <RecommendPub :city="resForm.pEndCity"></RecommendPub>
    </div>
    <!-- 顶部搜索框开始 -->
    <div class="searchTop">
      <el-form ref="resForm" :model="resForm" :inline="true">
        <!-- 单程/往返 -->
        <el-form-item prop="isBack">
          <el-select v-model="resForm.isBack">
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 起飞地 -->
        <el-form-item>
          <el-select
            v-model="resForm.pStartCity"
            filterable
            placeholder="请选择起飞地"
            @change="startChange"
          >
            <el-option
              v-for="(item, index) in cityArr"
              :key="index"
              :label="item.city"
              :value="item.city"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 转换 -->
        <el-form-item class="areaChange">
          <i @click="exchangeTO" class="el-icon-refresh"></i>
        </el-form-item>
        <!-- 将落地 -->
        <el-form-item>
          <el-select
            v-model="resForm.pEndCity"
            filterable
            placeholder="请选择将落地"
            @change="endChange"
          >
            <el-option
              v-for="(item, index) in cityArr"
              :key="index"
              :label="item.city"
              :value="item.city"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 起飞时间 -->
        <el-form-item>
          <el-date-picker
            v-model="resForm.pStartTime"
            type="date"
            placeholder="选择出发日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 降落时间 -->
        <el-form-item>
          <el-date-picker
            v-model="resForm.pEndTime"
            type="date"
            placeholder="选择出发日期"
            :picker-options="pickerOptions"
            :disabled="!resForm.isBack"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="searchTo">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 顶部搜索框结束 -->
    <!-- 中间展示开始 -->
    <div class="centerDiv">
      <el-table
        :data="planetableData"
        style="width: 100%"
        v-loading="tableLoading"
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="pname" sortable label="航班信息" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.cid">
              {{ companyData.find((item) => item.cid === scope.row.cid).cname }}
            </div>
            <div>{{ scope.row.pname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="pStartTime"
          label="出发时间"
          sortable
          width="150"
        >
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
        <el-table-column prop="pEndTime" width="150" sortable label="到达时间">
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
        <el-table-column width="180" label="出发地点">
          <template slot-scope="scope">
            <div>{{ scope.row.pStartCity }}</div>
            <div>{{ scope.row.pStartArea }}</div>
          </template>
        </el-table-column>
        <el-table-column width="180" label="到达地点">
          <template slot-scope="scope">
            <div>{{ scope.row.pEndCity }}</div>
            <div>{{ scope.row.pEndArea }}</div>
          </template>
        </el-table-column>
        <el-table-column label="关注" width="90px" v-if="!!userName">
          <template slot-scope="scope">
            <el-button size="small" @click="changeCare($event, scope.row)">
              {{
                userCareData.find((item) => item.pid === scope.row.pid) ===
                undefined
                  ? "关注"
                  : "取消关注"
              }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="订票" width="90px" v-if="!!userName">
          <template slot-scope="scope">
            <el-button @click="ticketTo(scope.row)" size="small"
              >去订票</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 中间展示结束 -->
  </div>
</template>
<script>
import UserShow from "./../components/userShow";
import RecommendPub from "./../components/recommendPub";
export default {
  components: {
    UserShow,
    RecommendPub,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      planetableData: [],
      searchForm: null, //搜索页面传过来的值
      resForm: {
        pStartCity: "",
        pEndCity: "",
        pStartTime: "",
        pEndTime: "",
        isBack: false,
      },
      options: [
        { value: false, label: "单程" },
        { value: true, label: "往返" },
      ],
      cityArr: [],
      tableLoading: false,
      companyData: [],
      userCareData: [],
      searchLeftForm: {
        pStartArea: "",
        pEndArea: "",
        cid: "",
      },
      planeAreaObj: {
        start: [],
        end: [],
      },
      userName: "",
    };
  },
  async created() {
    this.userName = sessionStorage.getItem("uname");
    // console.log(this.userName);
    this.searchForm = this.$route.query;
    this.resForm = {
      pStartCity: this.$route.query.pStartCity,
      pEndCity: this.$route.query.pEndCity,
      pStartTime: parseInt(this.$route.query.pStartTime),
      pEndTime: this.$route.query.pEndTime
        ? parseInt(this.$route.query.pEndCity)
        : parseInt(this.$route.query.pStartTime),
      isBack: this.$route.query.isBack === "false" ? false : true,
    };
    // console.log(this.$route.query, 123);
    let arr = [];
    arr.push(this.getCityPlane(this.$route.query.pStartCity, "start"));
    arr.push(this.getCityPlane(this.$route.query.pEndCity, "end"));
    arr.push(this.planeSearch());
    arr.push(this.getCity());
    arr.push(this.getCopany());
    arr.push(this.getUserCare());
    await Promise.all(arr);
  },
  wacth: {
    // resForm(newval) {
    //   this.resForm.pEndCity = newval.pEndCity;
    // },
  },
  methods: {
    // 前往订票页
    ticketTo(row) {
      this.$router.push({
        path: "/buyTickets",
        query: { ...row },
      });
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
    startChange() {
      this.getCityPlane(this.resForm.pStartCity, "start");
      this.searchLeftForm.pStartArea = "";
    },
    endChange() {
      this.getCityPlane(this.resForm.pEndCity, "end");
      this.searchLeftForm.pEndArea = "";
    },
    async changeCare(e, row) {
      if (e.target.innerHTML === "<!----><!----><span> 关注 </span>") {
        let res = await this.$request({
          type: "post",
          url: "/user/addCare",
          params: {
            uid: window.sessionStorage.getItem("uid"),
            pid: row.pid,
          },
        });
        if (res) {
          this.getUserCare();
        }
      }
      if (e.target.innerHTML === "<!----><!----><span> 取消关注 </span>") {
        let res = await this.$request({
          type: "post",
          url: "/user/deleteCare",
          params: {
            uid: window.sessionStorage.getItem("uid"),
            pid: row.pid,
          },
        });
        if (res) {
          this.getUserCare();
        }
      }
    },
    // 初始接受值搜索航班信息
    async planeSearch() {
      // 展示加载动画
      this.tableLoading = true;
      if (this.searchForm.pEndTime) {
        let startTime = this.$oneDayTime(
          parseInt(this.searchForm.pStartTime)
        )[0];
        let endTime = this.$oneDayTime(parseInt(this.searchForm.pEndTime))[1];
        let res = await this.$request({
          type: "get",
          url: "/home/airSearch",
          params: {
            pStartCity: this.searchForm.pStartCity,
            pEndCity: this.searchForm.pEndCity,
            pStartTime: startTime,
            pEndTime: endTime,
          },
        });
        if (res) {
          this.planetableData = res.data;
          // this.resForm = res.data;
        }
      } else {
        let time = this.$oneDayTime(parseInt(this.searchForm.pStartTime));
        let res = await this.$request({
          type: "get",
          url: "/home/airSearch",
          params: {
            pStartCity: this.searchForm.pStartCity,
            pEndCity: this.searchForm.pEndCity,
            pStartTime: time[0],
            pEndTime: time[1],
          },
        });
        if (res) {
          this.planetableData = res.data;
          // this.resForm = res.data;
        }
      }
      // 关闭加载动画
      this.tableLoading = false;
    },
    //获取地址
    async getCity() {
      let res = await this.$request({ type: "get", url: "/home/getCity" });
      if (res.data.length > 0) {
        this.cityArr = res.data;
      }
    },
    // 目的地互换
    exchangeTO() {
      let a = this.resForm.pStartCity;
      this.resForm.pStartCity = this.resForm.pEndCity;
      this.resForm.pEndCity = a;
      this.getCityPlane(this.resForm.pStartCity, "start");
      this.getCityPlane(this.resForm.pEndCity, "end");
    },
    //获取航空公司
    async getCopany() {
      let res = await this.$request({
        type: "get",
        url: "/home/getCompany",
      });
      if (res) {
        this.companyData = res.data;
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
    // 航班搜索
    async searchTo() {
      if (this.resForm.pStartCity === this.resForm.pEndCity) {
        return this.$message.error("出发城市和到达城市不能相同");
      }
      console.log(this.resForm.pEndTime);
      console.log(this.resForm);
      let res = await this.$request({
        type: "get",
        url: "/home/airSearch",
        params: {
          pStartCity: this.resForm.pStartCity,
          pEndCity: this.resForm.pEndCity,
          pStartArea: this.searchLeftForm.pStartArea,
          pEndArea: this.searchLeftForm.pEndArea,
          pStartTime: this.$oneDayTime(this.resForm.pStartTime)[0],
          pEndTime: this.$oneDayTime(this.resForm.pEndTime)[1],
          cid: this.searchLeftForm.cid,
        },
      });
      if (res) {
        console.log(res);
        this.planetableData = res.data;
      }
    },
  },
};
</script>
<style scoped>
#mian {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
::v-deep .searchTop .el-form-item,
::v-deep .searchTop .el-date-editor.el-input {
  width: 150px;
}

.searchTop {
  border: 1px solid #a6a8aa;
  line-height: 1;
  vertical-align: middle;
  padding: 15px;
  border-radius: 5px;
}

.searchTop ::v-deep .el-form .el-form-item {
  margin: 0 10px;
}

.searchTop ::v-deep .el-form .el-form-item:nth-child(3) {
  margin: 0;
  text-align: center;
}
.searchTop ::v-deep .el-form .el-form-item:last-child {
  width: 80px;
}
.areaChange {
  cursor: pointer;
  width: 20px !important;
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
.centerDiv {
  padding: 10px;
}
.searchLeftBox {
  background: #fff;
  position: absolute;
  padding: 10px;
  width: 200px;
  /* height: 300px; */
  border: 1px solid #a6a8aa;
  border-radius: 5px;
  top: 30%;
  left: 10px;
  z-index: 35;
}
.pubBox {
  background: #fff;
  position: absolute;
  padding: 10px;
  width: 200px;
  /* height: 250px; */
  border: 1px solid #a6a8aa;
  border-radius: 5px;
  top: 30%;
  right: 10px;
  z-index: 35;
}
</style>
