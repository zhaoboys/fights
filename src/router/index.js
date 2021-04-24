import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";
import Register from "../views/register";
import PlaneSearch from "../views/planeSearch";
import ResultShow from "../views/resultShow";
import PlaneState from "../views/planeState.vue";
import ManageBack from "../views/manageBack.vue";
import ForgetPwd from "../views/forgetPwd.vue";
import PersonCenter from "./../views/personCenter.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/planeSearch",
    name: "PlaneSearch",
    component: PlaneSearch,
  },
  {
    path: "/resultShow",
    name: "ResultShow",
    component: ResultShow,
  },
  {
    path: "/plabeState",
    name: "PlaneState",
    component: PlaneState,
  },
  {
    path: "/manageBack",
    name: "ManageBack",
    component: ManageBack,
  },
  {
    path: "/forgePwd",
    name: "ForgetPwd",
    component: ForgetPwd,
  },
  {
    path: "/personCenter",
    name: "PersonCenter",
    component: PersonCenter,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
