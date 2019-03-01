<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
     mode="vertical"
     >
      <sidebar-item />
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

