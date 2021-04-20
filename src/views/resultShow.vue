<template>
  <div id="mian">
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
    <div>
      <el-table
        :data="planetableData"
        style="width: 100%"
        v-loading="tableLoading"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="pname" sortable label="航班信息" width="180">
          <template slot-scope="scope">
            <div>{{ scope.row.cid }}</div>
            <div>{{ scope.row.pname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="pStartTime"
          label="出发时间"
          sortable
          width="180"
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
        <el-table-column prop="pEndTime" width="180" sortable label="到达时间">
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
      </el-table>
    </div>
    <!-- 中间展示结束 -->
  </div>
</template>
<script>
export default {
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
    };
  },
  async created() {
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
    console.log(this.$route.query, 123);
    let arr = [];
    arr.push(this.planeSearch());
    arr.push(this.getCity());
    await Promise.all(arr);
  },
  methods: {
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
    },
    // 航班搜索
    async searchTo() {
      console.log(this.resForm.pEndTime);
      let res = await this.$request({
        type: "get",
        url: "/home/airSearch",
        params: {
          pStartCity: this.resForm.pStartCity,
          pEndCity: this.resForm.pEndCity,
          pStartTime: this.$oneDayTime(this.resForm.pStartTime)[0],
          pEndTime: this.$oneDayTime(this.resForm.pEndTime)[1],
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
}
::v-deep .searchTop .el-form-item,
::v-deep .searchTop .el-date-editor.el-input {
  width: 150px;
}

.areaChange {
  cursor: pointer;
  width: 20px !important;
}
</style>
