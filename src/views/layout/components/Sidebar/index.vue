<template>
<!-- sidebar接收collapse，路由数组，同时引入sidebarItem组件 -->
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :collapse="isCollapse"
      :default-active="$route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
     >
     <!-- :key的主要作用是为了高效的更新虚拟DOM -->
     <!-- 另外vue中在使用相同的标签名元素的过度切换时，也会使用到key，其目的也是为了让vue可以区分他们 -->
     <!-- 抽取SidebarItem为单独的路由组件，方便递归调用 -->
     <!-- item(route)是(子)路由对象 -->
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu> 
  </el-scrollbar>   
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import sidebarItem from './SidebarItem'

  export default {
    name: 'Sidebar',
    components: {
      sidebarItem
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes(){
        return this.$router.options.routes
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

