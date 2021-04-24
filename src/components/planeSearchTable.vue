<template>
  <el-form :model="searchForm" ref="searchForm" :rules="searchRulesForm">
    <el-form-item label="* 航程类型:">
      <el-switch
        v-model="searchForm.isBack"
        active-text="往返"
        inactive-text="单程"
      >
      </el-switch>
    </el-form-item>
    <el-form-item label="出发城市:" prop="pStartCity">
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
    <el-form-item label="到达城市:" prop="pEndCity">
      <el-select v-model="searchForm.pEndCity" filterable placeholder="请选择">
        <el-option
          v-for="(item, index) in cityArr"
          :key="index"
          :label="item.city"
          :value="item.city"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出发日期:" prop="pStartTime">
      <el-date-picker
        v-model="searchForm.pStartTime"
        type="date"
        placeholder="选择出发日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="* 返回日期:" prop="pEndTime">
      <el-date-picker
        v-model="searchForm.pEndTime"
        type="date"
        placeholder="选择返回日期"
        :disabled="!searchForm.isBack"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item class="searchBtn">
      <el-button @click="searchPlane('searchForm')" type="warning"
        >搜索</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    cityArr: null,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      searchForm: {
        pStartCity: "",
        pEndCity: "",
        pStartTime: "",
        pEndTime: "",
        isBack: false,
      },
      searchRulesForm: {
        pStartCity: [
          { required: true, message: "请输入出发地", trigger: "blur" },
        ],
        pEndCity: [
          { required: true, message: "请输入目的地", trigger: "blur" },
        ],
        pStartTime: [
          { required: true, message: "请输入出发日期", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async searchPlane(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          if (this.searchForm.pStartCity === this.searchForm.pEndCity)
            return this.$message.error("出发和到达城市不能重复");

          this.$router.push({
            path: "/resultShow",
            query: {
              pStartCity: this.searchForm.pStartCity,
              pEndCity: this.searchForm.pEndCity,
              pStartTime: new Date(this.searchForm.pStartTime).getTime(),
              pEndTime: this.searchForm.pEndTime
                ? new Date(this.searchForm.pEndTime).getTime()
                : "",
              isBack: this.searchForm.isBack,
            },
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
::v-deep .el-scrollbar__wrap {
  max-height: 200px;
}
.searchBtn ::v-deep .el-button {
  width: 200px !important;
}
</style>
