import Vue from 'vue'
import Router from 'vue-router'
import echart from '../components/echarts.vue'
import menutable from '../components/menutable.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/echart',
      name: 'echart',
      component: echart
    },
    {
      path: '/menutable',
      name: 'menutable',
      component: menutable
    }
  ]
})
