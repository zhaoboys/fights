<template>
  <div>
    <p>酒店推荐</p>
    <ul class="pubUl">
      <li v-for="(item, i) in pubData" :key="i" class="pubLi">
        <a :href="item.http" target="_blank">
          <span>
            {{ item.pub }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    city: null,
    pubData: [],
  },
  data() {
    return {};
  },
  async created() {
    let arr = [];
    arr.push(this.getPub());
    await Promise.all(arr);
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
.pubUl {
  list-style-type: none;
  padding: 0;
}
</style>
