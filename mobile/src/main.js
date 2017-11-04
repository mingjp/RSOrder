import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import 'element-ui/lib/index.js'
import router from './router/'


Vue.use(Element);
Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        dataset: [],//列表页订单

        searchDataset:[],//搜索数据

        Order:[],//首页订单

        orderId:0,

        searchkey:''

    }
})

new Vue({
  el: '#app',
  data:{order:[]},
  router,
  store,
  render: h => h(App)
})
