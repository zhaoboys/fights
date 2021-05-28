<template>
  <div>
    <p>酒店推荐</p>
    <ul class="pubUl">
      <li v-for="(item, i) in pubData" :key="i" class="pubLi">
        <a :href="item.http" target="_blank">
          <div>
            <span>
              {{ item.pub }}
            </span>
          </div>
          <div>
            <el-rate
              v-model="item.ratings"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    city: null,
  },
  data() {
    return {
      pubData: [],
    };
  },
  async created() {
    let arr = [];
    arr.push(this.getPub());
    await Promise.all(arr);
  },
  watch: {
    city(newVal) {
      this.getPub(newVal);
    },
  },
  methods: {
    // 获取酒店推荐
    async getPub() {
      let res = await this.$request({
        type: "get",
        url: "/ticket/getPub",
        params: {
          city: this.city,
        },
      });
      if (res) {
        console.log(res);
        this.pubData = res.data;
      }
    },
  },
};
</script>
<style scoped>
.pubLi {
  cursor: pointer;
  transition: 0.5s;
  padding: 4px;
}
.pubLi:hover {
  background: rgb(189, 192, 192);
}
.pubLi .el-rate {
  cursor: pointer;
}
.pubUl {
  list-style-type: none;
  padding: 0;
}
</style>
