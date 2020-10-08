// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Router from "vue-router";
import moment from "moment";
import "babel-polyfill";
import "url-search-params-polyfill";
import Echarts from "echarts";

// 全局方法挂载
Vue.prototype.echarts = Echarts;
Vue.use(Echarts);
// Vue.filter("convertDate", function(value) {
//   return Moment(value).format("YYYY/MM/DD HH:mm:ss");
// });
Vue.prototype.$moment = moment; //赋值使用
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
require("swiper/dist/css/swiper.css");
Vue.use(Router);
import routes from "./router/index";
const router = new Router({
  mode: "hash",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
  }
});

import store from "./store/";
Vue.prototype.$store = store;
import Axios from "axios";

// Axios.defaults.baseURL = 'http://localhost:55573';
Vue.prototype.$axios = Axios;
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
//引入字体图标

//公共样式
import utils from "./api/utils.js";
Vue.prototype.$utils = utils;
// import echarts from "echarts";
// Vue.prototype.$echarts = echarts;
//引入接口
import UserAPI from "./api/UserAPI.js";
Vue.prototype.$UserAPI = UserAPI;
import ProductAPI from "./api/ProductAPI.js";
Vue.prototype.$ProductAPI = ProductAPI;
import ConsulationAPI from "./api/ConsulationAPI.js";
Vue.prototype.$ConsulationAPI = ConsulationAPI;
import DeviceAPI from "./api/DeviceAPI.js";
Vue.prototype.$DeviceAPI = DeviceAPI;
import PlanAPI from "./api/PlanAPI.js";
Vue.prototype.$PlanAPI = PlanAPI;
import ReportAPI from "./api/ReportAPI.js";
Vue.prototype.$ReportAPI = ReportAPI;
import AdminAPI from "./api/AdminAPI.js";
Vue.prototype.$AdminAPI = AdminAPI;
import TestResultAPI from "./api/TestResultAPI.js";
Vue.prototype.$TestResultAPI = TestResultAPI;
import PlanSchemeAPI from "./api/PlanSchemeAPI.js";
Vue.prototype.$PlanSchemeAPI = PlanSchemeAPI;
import BackupAPI from "./api/BackupAPI.js";
Vue.prototype.$BackupAPI = BackupAPI;
import AccountAPI from "./api/AccountAPI.js";
Vue.prototype.$AccountAPI = AccountAPI;
import SystemAPI from "./api/SystemAPI.js";
Vue.prototype.$SystemAPI = SystemAPI;
import ReportOptionAPI from "./api/ReportOption.js";
Vue.prototype.$ReportOptionAPI = ReportOptionAPI;

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    if (to.meta.requireAuth) {
      let token = sessionStorage.getItem("accessToken");
      if (token) {
        next();
      } else {
        next("login");
      }
    }
  }
});
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",

  router,
  store,
  components: { App },
  template: "<App/>"
});
