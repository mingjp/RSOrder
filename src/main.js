import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import 'font-awesome/css/font-awesome.min.css'
import router from'./router/';
import $ from 'jquery';
import './assets/jquery-form/jquery.form.js'
Vue.use(Element)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

