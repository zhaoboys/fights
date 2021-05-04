<template>
  <div>
    <el-form
      :model="searchForm"
      :inline="true"
      ref="searchForm"
      label-width="80px"
    >
      <el-form-item label="航班id">
        <el-input v-model="searchForm.pid"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-select
          v-model="searchForm.cid"
          filterable
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="(item, index) in companyData"
            :key="index"
            :label="item.cname ? item.cname : ''"
            :value="item.cid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="航班名称">
        <el-input v-model="searchForm.pname"></el-input>
      </el-form-item>
      <el-form-item label="机型">
        <el-input v-model="searchForm.pmodel"></el-input>
      </el-form-item>
      <el-form-item label="出发城市">
        <el-select
          v-model="searchForm.pStartCity"
          filterable
          placeholder="请选择"
          @change="startCityChange"
          clearable
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
      <el-form-item label="目的地" prop="pEndCity">
        <el-select
          v-model="searchForm.pEndCity"
          filterable
          placeholder="请选择"
          @change="endCityChange"
          clearable
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
      <el-form-item label="出发机场" prop="pStartArea">
        <el-select
          v-model="searchForm.pStartArea"
          filterable
          placeholder="请选择"
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
          v-model="searchForm.pEndArea"
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
      <el-form-item label="出发时间" prop="pStartTime">
        <el-date-picker
          v-model="searchForm.pStartTime"
          type="datetime"
          placeholder="选择出发日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到达时间" prop="pEndTime">
        <el-date-picker
          v-model="searchForm.pEndTime"
          type="datetime"
          placeholder="选择出发日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchTo">查询</el-button>
        <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
        <el-button @click="showAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="新增航班"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="航班id" prop="pid">
          <el-input v-model="ruleForm.pid"></el-input>
        </el-form-item>
        <el-form-item label="航空公司" prop="cid">
          <el-select v-model="ruleForm.cid" filterable placeholder="请选择">
            <el-option
              v-for="(item, index) in companyData"
              :key="index"
              :label="item.cname ? item.cname : ''"
              :value="item.cid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="航班名称" prop="pname">
          <el-input v-model="ruleForm.pname"></el-input>
        </el-form-item>
        <el-form-item label="机型" prop="pmodel">
          <el-input v-model="ruleForm.pmodel"></el-input>
        </el-form-item>
        <el-form-item label="出发地" prop="pStartCity">
          <el-select
            v-model="ruleForm.pStartCity"
            filterable
            placeholder="请选择"
            @change="startCityChange1"
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
        <el-form-item label="目的地" prop="pEndCity">
          <el-select
            v-model="ruleForm.pEndCity"
            filterable
            placeholder="请选择"
            @change="endCityChange1"
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
        <el-form-item label="出发机场" prop="pStartArea">
          <el-select
            v-model="ruleForm.pStartArea"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in planeAreaObj1.start"
              :key="index"
              :label="item.cityArea"
              :value="item.cityArea"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到达机场" prop="pEndArea">
          <el-select
            v-model="ruleForm.pEndArea"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in planeAreaObj1.end"
              :key="index"
              :label="item.cityArea"
              :value="item.cityArea"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出发时间" prop="pStartTime">
          <el-date-picker
            v-model="ruleForm.pStartTime"
            type="datetime"
            placeholder="选择出发日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到达时间" prop="pEndTime">
          <el-date-picker
            v-model="ruleForm.pEndTime"
            type="datetime"
            placeholder="选择出发日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="addTo('ruleForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    companyData: null,
    cityArr: null,
  },
  data() {
    return {
      searchForm: {
        pid: "",
        cid: "",
        pname: "",
        pmodel: "",
        pStartCity: "",
        pEndCity: "",
        pStartArea: "",
        pEndArea: "",
        pStartTime: "",
        pEndTime: "",
      },
      planeAreaObj: {
        start: [],
        end: [],
      },
      planeAreaObj1: {
        start: [],
        end: [],
      },
      dialogVisible: false,
      ruleForm: {
        pid: "",
        cid: "",
        pname: "",
        pmodel: "",
        pStartCity: "",
        pEndCity: "",
        pStartArea: "",
        pEndArea: "",
        pStartTime: "",
        pEndTime: "",
      },
      rules: {
        pid: [{ required: true, message: "请输入航空ID", trigger: "blur" }],
        cid: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        pname: [{ required: true, message: "请输入航班名称", trigger: "blur" }],
        pmodel: [{ required: true, message: "请输入机型", trigger: "blur" }],
        pStartCity: [
          { required: true, message: "请输入出发地", trigger: "blur" },
        ],
        pEndCity: [
          { required: true, message: "请输入目的地", trigger: "blur" },
        ],
        pStartArea: [
          { required: true, message: "请输入出发机场", trigger: "blur" },
        ],
        pEndArea: [
          { required: true, message: "请输入到达机场", trigger: "blur" },
        ],
        pStartTime: [
          { required: true, message: "请输入出发时间", trigger: "blur" },
        ],
        pEndTime: [
          { required: true, message: "请输入到达时间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 添加航班
    addTo(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          let res = await this.$request({
            type: "post",
            url: "/home/addPlane",
            params: {
              pid: this.ruleForm.pid,
              cid: this.ruleForm.cid,
              pname: this.ruleForm.pname,
              pmodel: this.ruleForm.pmodel,
              pStartCity: this.ruleForm.pStartCity,
              pEndCity: this.ruleForm.pEndCity,
              pStartArea: this.ruleForm.pStartArea,
              pEndArea: this.ruleForm.pEndArea,
              pStartTime: new Date(this.ruleForm.pStartTime).getTime(),
              pEndTime: new Date(this.ruleForm.pEndTime).getTime(),
            },
          });
          if (res) {
            console.log(res.data);
            this.dialogVisible = false;
            this.$message.success("添加成功");
            this.$refs.ruleForm.resetFields();
            this.$emit("addSuccess");
          }
        }
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
    async getCityPlane1(city, arr) {
      let res = await this.$request({
        type: "get",
        url: "/home/getPlaneArea",
        params: { city },
      });
      if (res) {
        this.planeAreaObj1[arr] = res.data;
      }
    },
    async startCityChange1() {
      await this.getCityPlane1(this.ruleForm.pStartCity, "start");
      this.ruleForm.pStartArea = this.planeAreaObj1.start[0].cityArea;
    },
    async endCityChange1() {
      await this.getCityPlane1(this.ruleForm.pEndCity, "end");
      this.ruleForm.pEndArea = this.planeAreaObj1.end[0].cityArea;
    },
    async startCityChange() {
      await this.getCityPlane(this.searchForm.pStartCity, "start");
      this.searchForm.pStartArea = this.planeAreaObj.start[0].cityArea;
    },
    async endCityChange() {
      await this.getCityPlane(this.searchForm.pEndCity, "end");
      this.searchForm.pEndArea = this.planeAreaObj.end[0].cityArea;
    },
    async searchTo() {
      let obj = {};
      for (let key in this.searchForm) {
        if (this.searchForm[key]) {
          obj[key] = this.searchForm[key];
        }
      }
      if (JSON.stringify(obj) === "{}") {
        let res = await this.$request({
          type: "get",
          url: "/home/getlist",
        });
        if (res) {
          this.$emit("headerSearch", res.data);
        }
      } else {
        let res = await this.$request({
          type: "get",
          url: "/home/airSearch",
          params: obj,
        });
        if (res) {
          this.$emit("headerSearch", res.data);
        }
      }
    },
    showAdd() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style scoped></style>
