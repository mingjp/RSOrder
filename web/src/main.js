import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  //components: { App }  vue1.0的写法
  render: h => h(App)
})
