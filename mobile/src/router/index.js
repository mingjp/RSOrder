import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/Home/Home.vue'
import GoodsListComponent from '../components/goodsList/goodsList.vue'
import ordersComponent from '../components/orders/orders.vue'
import myComponent from '../components/my/my.vue'
import serachComponent from '../components/serach/serach.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent,
      
    },
    {
      path: 'goodsList',
      name: 'goodsList',
      component: GoodsListComponent
      
    },
    {
      path: 'orders',
      name: 'orders',
      component: ordersComponent
      
    },
    {
      path: 'my',
      name: 'my',
      component: myComponent
      
    },
    {
      path: 'serach',
      name: 'serach',
      component: serachComponent
      
    }
  ]
})
export default router
