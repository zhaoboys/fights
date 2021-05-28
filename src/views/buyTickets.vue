<template>
  <div id="main">
    <div><UserShow></UserShow></div>
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班订票页面</span>
    </div>
    <!-- 航班信息展示 -->
    <div class="contentDiv">
      <el-form :model="planeInfoData" :inline="true" class="inforData">
        <el-form-item
          label="航班公司:"
          label-width="120px"
          v-if="!planeInfoData.cid"
        >
          {{ companyData.find((item) => item.cid === planeInfoData.cid).cname }}
        </el-form-item>
        <el-form-item label="航班名称:" label-width="120px">
          {{ planeInfoData.pname }}
        </el-form-item>
        <el-form-item label="机型:" label-width="120px">
          {{ planeInfoData.pmodel }}
        </el-form-item>
        <el-form-item label="出发城市:" label-width="120px">
          {{ planeInfoData.pStartCity }}
        </el-form-item>
        <el-form-item label="到达城市:" label-width="120px">
          {{ planeInfoData.pEndCity }}
        </el-form-item>
        <el-form-item label="出发机场:" label-width="120px">
          {{ planeInfoData.pStartArea }}
        </el-form-item>
        <el-form-item label="到达机场:" label-width="120px">
          {{ planeInfoData.pEndArea }}
        </el-form-item>
        <!-- <el-form-item label="到达机场:" label-width="120px">
          {{ planeInfoData.pEndArea }}
        </el-form-item> -->
        <el-form-item label="出发时间:" label-width="120px">
          {{
            new Date(parseInt(planeInfoData.pStartTime)).getFullYear() +
            "年" +
            $getHours(parseInt(planeInfoData.pStartTime))[0] +
            $getHours(parseInt(planeInfoData.pStartTime))[1]
          }}
        </el-form-item>
        <el-form-item label="到达时间:" label-width="120px">
          {{
            new Date(parseInt(planeInfoData.pEndTime)).getFullYear() +
            "年" +
            $getHours(parseInt(planeInfoData.pEndTime))[0] +
            $getHours(parseInt(planeInfoData.pEndTime))[1]
          }}
        </el-form-item>
        <el-form-item label="机票选择:" label-width="120px">
          <el-radio-group v-model="ticketChoose" size="small">
            <el-radio label="1" border>经济舱</el-radio>
            <el-radio label="0" border>商务舱</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="剩余机票:"
          label-width="120px"
          v-if="ticketChoose !== '' || planeTicketPrice.length === 0"
        >
          <span v-if="ticketChoose === '1'">
            {{
              planeTicketPrice[0].usualNumber
                ? planeTicketPrice[0].usualNumber
                : 0
            }}
          </span>
          <span v-else>{{
            planeTicketPrice[0].noUsualNumber
              ? planeTicketPrice[0].noUsualNumber
              : 0
          }}</span>
        </el-form-item>
        <el-form-item
          label="机票价格:"
          label-width="120px"
          v-if="ticketChoose !== ''"
        >
          <span v-if="ticketChoose === '1'">
            {{
              planeTicketPrice[0].usualPrice
                ? planeTicketPrice[0].usualPrice
                : 0
            }}
          </span>
          <span v-else>{{
            planeTicketPrice[0].noUsualPrice
              ? planeTicketPrice[0].noUsualPrice
              : 0
          }}</span>
        </el-form-item>
        <el-form-item label="乘坐人:" label-width="120px">
          <el-button @click="dialogVisible = true">添加</el-button>
          <el-table
            v-if="userTableData.length > 0"
            :data="userTableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="bname" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="bphone" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="bIndextity" label="身份证">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item class="lastBtn">
          <el-button @click="ticketTo">购票</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="添加乘坐人:"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRulesForm"
        label-width="120px"
      >
        <el-form-item label="真实姓名:" prop="bname">
          <el-input v-model="userForm.bname"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="bphone">
          <el-input v-model="userForm.bphone"></el-input>
        </el-form-item>
        <el-form-item label="身份证:" prop="bIndextity">
          <el-input v-model="userForm.bIndextity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="userAddTo('userForm')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import UserShow from "./../components/userShow";
