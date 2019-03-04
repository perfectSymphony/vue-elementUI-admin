<template>
  <div class="menu-wrapper">
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
        <app-link :to = "resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>          
        </app-link>
      </template>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
  </div>
</template>
<script>

import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'

export default {
    name: 'SidebarItem',
    components: {
      AppLink
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data(){
      this.onlyOneChild = null
      return {}
    },
    methods: {
      hasOneShowingChild(children = [], parent){
        const showingChildren = children.filter(item => {
          console.log(item)
          if(item.hidden){
            return false
          }else{
            //临时存储（只有一个子节点时）
            this.onlyOneChild = item
            return true
          }
        })
        //当只有一个子路由时，则该子路由为默认路由
        if(showingChildren.length == 1){
          return true
        }
          //没有子路由时，只展示父级路由
        if(showingChildren.length === 0){
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }
        return false
      },
      resolvePath(routePath){
        if(isExternal(routePath)){
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
    
}
</script>
<style scoped>

</style>

