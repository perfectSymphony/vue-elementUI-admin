import request from '@/utils/request'

export function login(username, password){
    return request({
        url: 'user/login',
        method: 'POST',
        data: {
            username,
            password
        }
    })
}

export function getInfo(token){
    return request({
        url: 'user/info',
        method: 'GET',
        params: { token }
    })
}

export function logout(){
    return request({
        url: 'user/logout',
        method: 'POST'
    })
}