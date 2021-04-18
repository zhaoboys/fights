<template>
  <div id="mian">
    <!-- 顶部搜索框开始 -->
    <div>
      <el-form ref="resForm" :model="resForm" :inline="true">
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
        <el-form-item> </el-form-item>
      </el-form>
    </div>
    <!-- 顶部搜索框结束 -->
    <!-- 中间展示开始 -->
    <div>
      <el-table
        :data="planetableData"
        style="width: 100%"
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
      planetableData: [],
      searchForm: {}, //搜索页面传过来的值
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
    };
  },
  created() {
    this.searchForm = this.$route.query;
    this.planeSearch();
  },
  methods: {
    // 初始接受值搜索航班信息
    async planeSearch() {
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
          console.log(res, 123);
          this.planetableData = res.data;
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
          console.log(res, 123);
          this.planetableData = res.data;
        }
      }
    },
    //获取地址
    async getCity() {
      let res = await this.$request({ type: "get", url: "/home/getCity" });
      if (res.data.length > 0) {
        this.cityArr = res.data;
        console.log(this.cityArr);
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
</style>
