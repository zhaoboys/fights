import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: null,
    uname: null,
    uquestion: null,
    isRoot: null,
  },
  mutations: {
    setUserInfo(state, obj) {
      console.log(obj);
      state.uid = obj.uid;
      state.uname = obj.uname;
      state.uquestion = obj.uname;
      state.isRoot = obj.isRoot;
    },
  },
  actions: {},
  modules: {},
});
