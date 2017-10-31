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
<<<<<<< HEAD
  router,
  render: h => h(App)
})
=======
  render: h => h(App),
  
});
  
>>>>>>> 5fbf827b87f02403e7026eb4aee9326f644bf47b
