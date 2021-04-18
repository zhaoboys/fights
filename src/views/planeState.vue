<template>
  <div>航班状态表</div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
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
<style scoped></style>
