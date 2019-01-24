import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/login/index'

Vue.use(Router)


export const constantRouterMap = [
  { path:'/login', component: () => import('@/views/login/index') }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
