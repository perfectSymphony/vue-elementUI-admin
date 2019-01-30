import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

//创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000 //设定超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.header["X-Token"] = getToken() //让每个请求携带自定义的token，可以跟自己的实际情况自行修改
        }
        return config
    }
)

export default service