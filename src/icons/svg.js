import Vue from 'vue'

// svg组件
import SvgIcon from '@/components/SvgIcon/svg'

// 注册全局组件
Vue.compenent('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)