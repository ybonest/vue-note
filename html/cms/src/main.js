import Vue from 'vue'

import router from './router.js'
import App from './components/App.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import vueRouter from 'vue-router'
Vue.use(vueRouter);

import VuePreview from 'vue2-preview'
Vue.use(VuePreview);

import axios from 'axios';
axios.defaults.baseURL = 'http://39.106.32.91:3000';
Vue.prototype.$http = axios;

//引入时间格式化插件
import moment from 'moment';


import store from "./datashare.js"

Vue.filter('dateFormat',(val) => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
})

var vm = new Vue({
  el:"#app",
  data:{},
  render:c => c(App),
  router,
  store
})
