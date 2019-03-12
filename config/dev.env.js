'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"https://easy-mock.com/mock/5c876e705aea8a024647d8a0/vue-admin"'
})