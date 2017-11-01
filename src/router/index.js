import Vue from 'vue'
import Router from 'vue-router'
import echart1 from '../components/echarts1.vue'
import echart2 from '../components/echarts2.vue'
import menutable from '../components/menutable.vue'
import home from '../components/home.vue'
import login from '../components/login.vue'
import user from '../components/user.vue'
import order_part from '../components/order_part.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        component: login,
        name: 'login'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/echart1',
          name: 'echart1',
          component: echart1
        },
        {
          path: '/echart2',
          name: 'echart2',
          component: echart2
        },
        {
          path: '/user',
          name: 'user',
          component: user
        }
        ,{
        path: '/order_part',
        name: 'order_part',
        component: order_part
    }
      ]
    }
    
  ]
})
