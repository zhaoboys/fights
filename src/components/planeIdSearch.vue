<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-form v-show="show" :model="searchForm">
        <el-form-item label="查询类型:" label-width="80px">
          <el-switch
            v-model="searchForm.isId"
            active-text="按起降地"
            inactive-text="按航班号"
          >
          </el-switch>
        </el-form-item>
        <el-form-item
          v-if="!searchForm.isId"
          label="航班号:"
          label-width="80px"
        >
          <el-input v-model="searchForm.pname"></el-input>
        </el-form-item>
        <el-form-item
          v-if="searchForm.isId"
          label="出发城市:"
          prop="pStartCity"
          label-width="80px"
        >
          <el-select
            v-model="searchForm.pStartCity"
            filterable
            placeholder="请选择"
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
        <el-form-item
          v-if="searchForm.isId"
          label="到达城市:"
          prop="pEndCity"
          label-width="80px"
        >
          <el-select
            v-model="searchForm.pEndCity"
            filterable
            placeholder="请选择"
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
        <el-form-item label="出发日期:" label-width="80px">
          <el-date-picker
            v-model="searchForm.pStartTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button @click="SearchTo" type="warning">搜索</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    cityArr: null,
  },
  data() {
    return {
      show: false,
      searchForm: {
        isId: false,
        pname: "",
        pStartTime: "",
        pStartCity: "",
        pEndCity: "",
      },
    };
  },
  created() {
    this.show = true;
  },
  methods: {
    async SearchTo() {
      if (!this.searchForm.isId) {
        if (!this.searchForm.pname || !this.searchForm.pStartTime) {
          return this.$message.error("航班号和出发日期不可为空");
        }
        let time = new Date(this.searchForm.pStartTime).getTime();
        console.log(this.searchForm.pname, 454566);
        this.$router.push({
          path: "/plabeState",
          query: {
            isLeft: 1,
            pname: this.searchForm.pname,
            pStartTime: time,
          },
        });
      } else {
        if (
          !this.searchForm.pStartCity ||
          !this.searchForm.pEndCity ||
          !this.searchForm.pStartTime
        ) {
          return this.$message.error("出发到达城市和出发日期不可为空");
        }
        if (this.searchForm.pStartCity === this.searchForm.pEndCity)
          return this.$message.error("出发和到达城市不能重复");

        console.log(this.searchForm.pname, 454566);
        this.$router.push({
          path: "/plabeState",
          query: {
            isLeft: 0,
            pStartCity: this.searchForm.pStartCity,
            pEndCity: this.searchForm.pEndCity,
            pStartTime: new Date(this.searchForm.pStartTime).getTime(),
          },
        });

        // let time = this.$oneDayTime(
        //   new Date(this.searchForm.pStartTime).getTime()
        // );
        // let res = await this.$request({
        //   type: "get",
        //   url: "/home/airSearch",
        //   params: {
        //     pStartCity: this.searchForm.pStartCity,
        //     pEndCity: this.searchForm.pEndCity,
        //     pStartTime: time[0],
        //     pEndTime: time[1],
        //   },
        // });
        // if (res) {
        //   console.log(res);
        // }
      }
    },
  },
};
</script>
<style scoped>
.searchBtn ::v-deep .el-button {
  width: 200px;
}
</style>
