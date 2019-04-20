import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    //创建有效期为7天的cookie
    // Cookies.set('name', 'value', { expires: 7 });
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}