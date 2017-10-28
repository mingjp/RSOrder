import Vue from 'vue'
import Router from 'vue-router'
import back_stage_home from '../common/back_stage_home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/back_stage_home',
      name: 'back-stage-home',
      component: back_stage_home
    }
  ]
})
