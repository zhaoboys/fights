<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" inline>
      <el-form-item label="航班id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-select
          v-model="form.city"
          filterable
          @change="cityChange"
          clearable
        >
          <el-option
            v-for="(item, index) in cityArr"
            :key="index"
            :label="item.city"
            :value="item.city"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机场">
        <el-select
          v-model="form.cityArea"
          filterable
          @click="cityChange"
          clearable
        >
          <el-option
            v-for="(item, index) in planeArea"
            :key="index"
            :label="item.cityArea"
            :value="item.cityArea"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchTo">搜索</el-button>
        <el-button @click="dialogVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="添加航班信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="航班id" prop="id">
          <el-input v-model.number="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="addForm.city" filterable clearable>
            <el-option
              v-for="(item, index) in cityArr"
              :key="index"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机场名称" prop="cityArea">
          <el-input v-model="addForm.cityArea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="addTo('addForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: { cityArr: null },
  data() {
    return {
      form: {
        id: "",
        city: "",
        cityArea: "",
      },
      planeArea: null,
      dialogVisible: false,
      addForm: {
        id: "",
        city: "",
        cityArea: "",
      },
      addFormRules: {
        id: [
          { required: true, message: "请输入航班id", trigger: "blur" },
          { type: "number", message: "值必须为数字值" },
        ],
        city: [{ required: true, message: "请选择城市名", trigger: "blur" }],
        cityArea: [
          { required: true, message: "请输入机场名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$refs.addForm.resetFields();
    },
    addTo(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let res = await this.$request({
            type: "post",
            url: "/home/addCityPlane",
            params: { ...this.addForm },
          });
          if (res) {
            this.$message.success("添加成功");
            this.$emit("addPlane");
            this.dialogVisible = false;
          }
        }
      });
    },
    async cityChange() {
      let res = await this.$request({
        type: "get",
        url: "/home/getPlaneArea",
        params: {
          city: this.form.city,
        },
      });
      if (res) {
        this.planeArea = res.data;
        this.form.cityArea = res.data[0].cityArea;
      }
    },
    async searchTo() {
      let obj = {};
      for (let key in this.form) {
        if (this.form[key]) {
          obj[key] = this.form[key];
        }
      }
      console.log(obj, 123);
      if (JSON.stringify(obj) === "{}") {
        let res = await this.$request({
          type: "get",
          url: "/home/geAllPlaneArea",
        });
        if (res) {
          this.$emit("headerSearch", res.data);
        }
      } else {
        let res = await this.$request({
          type: "get",
          url: "/home/getPlaneArea1",
          params: obj,
        });
        if (res) {
          this.$emit("headerSearch", res.data);
        }
      }
    },
  },
};
</script>
<style scoped></style>
