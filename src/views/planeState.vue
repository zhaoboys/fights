<template>
  <div class="main">
    <div>航班状态表</div>
    <div>
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
      >
        <!-- 头部 -->
        <div class="heardDiv">
          <span>{{ item.cid }}</span>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
      planetableData: [],
    };
  },
  created() {
    this.searchForm = this.$route.query;
    this.planeSearch();
  },
  methods: {
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
  border: 1px solid #000;
}
.heardDiv {
  width: 100%;
  display: flex;
  justify-content: center;
}
.centerDiv {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.center-div-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
