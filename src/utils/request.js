//封装axios

// 每一个请求都是要带 token 来验证权限的，这样封装以下的话我们就不用每个请求都手动来塞 token，或者来做一些统一的异常处理，一劳永逸

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 我们的 api 是根据 env 环境变量动态切换的
//创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000 //设定超时时间
})

// request请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            //这个config后面点的是headers，不是header，哎呀，坑了我一天，哎呀呀
            config.headers["X-Token"] = getToken() //让每个请求携带自定义的token，
        }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

//response服务器响应拦截器
service.interceptors.response.use(
    response => {
        /***
         * code为非20000是抛错了
         */
        const res = response.data
        if (res.code !== 20000) {
            Message({
                    message: res.message,
                    type: 'error',
                    duration: 5 * 1000
                })
                //50008:非法的token；50012：其他客户端登录了；50014：Token过期了
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出', {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() //为了重新实例化vue-router对象，避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service