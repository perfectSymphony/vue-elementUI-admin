import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/**
 * layout引入
 */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index')
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        childdren: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]
    }
]

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})