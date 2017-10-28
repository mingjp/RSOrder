import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(Element)

new Vue({
  el: '#app',
  render: h => h(App),
  
});
  
