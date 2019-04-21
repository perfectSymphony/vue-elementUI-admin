import router from './router'
import store from './store'
import NProgress from 'nprogress' //progress进度条
import 'nprogress/nprogress.css' //progress进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' //验证权限

NProgress.configure({ showSpinner: false }) //禁用进度环
const whiteList = ['/login'] //不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.roles.length === 0) { //判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => {
                    //拉取用户信息
                    //console.log(res)
                    next()
                }).catch(err => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || '验证错误，请重新登录')
                        next({ path: '/' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        console.log(to)
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
          next(`/login?redirect=${to.path}`) //否则全部重定向到登录页
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() //结束progress
})