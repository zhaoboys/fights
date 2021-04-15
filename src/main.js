import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import axios from "axios";
import "./common/common";

Vue.prototype.$api = "http://localhost:3000";
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.axios = axios;
axios.defaults.baseURL = "/api";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
