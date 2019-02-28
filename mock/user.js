import { param2Obj } from './utils'

const tokens = {
    admin: {
        tocken: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: '我是内容编辑员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

export default {
    login: res => {
        const { username } = JSON.parse(res.body)
        const data = tokens[username]

        if (data) {
            return {
                code: 20000,
                data
            }
        }
        return {
            code: 60204,
            message: '账号或密码不正确'
        }
    },
    getInfo: res => {
        const { token } = param2Obj(res.url)
        const info = users[token]

        if (info) {
            return {
                code: 20000,
                data: info
            }
        }
        return {
            code: 50008,
            message: '登录失败，没有获取到用户信息'
        }
    },
    logout: () => {
        return {
            code: 20000,
            data: 'success'
        }
    }
}