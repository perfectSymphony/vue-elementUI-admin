// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' //全局样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons/svg' // icon
import '@/permission' // 权限控制

//移除 '../mock',则将自动切换到请求easy-mock上面模拟数据
import '../mock'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, // 通过在根实例中注册store选项，该store实例会注入到根组件下的所有子组件中，且子组件能够通过this.$store访问到
    render: h => h(App)
})