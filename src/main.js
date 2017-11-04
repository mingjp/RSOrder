import Vue from 'vue'
import router from './router/'
import App from './App.vue'
import Element from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(Element);
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