export default {
  components: {
    UserShow,
  },
  data() {
    return {
      planeInfoData: {},
      companyData: [],
      planeTicketPrice: [],
      ticketChoose: "",
      dialogVisible: false,
      userForm: {
        bname: "",
        bphone: "",
        bIndextity: "",
      },
      userRulesForm: {
        bname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        bphone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        bIndextity: [
          { required: true, message: "请输入身份证", trigger: "blur" },
        ],
      },
      userTableData: [],
      buyUserData: [],
    };
  },
  async created() {
    this.planeInfoData = this.$route.query;
    let arr = [];
    arr.push(this.getCompany());
    await Promise.all(arr);
    this.getTicketPrice();
  },
  methods: {
    // 复选框改变
    handleSelectionChange(select) {
      this.buyUserData = select;
      console.log(select);
    },
    //购票
    async ticketTo() {
      let number =
        this.ticketChoose === "1"
          ? this.planeTicketPrice[0].usualNumber
          : this.planeTicketPrice[0].noUsualNumber;
      if (number == 0) {
        return this.$message.error("机票已售空");
      }
      if (this.ticketChoose === "")
        return this.$message.error("请选择机票类型");
      if (this.buyUserData.length === 0)
        return this.$message.error("请输入或选择乘坐人");
      // 验证客户是否已经买票
      for (let i of this.buyUserData) {
        let res = await this.$request({
          type: "get",
          url: "/ticket/getUserTickets",
          params: {
            pid: this.planeInfoData.pid,
            bIndextity: i.bIndextity,
          },
        });
        if (res) {
          if (res.data.length > 0) {
            return this.$message.error("已购买过该航班，请勿重复购买");
          }
        }
      }

      this.$confirm("是否确认购入该航班机票, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        for (let i of this.buyUserData) {
          let res = await this.$request({
            type: "post",
            url: "/ticket/buyTickets",
            params: {
              uid: window.sessionStorage.getItem("uid"),
              pid: this.planeInfoData.pid,
              pname: this.planeInfoData.pname,
              bname: i.bname,
              bphone: i.bphone,
              bIndextity: i.bIndextity,
              ticket:
                this.ticketChoose == "1"
                  ? this.planeTicketPrice[0].usualPrice
                  : this.planeTicketPrice[0].noUsualPrice,
              isUsual: this.ticketChoose,
            },
          });
          if (res) {
            let obj = {
              pid: this.planeInfoData.pid,
            };
            this.ticketChoose == "1"
              ? (obj.usualNumber = this.planeTicketPrice[0].usualNumber - 1)
              : (obj.noUsualNumber =
                  this.planeTicketPrice[0].noUsualNumber - 1);
            await this.$request({
              type: "post",
              url: "/ticket/updataTickets",
              params: {
                ...obj,
              },
            });
            this.$message.success("购入成功");
            this.$router.push("/personCenter");
          }
        }
      });
    },
    // 添加购票人信息
    userAddTo(formName) {
      let reg = /^[\u4E00-\u9FA5]*$/g;
      let reg1 = /^1[3|4|5|7|8][0-9]{9}$/;
      let reg2 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!reg.test(this.userForm.bname)) {
            return this.$message.error("真实姓名只能为中文");
          }
          if (!reg1.test(parseInt(this.userForm.bphone))) {
            return this.$message.error("手机号格式不正确，请重新输入");
          }
          if (!reg2.test(parseInt(this.userForm.bIndextity))) {
            return this.$message.error("身份证格式不争取");
          }
          this.userTableData.push({ ...this.userForm });
          this.dialogVisible = false;
          this.$refs.userForm.resetFields();
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs.userForm.resetFields();
    },
    // 获取航班公司信息
    async getCompany() {
      let res = await this.$request({
        type: "get",
        url: "/home/getCompany",
      });
      if (res) {
        this.companyData = res.data;
      }
    },
    //获取相应机票价格和数量
    async getTicketPrice() {
      let res = await this.$request({
        type: "get",
        url: "/ticket/getNumber",
        params: {
          pid: this.planeInfoData.pid,
        },
      });
      if (res) {
        this.planeTicketPrice = res.data;
        console.log(res.data);
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
.inforData {
  background: #fff;
  width: 600px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
  padding: 20px;
  border-radius: 4px;
}
.lastBtn {
  width: 100%;
  text-align: center;
}
.contentDiv {
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
