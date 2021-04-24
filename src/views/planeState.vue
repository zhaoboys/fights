<template>
  <div class="main">
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班查询系统</span>
    </div>
    <div><UserShow></UserShow></div>
    <div class="mainTitleBox">航班状态</div>
    <div class="timeBox">
      时间:{{
        new Date(parseInt(searchForm.pStartTime)).getFullYear() +
        "." +
        (new Date(parseInt(searchForm.pStartTime)).getMonth() + 1) +
        "." +
        new Date(parseInt(searchForm.pStartTime)).getDate()
      }}
    </div>
    <div>
      <div
        v-for="(item, index) of planetableData"
        :key="index"
        class="stateDiv"
        v-loading="loading"
      >
        <!-- 头部 -->
        <div class="heardDiv">
          <span>{{
            companyData.find((item1) => item1.cid === item.cid).cname
          }}</span>
          <span>{{ item.pmodel }}</span>
        </div>
        <!-- 中间展示 -->
        <div class="centerDiv">
          <div class="center-div-item">
            <span>{{ $getHours(item.pStartTime)[1] }}</span>
            <span>{{ item.pStartArea }}</span>
          </div>
          <div>{{ $stateSet(item.pStartTime, item.pEndTime) }}</div>
          <div class="center-div-item">
            <span>{{ $getHours(item.pEndTime)[1] }}</span>
            <span>{{ item.pEndArea }}</span>
          </div>
          <div>
            <el-button @click="changeCare($event, item)">{{
              userCareData.find((item1) => item1.pid === item.pid) === undefined
                ? "关注"
                : "取消关注"
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
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
      searchForm: {},
      planetableData: [],
      userCareData: [],
      companyData: [],
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    this.searchForm = this.$route.query;
    let arr = [];
    arr.push(this.planeSearch());
    arr.push(this.getUserCare());
    arr.push(this.getCompany());
    await Promise.all(arr);
    this.loading = false;
  },
  methods: {
    async changeCare(e, row) {
      this.loading = true;
      if (e.target.innerHTML === "<!----><!----><span>关注</span>") {
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
      if (e.target.innerHTML === "取消关注") {
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
      this.loading = false;
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
    //获取航空公司
    async getCompany() {
      let res = await this.$request({
        type: "get",
        url: "/home/getCompany",
      });
      if (res) {
        this.companyData = res.data;
        console.log(res.data, 123);
      }
    },
    async planeSearch() {
      if (this.searchForm.isLeft === "1") {
        let res = await this.$request({
          type: "get",
          url: "/home/airSearch",
          params: {
            pname: this.searchForm.pname,
            pStartTime: this.$oneDayTime(
              parseInt(this.searchForm.pStartTime)
            )[0],
            pEndTime: this.$oneDayTime(parseInt(this.searchForm.pStartTime))[1],
          },
        });
        if (res) {
          console.log(res);
          this.planetableData = res.data;
        }
      } else {
        let res = await this.$request({
          type: "get",
          url: "/home/airSearch",
          params: {
            pStartCity: this.searchForm.pStartCity,
            pEndCity: this.searchForm.pEndCity,
            pStartTime: this.$oneDayTime(
              parseInt(this.searchForm.pStartTime)
            )[0],
            pEndTime: this.$oneDayTime(parseInt(this.searchForm.pStartTime))[1],
          },
        });
        if (res) {
          console.log(res);
          this.planetableData = res.data;
        }
      }
      return;
    },
  },
};
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.stateDiv {
  min-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #000; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  border: 5px;
}
.stateDiv:hover {
  box-shadow: 0px 0px 10px rgba(100, 100, 104, 0.075);
}
.heardDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
}
.centerDiv {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin: 10px;
}
.center-div-item {
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
.mainTitleBox {
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
.timeBox {
  padding: 10px;
}
</style>
